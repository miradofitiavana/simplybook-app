import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ProgressBarService} from "./progress-bar.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProgressBarComponent implements OnInit, OnDestroy {
  bufferValue: number;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = "indeterminate";
  value: number;
  visible: boolean = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseProgressBarService: ProgressBarService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._fuseProgressBarService.bufferValue
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((bufferValue) => {
        this.bufferValue = bufferValue;
      });

    this._fuseProgressBarService.mode
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((mode) => {
        this.mode = mode;
      });

    this._fuseProgressBarService.value
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.value = value;
      });

    this._fuseProgressBarService.visible
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((visible) => {
        this.visible = visible;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
