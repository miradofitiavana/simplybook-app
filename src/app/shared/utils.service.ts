import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() {
  }

  randomId(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';

    for (let i = 0; i < 10; i++) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return name;
  }
}
