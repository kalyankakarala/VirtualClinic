import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';


const AUTH_API  = "http://localhost:8080/api/auth/signin";

const GET_OTP_API  = "http://localhost:8080/api/otp/generateOtp";

const VALIDATE_OTP_API  = "http://localhost:8080/api/otp/validateOtp";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})

export class APIService {
  
  constructor(private http: HttpClient) { }

  login(credentials:any): Observable<any> {
    return this.http.post(AUTH_API , credentials, httpOptions);
  }

  getOTP():Observable<any> {
    return this.http.get(GET_OTP_API , httpOptions);
  }

  validateOTP(otpnum:any):Observable<any> {
    return this.http.post(VALIDATE_OTP_API +"?otpnum="+otpnum , httpOptions);
  }


}
