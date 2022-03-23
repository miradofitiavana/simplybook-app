import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Layout} from "./layout.types";
import {Subject} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'layout',
	templateUrl: 'layout.component.html',
	styleUrls: ['./layout.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {

	layout: Layout;

	private _unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(
		private _activatedRoute: ActivatedRoute,
		@Inject(DOCUMENT) private _document: any,
		private _router: Router
	) {
	}

	ngOnInit() {
		let route = this._activatedRoute;
		while (route.firstChild) {
			route = route.firstChild;
		}

		const paths = route.pathFromRoot;
		paths.forEach((path) => {
			if (path.routeConfig && path.routeConfig.data && path.routeConfig.data['layout']) {
				this.layout = path.routeConfig.data['layout'];
			}
		});
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}
}
