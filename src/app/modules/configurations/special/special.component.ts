import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SettingsSpecial} from "../../../core/models/settings-special.types";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";
import {SpecialService} from "./special.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SpecialFormComponent} from "./special-form/special-form.component";

@Component({
  selector: 'settings-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit, OnDestroy {

  settings: SettingsSpecial[] = [];
  displayedColumns: string[] = ['id', 'special', 'statut', 'actions'];
  dataSource = new MatTableDataSource<SettingsSpecial>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loaded: boolean = true;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _specialService: SpecialService,
    public _dialog: MatDialog
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<SettingsSpecial>(this.settings);
    this._specialService.getHoraires(this._route.snapshot.params['uuid'])
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (value: SettingsSpecial[]) => {
          this.settings = value;
          this.dataSource = new MatTableDataSource<SettingsSpecial>(this.settings);
          this.dataSource.paginator = this.paginator;
        },
        error => {
        },
        () => {
          this.loaded = false;
        }
      );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  addSpecial(): void {
    const dialogRef = this._dialog.open(SpecialFormComponent, {
      data: {
        action: 'add'
      },
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }
}
