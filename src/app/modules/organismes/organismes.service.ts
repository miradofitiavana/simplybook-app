import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class OrganismesService {

  viewVersionChanged: Subject<any>;

  constructor() {
    this.viewVersionChanged = new Subject<any>();
    this.viewVersionChanged.next('v2');
  }
}
