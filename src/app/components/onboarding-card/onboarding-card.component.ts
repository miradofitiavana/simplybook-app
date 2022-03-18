import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'onboarding-card',
  templateUrl: 'onboarding-card.component.html',
  styleUrls: ['./onboarding-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class OnboardingCardComponent implements OnInit {

  @Input() number: number = 0;
  @Input() image: string = '';
  @Input() title: string = "";
  @Input() text: string = "";
  @Input() disableButton: boolean = false;
  @Input() button: string = "";

  constructor() {
  }

  ngOnInit() {
  }
}
