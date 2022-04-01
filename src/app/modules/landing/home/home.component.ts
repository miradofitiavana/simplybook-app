import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  toggled: boolean = false;
  selected: string = "Collections";
  isToggle: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleBtn() {
    this.toggled = !this.toggled;
  }

}
