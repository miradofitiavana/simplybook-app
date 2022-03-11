import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'sign-up-viewer',
  templateUrl: 'sign-up-viewer.component.html',
  styleUrls: ['./sign-up-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SignUpViewerComponent implements OnInit {
  @Input() permalink: string = "";
  @Input() nom: string = "";
  @Input() description: string = "";

  constructor() {
  }

  ngOnInit() {
  }
}
