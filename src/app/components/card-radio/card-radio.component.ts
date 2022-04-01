import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'card-radio',
  templateUrl: 'card-radio.component.html',
  styleUrls: ['./card-radio.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CardRadioComponent implements OnInit {

  @Input() selected: boolean;
  @Output() selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  update() {
    this.selectedChange.emit(true);
  }
}
