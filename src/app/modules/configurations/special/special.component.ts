import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SettingsSpecial} from "../../../core/models/settings-special.types";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Subject} from "rxjs";

@Component({
  selector: 'settings-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit, AfterViewInit, OnDestroy {

  settings: SettingsSpecial[] = [];
  displayedColumns: string[] = ['id', 'special', 'statut','actions'];
  dataSource = new MatTableDataSource<SettingsSpecial>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _unsubscribeAll: Subject<any>;

  constructor() {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });
    this.settings.push({
      id: 1,
      type: 'ouverture',
      dateFrom: new Date("2022-03-30 14:00:00"),
      dateTo: new Date("2022-03-30 18:00:00"),
      statut: 'active'
    });

    this.dataSource = new MatTableDataSource<SettingsSpecial>(this.settings);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
