import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {NavigationItem} from "../../navigation-item.types";
import {NavigationService} from "../../navigation.service";
import {NavigationComponent} from "../../navigation.component";
import {UserWorkspacesService} from "../../../../core/societe/user-workspaces.service";

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

  private uuid: string = null;

  private _navigationComponent: NavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _navigationService: NavigationService,
    private _workspaceService: UserWorkspacesService
  ) {
  }

  ngOnInit(): void {
    this._navigationComponent = this._navigationService.getComponent(this.name);
    this._navigationComponent.onRefreshed.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });

    this._workspaceService.workspace$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.uuid = value;
        console.log(value);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getRouterLink(item): string {
    return `${item.link}${item.by_society && this.uuid ? `/${this.uuid}` : ''}`;
  }
}
