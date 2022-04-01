import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, Observable} from "rxjs";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Injectable()
export class ProgressBarService {

  constructor(
    private _router: Router
  ) {
    this._init();
  }

  private _bufferValue: BehaviorSubject<number>;
  get bufferValue(): Observable<any> {
    return this._bufferValue.asObservable();
  }

  private _mode: BehaviorSubject<string>;
  get mode(): Observable<any> {
    return this._mode.asObservable();
  }

  private _value: BehaviorSubject<number>;
  get value(): Observable<any> {
    return this._value.asObservable();
  }

  private _visible: BehaviorSubject<boolean>;
  get visible(): Observable<any> {
    return this._visible.asObservable();
  }

  setBufferValue(value: number): void {
    this._bufferValue.next(value);
  }

  setMode(value: 'determinate' | 'indeterminate' | 'buffer' | 'query'): void {
    this._mode.next(value);
  }

  setValue(value: number): void {
    this._value.next(value);
  }

  show(): void {
    this._visible.next(true);
  }

  hide(): void {
    this._visible.next(false);
  }

  private _init(): void {
    this._bufferValue = new BehaviorSubject(0);
    this._mode = new BehaviorSubject('indeterminate');
    this._value = new BehaviorSubject(0);
    this._visible = new BehaviorSubject<boolean>(false);

    this._router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.show();
      });

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel))
      .subscribe(() => {
        this.hide();
      });
  }
}
