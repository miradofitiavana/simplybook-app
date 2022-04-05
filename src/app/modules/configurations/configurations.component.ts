import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {Subject} from "rxjs";

@Component({
  selector: 'configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationsComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';

  panels: any[] = [];
  selectedPanel: string = 'planning-hebdo';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.panels = [
      {
        id: 'planning-hebdo',
        icon: 'event_note',
        title: 'Planning hebdomadaire',
        description: 'Configurer vos heures hebdomadaires par défaut.'
      },
      {
        id: 'planning-special',
        icon: 'event_note',
        title: 'Planning spécial',
        description: 'Configurez ici vos disponibilité ou indisponibilités exceptionnelles.'
      },
      {
        id: 'schedule',
        icon: 'view_quilt',
        title: "Paramètres de l'agenda",
        description: 'Voulez-vous spécifier des paramètres fixes pour vos rendez-vous ?'
      },
      {
        id: 'design',
        icon: 'web',
        title: 'Configuration du design',
        description: ''
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
