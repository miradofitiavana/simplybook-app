import {Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationItem} from "./navigation-item.types";
import {NavigationService} from "./navigation.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit, OnDestroy {
  collapsed: boolean = false;
  @Input() navigation: NavigationItem[] = [
    {
      id: "app",
      type: "group",
      title: "Applications",
      children: [
        {
          id: 'dashboard',
          title: 'Tableau de bord',
          type: 'basic',
          icon: 'dashboard',
          link: '/dashboard',
        },
        {
          id: 'profile',
          title: 'Mon Profil',
          type: 'basic',
          icon: 'account_circle',
          link: '/profile',
        }, {
          id: 'mes-reservations',
          title: 'Mes Réservations',
          subtitle: '3 rendez-vous à venir',
          type: 'basic',
          icon: 'today',
          link: '/booking',
        },
        {
          id: 'mes-options',
          title: 'Mes Options',
          type: 'basic',
          icon: 'view_module',
          link: '/options',
        }
      ]
    }

  ];
  name: string = "e";
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _navigationService: NavigationService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  @HostBinding('class') get classList(): any {
    return {
      'collapse': this.collapsed
    };
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this._navigationService.isCollapsed
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: boolean) => {
        console.log(event);
        this.collapsed = event;
      });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

}
