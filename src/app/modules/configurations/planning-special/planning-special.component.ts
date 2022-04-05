import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {PlanningSpecialInputComponent} from "./planning-input/planning-input.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {PlanningSpecialService} from "./planning-special.service";
import {PlanningHebdo} from "../../../core/models/planning-hebdo.types";
import {ConfirmDialogService} from "../../../components/confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'planning-special',
  templateUrl: 'planning-special.component.html'
})

export class PlanningSpecialComponent implements OnInit, OnDestroy {

  loaded: boolean = true;
  saving: boolean = false;
  uuid: string = "";
  planning: any = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    public _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _planningSpecialService: PlanningSpecialService,
    private _confirmDialogService: ConfirmDialogService
  ) {
    this.uuid = this._route.snapshot.params['uuid'];
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  addPlanningSpecial() {
    const dialogRef = this._dialog.open(PlanningSpecialInputComponent, {
      data: {
        id: this.uuid
      },
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        this.loadData();
      });
  }

  removePlanningSpecial(planning): void {
    this._confirmDialogService.open({
      title: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer cette superposition de date ?',
      dismissible:false,

    });
  }

  private loadData(): void {
    this.loaded = false;
    this._planningSpecialService.getPlanning(this.uuid)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((planningHebdo: PlanningHebdo) => {
        this.planning = planningHebdo.rules;
        this.uuid = planningHebdo.uuid;
        this.loaded = true;
      });
  }

}
