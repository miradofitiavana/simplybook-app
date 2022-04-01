import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {CategorieService} from "./categorie.service";
import {Categorie} from "../../../core/models/categorie.types";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit, AfterViewInit, OnDestroy {

  drawerMode: 'side' | 'over' = 'side';

  categories: Categorie[] = [];
  displayedColumns: string[] = ['id', 'categorie', 'descr'];
  dataSource = new MatTableDataSource<Categorie>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _categorieService: CategorieService,
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this._categorieService.onCategoriesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.categories = value;
        this.dataSource = new MatTableDataSource<any>(this.categories);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
