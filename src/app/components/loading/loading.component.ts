import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoadingComponent implements OnInit {

  @HostBinding('class.text-center') public textCenter: boolean = true;
  @Input() type: string = 'roller';

  constructor() {
  }

  ngOnInit() {
  }
}
