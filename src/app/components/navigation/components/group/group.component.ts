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
import {NavigationComponent} from "../../navigation.component";
import {NavigationItem} from "../../navigation-item.types";

@Component({
	selector: 'navigation-group',
	templateUrl: './group.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NavigationGroupComponent implements OnInit, OnDestroy {
	@Input() item: NavigationItem;
	@Input() name: string;

	private _navigationComponent: NavigationComponent;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
	) {
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	trackByFn(index: number, item: any): any {
		return item.id || index;
	}
}
