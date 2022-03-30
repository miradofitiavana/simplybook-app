import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'organisme-v1',
  templateUrl: 'v1.component.html',
  encapsulation: ViewEncapsulation.None
})

export class OrganismeV1Component implements OnInit {
  @Input() permalink: string = "";
  show: boolean = false

  constructor() {
  }

  ngOnInit() {
  }

  showMenu() {
    this.show = !this.show
  }
}
