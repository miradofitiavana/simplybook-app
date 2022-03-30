import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'settings-design',
  templateUrl: 'design.component.html'
})

export class DesignComponent implements OnInit {
  choices = [
    {
      value: 'v1',
      valueDisplay: 'v1',
      image: 'https://ramira.secure.simplybook.it/v2/images/admin/themes/preview-image/inspiration/1.png'
    },
    {
      value: 'v2',
      valueDisplay: 'v2',
      image: 'https://ramira.secure.simplybook.it/v2/images/admin/themes/preview-image/air/1.png'
    }
  ];

  designForm: FormGroup;
  saving: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.designForm = new FormGroup({
      'design_version': new FormControl(),
    });
  }

  saveDesignWeek(): void {

  }
}
