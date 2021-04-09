import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  singupObj = {};
  isReset = false;
  constructor() { }

  public setSingupObj(obj: any, reset:boolean): void {
    this.singupObj = obj;
    this.isReset = reset;
    console.log(this.singupObj)
  }

  public getSignupObj(): any {
    return this.singupObj;
  }

  public getPasswordTitle(): any | null {
    return this.isReset;
  }
}
