import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeHeaderComponent implements OnInit {

  opened: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  openMenu(solution: string) {
    this.opened = this.opened == 'solution' ? '' : solution;
  }
}
