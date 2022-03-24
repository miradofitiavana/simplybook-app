import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {Subject} from "rxjs";
import {LabelType, Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';

  panels: any[] = [];
  selectedPanel: string = 'week';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.panels = [
      {
        id: 'week',
        icon: 'event_note',
        title: 'Planning pour la semaine',
        description: 'Configurez votre calendrier hebdomadaire par défaut. Si vous êtes fermé à un jour précis, définissez le jour dans "Planning des jours spéciaux".'
      },
      {
        id: 'special',
        icon: 'today',
        title: 'Planning des jours spéciaux',
        description: 'Configurez ici votre calendrier annuel. Cliquez sur une date pour en définir les horaires.'
      }
    ];
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    if (this.drawerMode === 'over') {
      this.drawer.close().then(value => {
      });
    }
  }

  getPanelInfo(id: string): any {
    return this.panels.find(panel => panel.id === id);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

}
