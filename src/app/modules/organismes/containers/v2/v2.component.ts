import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'organisme-v2',
  templateUrl: 'v2.component.html',
  encapsulation: ViewEncapsulation.None
})

export class OrganismeV2Component implements OnInit {
  @Input() permalink: string = "";
  show: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  showMenu() {
    this.show = !this.show
  }
}
