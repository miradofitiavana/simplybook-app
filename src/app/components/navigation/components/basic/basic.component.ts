import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';
import {NavigationItem} from "../../navigation-item.types";

@Component({
	selector: 'navigation-basic',
	templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NavigationBasicComponent implements OnInit, OnDestroy {
	@Input() item: NavigationItem;
	@Input() name: string;

	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
	) {
	}

	ngOnInit(): void {
		this._changeDetectorRef.markForCheck();
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}
}
