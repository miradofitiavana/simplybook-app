import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'confirm-alert',
  templateUrl: 'confirm-alert.component.html'
})

export class ConfirmAlertComponent implements OnInit {

  alert: boolean = false;

  constructor() {
  }

  closeAlert() {
    this.alert = !this.alert;
  }

  ngOnInit() {
  }
}
