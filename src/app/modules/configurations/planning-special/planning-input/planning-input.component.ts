import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilsService} from "../../../../shared/utils.service";
import {PlanningDay} from "../../../../core/models/planning-day.types";
import {ActivatedRoute} from "@angular/router";
import {PlanningSpecialService} from "../planning-special.service";

@Component({
  selector: 'planning-special-input',
  templateUrl: 'planning-input.component.html',
  styleUrls: ['./planning-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PlanningSpecialInputComponent implements OnInit {
  specialForm: FormGroup;
  title: string = "";
  daysSelected: any[] = [];
  event: any;
  selected: any;
  saving: boolean = false;

  id: string = "";

  constructor(
    private _route: ActivatedRoute,
    public matDialogRef: MatDialogRef<PlanningSpecialInputComponent>,
    private _utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private fb: FormBuilder,
    private _planningSpecial: PlanningSpecialService
  ) {
    this.id = _data.id;
  }

  ngOnInit() {
    this.specialForm = this.fb.group({
      isActive: false,
      intervals: this.fb.array([])
    });
  }

  closeDialog() {
    this.matDialogRef.close([]);
  }

  savePlanning() {
    if (this.specialForm.invalid) {
      return;
    }

    this.saving = true;

    let formData = [];
    let formValue = this.specialForm.value;

    this.daysSelected.forEach((value) => {
      let planningObject: PlanningDay = {
        date: value,
        type: "date",
        intervals: []
      };
      formValue.intervals.forEach(value => {
        planningObject.intervals.push({
          from: value.hourFrom,
          to: value.hourTo,
        });
      });
      formData.push(planningObject);
    });
    console.log(formData);

    this._planningSpecial.updatePlanning(this.id, formData)
      .subscribe(event => {
          //console.log(event)
          this.closeDialog();
        },
        (error) => {

        },
        () => {
          this.saving = false;
        });
  }

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "mat-calendar-body-cell--selected" : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);

    if (this.daysSelected.length == 0) {
      this.isActive().setValue(true);
      this.toggleIsActive();
    }

    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    calendar.updateTodaysDate();

    console.log(this.daysSelected);
  }

  intervals(): FormArray {
    return this.specialForm.get('intervals') as FormArray;
  }

  isActive(): FormControl {
    return this.specialForm.get('isActive') as FormControl;
  }

  addInterval(): void {
    if (this.isActive().value || this.intervals().length == 0) {
      if (this.intervals().length > 0) {
        let from = this.lastHour();
        let to = this._utilsService.addTime(from, "01:00");
        this.intervals().push(this.newIntervalForm({from: from, to: to}));
      } else {
        this.intervals().push(this.newIntervalForm());
      }
    }

    if (!this.isActive().value) {
      this.isActive().setValue(true);
    }
    this.intervalsEnConflits(this.intervals().length - 1);
  }

  removeInterval(index: number): void {
    this.intervals().removeAt(index);
    if (this.intervals().length <= 0) {
      this.isActive().setValue(false);
    }
    this.intervalsEnConflits(index);
  }

  controlChangesCreneaux(index: number): void {
    let currentIntervals = this.intervals();
    let currentGroup = currentIntervals.controls[index];
    let inf = currentGroup.get('hourFrom').value;
    let sup = currentGroup.get('hourTo').value;
    if (!this.fromEstInferieurEgalTo(inf, sup)) {
      currentGroup.setErrors({'inferieur': true});
    } else {
      this._utilsService.removeFormControlError(currentGroup, 'inferieur');
    }
    this.intervalsEnConflits(index);
  }


  toggleIsActive(): void {
    if (this.intervals().length == 0 && this.isActive().value) {
      this.addInterval();
    }
  }

  private newIntervalForm(slot?: { from, to }): FormGroup {
    return this.fb.group({
      hourFrom: slot && slot?.from ? slot.from : '09:00',
      hourTo: slot && slot?.to ? slot.to : '17:00'
    });
  }

  private lastHour(): string {
    let intervalsValues = this.intervals().value;
    return intervalsValues[intervalsValues.length - 1].hourTo;
  }

  private fromEstInferieurEgalTo(from: string, to: string): boolean {
    let f = from.split(':');
    let t = to.split(':');
    let fromInt = parseInt(f[0]) * 60 + parseInt(f[1]);
    let toInt = parseInt(t[0]) * 60 + parseInt(t[1]);
    return fromInt <= toInt;
  }

  private intervalsEnConflits(index: number): void {
    let currentIntervals = this.intervals();
    let currentGroup = currentIntervals.controls[index];

    if (currentGroup) {
      let currentGroupValues = currentGroup.value;
      let fromI = this._utilsService.timeToMinutes(currentGroupValues.hourFrom);
      let toI = this._utilsService.timeToMinutes(currentGroupValues.hourTo);

      for (let ind = 0; ind < currentIntervals.value.length; ind++) {
        let interval = currentIntervals.value[ind];
        let from = this._utilsService.timeToMinutes(interval.hourFrom);
        let to = this._utilsService.timeToMinutes(interval.hourTo);
        if (ind != index) {
          if ((from < fromI && fromI < to) || (from < toI && toI < to)) {
            setTimeout(() => {
              this.intervals().controls[index].setErrors({'conflit': true});
            });
            break;
          } else {
            setTimeout(() => {
              this._utilsService.removeFormControlError(currentGroup, 'conflit');
            });
          }
        }
      }
    }

    // other groups
    for (let indOther = 0; indOther < currentIntervals.controls.length; indOther++) {
      let intervalOther = currentIntervals.controls[indOther];
      if (((currentGroup && indOther != index) || !currentGroup) && currentIntervals.controls.length > 1) {
        let currentConflit = intervalOther.value;
        let fromCc = this._utilsService.timeToMinutes(currentConflit.hourFrom);
        let toCc = this._utilsService.timeToMinutes(currentConflit.hourTo);

        for (let ind = 0; ind < currentIntervals.controls.length; ind++) {
          let interval = currentIntervals.controls[ind].value;
          let from = this._utilsService.timeToMinutes(interval.hourFrom);
          let to = this._utilsService.timeToMinutes(interval.hourTo);
          if (ind != indOther) {
            if ((from < fromCc && fromCc < to) || (from < toCc && toCc < to)) {
              setTimeout(() => {
                intervalOther.setErrors({'conflit': true});
              });
              break;
            } else {
              setTimeout(() => {
                this._utilsService.removeFormControlError(intervalOther, 'conflit');
              });
            }
          }
        }
      } else if (currentIntervals.controls.length == 1) {
        setTimeout(() => {
          this._utilsService.removeFormControlError(currentIntervals.controls[0], 'conflit');
        });
      }
    }
  }
}
