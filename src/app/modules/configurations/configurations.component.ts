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
  selectedPanel: string = 'design';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.panels = [
      {
        id: 'week',
        icon: 'event_note',
        title: 'Planning pour la semaine',
        description: 'Configurez votre calendrier hebdomadaire par défaut. Définissez les cas exceptionnels dans "Planning des jours spéciaux".'
      },
      {
        id: 'special',
        icon: 'today',
        title: 'Planning des jours spéciaux',
        description: 'Configurez ici vos disponibilité ou indisponibilités exceptionnelles.'
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
