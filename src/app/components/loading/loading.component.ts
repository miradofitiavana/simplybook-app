import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoadingComponent implements OnInit {

  @HostBinding('class') public classes: string = "flex flex-col items-center gap-4 text-center";
  @Input() type: string = 'roller';
  @Input() text: string = 'Chargement des données...';

  constructor() {
  }

  ngOnInit() {
  }
}
