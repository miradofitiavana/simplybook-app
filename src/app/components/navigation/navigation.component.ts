import {Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationItem} from "./navigation-item.types";
import {NavigationService} from "./navigation.service";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {UtilsService} from "../../shared/utils.service";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit, OnDestroy {

  onCollapsableItemCollapsed: ReplaySubject<NavigationItem> = new ReplaySubject<NavigationItem>(1);
  onCollapsableItemExpanded: ReplaySubject<NavigationItem> = new ReplaySubject<NavigationItem>(1);
  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  collapsed: boolean = false;

  @Input() name: string = this._utilsService.randomId();
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
          id: 'mes-reservations',
          title: 'Mes Réservations',
          subtitle: '3 rendez-vous à venir',
          type: 'basic',
          icon: 'today',
          link: '/booking',
        },
        {
          id: 'ma-structure',
          title: 'Infos Structure',
          type: 'basic',
          icon: 'settings',
          link: '/structure',
        },
        {
          id: 'mes-options',
          title: 'Mes Options',
          type: 'basic',
          icon: 'view_module',
          link: '/options',
        },
        {
          id: 'profile',
          title: 'Mon Profil',
          type: 'basic',
          icon: 'account_circle',
          link: '/profile',
        }
      ]
    },
    {
      id: "admin",
      type: "group",
      title: "Administration",
      children: [
        {
          id: 'gestion-diverses',
          title: 'Gestions diverses',
          type: 'collapsable',
          icon: 'account_circle',
          children: [
            {
              id: 'gestion-categorie',
              title: 'Gestion catégories',
              type: 'basic',
              link: "/admin/gestion/categories"
            },
            {
              id: 'gestion-categorie',
              title: 'Gestion catégories',
              type: 'basic',
              link: "/profile"
            }
          ]
        }
      ]
    }
  ];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _navigationService: NavigationService,
    private _utilsService: UtilsService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  @HostBinding('class') get classList(): any {
    return {
      'collapse': this.collapsed
    };
  }

  ngOnDestroy(): void {
    this._navigationService.deregisterComponent(this.name);

    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    if (this.name === '') {
      this.name = this._utilsService.randomId();
    }

    this._navigationService.registerComponent(this.name, this);

    this._navigationService.isCollapsed
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: boolean) => {
        this.collapsed = event;
      });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

}
