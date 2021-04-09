import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private patient: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public login()
  {
    this.loggedIn.next(true);
  }

  public get isPatient()
  {
    return this.patient.asObservable();
  }

  public setUserRole(r:string)
  {
    if(r === 'ROLE_USER')
    {
      this.patient.next(true);
    }else{
      this.patient.next(false);
    }
  }

  constructor(private router: Router) { }

  signOut(): void {
    window.sessionStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log(token)
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}