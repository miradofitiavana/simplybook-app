import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class OrganismesService {

  onOrganismeDataChanged: BehaviorSubject<any>;

  constructor() {
    this.onOrganismeDataChanged = new BehaviorSubject<any>({});
  }
}
