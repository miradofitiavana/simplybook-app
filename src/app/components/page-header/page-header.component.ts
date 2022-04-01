import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: 'page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PageHeaderComponent implements OnInit {
  @Input() withActions = false;

  constructor() {
  }

  ngOnInit() {
  }
}
