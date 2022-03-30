import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'organisme-header',
  templateUrl: './organisme-header.component.html',
  styleUrls: ['./organisme-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrganismeHeaderComponent implements OnInit {

  show: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  showMenu() {
    this.show = !this.show
  }
}
