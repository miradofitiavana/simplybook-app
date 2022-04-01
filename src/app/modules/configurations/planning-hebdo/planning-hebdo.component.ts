import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PlanningHebdoService} from "./planning-hebdo.service";
import {PlanningDay} from "../../../core/models/planning-day.types";
import {PlanningHebdo} from "../../../core/models/planning-hebdo.types";

@Component({
  selector: 'planning-hebdo',
  templateUrl: 'planning-hebdo.component.html',
  styleUrls: ['./planning-hebdo.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PlanningHebdoComponent implements OnInit, OnDestroy {

  planningForm: FormGroup;
  loaded: boolean = false;
  saving: boolean = false;
  planning: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _planningHebdoService: PlanningHebdoService,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this.planningForm = this.fb.group({
      monday: this.fb.group({
        isActive: false,
        intervals: this.fb.array([])
      }),
      tuesday: this.fb.group({
        isActive: false,
        intervals: this.fb.array([])
      }),
    });

    this._planningHebdoService.getPlanning(this._route.snapshot.params['uuid'])
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (planningHebdo: PlanningHebdo) => {
          this.planning = planningHebdo;
          this.planning.rules.forEach((rule: PlanningDay) => {
            if (rule.type == "wday") {
              let currentDay = this.planningForm.get(rule.wday) as FormGroup;
              currentDay.controls['isActive'].setValue(true);
              let currentIntervals = currentDay.controls['intervals'] as FormArray;
              rule.intervals.forEach((interval: any) => {
                currentIntervals.push(this.newIntervalForm(interval));
              });
            }
          });
          this.loaded = true;
        },
        error => {
        },
        () => {
        }
      );

  }

  intervals(day: string): FormArray {
    return this.planningForm.get(day).get('intervals') as FormArray;
  }

  isActive(day: string): FormControl {
    return this.planningForm.get(day).get('isActive') as FormControl;
  }

  newIntervalForm(slot?: { from, to }): FormGroup {
    return this.fb.group({
      hourFrom: slot && slot?.from ? slot.from : '09:00',
      hourTo: slot && slot?.to ? slot.to : '17:00'
    });
  }

  addInterval(day: string) {
    if (this.isActive(day).value || this.intervals(day).length == 0) {
      let from = this.lastHour(day);
      let to = this.addTime(from, "01:00");
      this.intervals(day).push(this.newIntervalForm({from: from, to: to}));
    }

    if (!this.isActive(day).value) {
      this.isActive(day).setValue(true);
    }
    this.intervalsEnConflits(day, this.intervals(day).length - 1);
  }

  removeInterval(day: string, index: number) {
    this.intervals(day).removeAt(index);
    if (this.intervals(day).length <= 0) {
      this.isActive(day).setValue(false);
    }
  }

  toggleIsActive(day: string) {
    if (this.intervals(day).length == 0 && this.isActive(day).value) {
      this.addInterval(day);
    }
  }

  ngOnDestroy(): void {
  }

  controlChangesCreneaux(day: string, index: number) {
    let currentIntervals = this.intervals(day);
    let currentGroup = currentIntervals.controls[index];
    let inf = currentGroup.get('hourFrom').value;
    let sup = currentGroup.get('hourTo').value;
    if (!this.fromEstInferieurEgalTo(inf, sup)) {
      currentGroup.setErrors({'inferieur': true});
    } else {
      currentGroup.setErrors({'inferieur': null});
    }
    this.intervalsEnConflits(day, index);
  }

  private lastHour(day: string) {
    let intervalsValues = this.intervals(day).value;
    return intervalsValues[intervalsValues.length - 1].hourTo;
  }

  private addTime(from: string, time: string):
    string {
    let f = from.split(':');
    let t = time.split(':');
    let fromInt = parseInt(f[0]) * 60 + parseInt(f[1]);
    let toInt = parseInt(t[0]) * 60 + parseInt(t[1]);
    let total = fromInt + toInt;
    if (total >= 1440) total -= 1440;
    return this.timeConvert(total);
  }

  private timeConvert(n) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours.toString().padStart(2, "0")}:${rminutes.toString().padStart(2, "0")}`;
  }

  private fromEstInferieurEgalTo(from: string, to: string) {
    let f = from.split(':');
    let t = to.split(':');
    let fromInt = parseInt(f[0]) * 60 + parseInt(f[1]);
    let toInt = parseInt(t[0]) * 60 + parseInt(t[1]);
    return fromInt <= toInt;
  }

  private timeToMinutes(time: string): number {
    let t = time.split(':');
    return parseInt(t[0]) * 60 + parseInt(t[1]);
  }

  private intervalsEnConflits(day: string, index: number) {
    let currentIntervals = this.intervals(day);
    let currentGroup = currentIntervals.controls[index];

    let currentGroupValues = currentGroup.value;
    let fromI = this.timeToMinutes(currentGroupValues.hourFrom);
    let toI = this.timeToMinutes(currentGroupValues.hourTo);

    for (let ind = 0; ind < currentIntervals.value.length; ind++) {
      let interval = currentIntervals.value[ind];
      let from = this.timeToMinutes(interval.hourFrom);
      let to = this.timeToMinutes(interval.hourTo);
      if (ind != index) {
        if ((from < fromI && fromI < to) || (from < toI && toI < to)) {
          setTimeout(() => {
            this.intervals(day).controls[index].setErrors({'conflit': true});
          });
          break;
        } else {
          setTimeout(() => {
            currentGroup.setErrors({'conflit': false});
          });
        }
      }
    }

    // other groups
    for (let indOther = 0; indOther < currentIntervals.controls.length; indOther++) {
      let intervalOther = currentIntervals.controls[indOther];
      if (indOther != index) {
        let currentConflit = intervalOther.value;
        let fromCc = this.timeToMinutes(currentConflit.hourFrom);
        let toCc = this.timeToMinutes(currentConflit.hourTo);

        for (let ind = 0; ind < currentIntervals.controls.length; ind++) {
          let interval = currentIntervals.controls[ind].value;
          let from = this.timeToMinutes(interval.hourFrom);
          let to = this.timeToMinutes(interval.hourTo);
          if (ind != indOther) {
            if ((from < fromCc && fromCc < to) || (from < toCc && toCc < to)) {
              setTimeout(() => {
                intervalOther.setErrors({'conflit': true});
              });
              break;
            } else {
              setTimeout(() => {
                intervalOther.setErrors({'conflit': false});
              });
            }
          }
        }
      }
    }
  }
}
