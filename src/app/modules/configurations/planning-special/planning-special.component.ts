import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {PlanningSpecialInputComponent} from "./planning-input/planning-input.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'planning-special',
  templateUrl: 'planning-special.component.html'
})

export class PlanningSpecialComponent implements OnInit, OnDestroy {

  loaded: boolean = true;
  saving: boolean = false;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public _dialog: MatDialog,
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  addPlanningSpecial() {
    const dialogRef = this._dialog.open(PlanningSpecialInputComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result && result.length > 0) {
        }
      });
  }
}
