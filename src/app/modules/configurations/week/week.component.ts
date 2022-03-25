import {Component, OnDestroy, OnInit} from '@angular/core';
import {LabelType, Options} from "@angular-slider/ngx-slider";
import {FormControl, FormGroup} from "@angular/forms";
import {SettingsWeek} from "../../../core/models/settings-week.types";
import {ActivatedRoute} from "@angular/router";
import {WeekService} from "./week.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'settings-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit, OnDestroy {

  options: Options = {
    floor: 0,
    ceil: 24,
    step: 1,
    noSwitching: true,
    minRange: 1,
    pushRange: true,
    ticksArray: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `${value}:00`;
        case LabelType.High:
          return `${value}:00`;
        default:
          return `${value}:00`;
      }
    }
  };
  disabledOptions: Options = {
    ...this.options,
    disabled: true
  }

  weekForm: FormGroup;
  week: SettingsWeek = null;
  saving: boolean = false;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _weekService: WeekService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this._weekService.getHoraires(this._route.snapshot.params['uuid'])
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        value => {
          this.week = value;
        },
        error => {
        },
        () => {
          this.initForm();
        }
      );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  saveSettingsWeek(): void {
    if (this.weekForm.invalid) {
      return;
    }

    this.saving = true;
    this._weekService.updateHoraires(this.week.uuid, this.weekForm.value)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        value => {
          this.week = value.datas;
        },
        error => {
        },
        () => {
          this.saving = false;
          this.initForm();
        }
      );
  }

  private initForm(): void {
    this.weekForm = new FormGroup({
      uuid: new FormControl(this.week?.uuid),
      lundi: new FormGroup({
        isActive: new FormControl(this.week?.lundi.isActive),
        values: new FormControl(this.week?.lundi.values),
      }),
      mardi: new FormGroup({
        isActive: new FormControl(this.week?.mardi.isActive),
        values: new FormControl(this.week?.mardi.values),
      }),
      mercredi: new FormGroup({
        isActive: new FormControl(this.week?.mercredi.isActive),
        values: new FormControl(this.week?.mercredi.values),
      }),
      jeudi: new FormGroup({
        isActive: new FormControl(this.week?.jeudi.isActive),
        values: new FormControl(this.week?.jeudi.values),
      }),
      vendredi: new FormGroup({
        isActive: new FormControl(this.week?.vendredi.isActive),
        values: new FormControl(this.week?.vendredi.values),
      }),
      samedi: new FormGroup({
        isActive: new FormControl(this.week?.samedi.isActive),
        values: new FormControl(this.week?.samedi.values),
      }),
      dimanche: new FormGroup({
        isActive: new FormControl(this.week?.dimanche.isActive),
        values: new FormControl(this.week?.dimanche.values),
      })
    });
  }
}
