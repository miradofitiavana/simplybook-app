import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LabelType, Options} from "@angular-slider/ngx-slider";
import {SettingsWeek} from "../../../core/models/settings-week.types";

@Component({
  selector: 'settings-week',
  templateUrl: 'week.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SettingsWeekComponent implements OnInit, OnDestroy {

  disabled: boolean = false;
  options: Options = {
    floor: 0,
    ceil: 24,
    step: 1,
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
  week: SettingsWeek = {
    uuid: "",
    lundi: {
      isActive: true,
      values: [9, 18]
    },
    mardi: {
      isActive: true,
      values: [9, 18]
    },
    mercredi: {
      isActive: true,
      values: [9, 18]
    },
    jeudi: {
      isActive: true,
      values: [9, 18]
    },
    vendredi: {
      isActive: true,
      values: [9, 18]
    },
    samedi: {
      isActive: true,
      values: [9, 18]
    },
    dimanche: {
      isActive: false,
      values: [9, 18]
    },
  };

  constructor() {

  }

  ngOnInit() {
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

  ngOnDestroy(): void {
  }

  saveSettingsWeek() :void{

  }
}
