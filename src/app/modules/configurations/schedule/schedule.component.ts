import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../../../shared/utils.service";
import {ScheduleService} from "./schedule.service";
import {SettingsSchedule} from "../../../core/models/settings-schedule.types";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ScheduleComponent implements OnInit, OnDestroy {

  scheduleForm: FormGroup;
  loaded: boolean = false;
  saving: boolean = false;
  schedule: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _scheduleService: ScheduleService,
    private _utilsService: UtilsService,
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this._scheduleService.getSchedule(this._route.snapshot.params['uuid'])
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (schedule: SettingsSchedule) => {
          this.schedule = schedule;

          this.scheduleForm = new FormGroup({
            duration: new FormControl(this.schedule?.duration ? this._utilsService.timeConvert(this.schedule?.duration) : "00:30"),
            break_before: new FormGroup({
              isActive: new FormControl(this.schedule?.break_before_time && this.schedule?.break_before_time > 0),
              time: new FormControl(this.schedule?.break_before_time ? this._utilsService.timeConvert(this.schedule?.break_before_time) : "00:30")
            }),
            break_after: new FormGroup({
              isActive: new FormControl(this.schedule?.break_after_time && this.schedule?.break_after_time > 0),
              time: new FormControl(this.schedule?.break_after_time ? this._utilsService.timeConvert(this.schedule?.break_after_time) : "00:30")
            }),
          });

          this.toggleIsActive('break_before');
          this.toggleIsActive('break_after');
          this.loaded = true;
        },
        error => {
        },
        () => {
        }
      );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  saveSchedule(): void {
    if (this.scheduleForm.invalid) {
      return;
    }

    this.saving = true;
    let formValues = this.scheduleForm.value;
    let datas: SettingsSchedule = {
      duration: this._utilsService.timeToMinutes(formValues.duration),
      break_before_time: formValues.break_before.isActive ? this._utilsService.timeToMinutes(formValues.break_before.time) : 0,
      break_after_time: formValues.break_after.isActive ? this._utilsService.timeToMinutes(formValues.break_after.time) : 0,
    };
    this._scheduleService.updateSchedule(this._route.snapshot.params['uuid'], datas)
      .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            let progress = Math.round((100 * event.loaded) / event.total);
          }
          if (event.type === HttpEventType.Response) {
            // console.log(event.body); // this.signup.reset();
          }
        },
        (error) => {

        },
        () => {
          this.saving = false;
        });
  }

  toggleIsActive(group: string): void {
    let formGroup = this.scheduleForm.get(group);
    if (formGroup.get('isActive').value) {
      formGroup.get('time').enable();
    } else {
      formGroup.get('time').disable();
    }
  }

  controlDuration(control, min, max): void {
    let minutes = this._utilsService.timeToMinutes(control.value);
    let minT = this._utilsService.timeToMinutes(min);
    let maxT = this._utilsService.timeToMinutes(max);
    if (minT <= minutes && minutes <= maxT) {
      this._utilsService.removeFormControlError(control, 'duration_invalid');
    } else {
      control.setErrors({'duration_invalid': 'true'})
    }
  }

  break_before(): FormGroup {
    return this.scheduleForm.get('break_before') as FormGroup;
  }

  break_after(): FormGroup {
    return this.scheduleForm.get('break_after') as FormGroup;
  }

}
