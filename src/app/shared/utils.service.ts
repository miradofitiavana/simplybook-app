import {Injectable} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AbstractControl} from "@angular/forms";

@Injectable()
export class UtilsService {

  constructor(
    private sanitizer: DomSanitizer,
  ) {
  }

  removeFormControlError(control: AbstractControl, errorName: string) {
    if (control?.errors && control?.errors[errorName]) {
      delete control.errors[errorName];
      if (Object.keys(control.errors).length === 0) {
        control.setErrors(null);
      }
    }
  }

  randomId(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';

    for (let i = 0; i < 10; i++) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return name;
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /*
  * TIME
   */
  timeToMinutes(time: string): number {
    let t = time.split(':');
    return parseInt(t[0]) * 60 + parseInt(t[1]);
  }

  timeConvert(n): string {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours.toString().padStart(2, "0")}:${rminutes.toString().padStart(2, "0")}`;
  }
  addTime(from: string, time: string): string {
    let f = from.split(':');
    let t = time.split(':');
    let fromInt = parseInt(f[0]) * 60 + parseInt(f[1]);
    let toInt = parseInt(t[0]) * 60 + parseInt(t[1]);
    let total = fromInt + toInt;
    if (total >= 1440) total -= 1440;
    return this.timeConvert(total);
  }
}
