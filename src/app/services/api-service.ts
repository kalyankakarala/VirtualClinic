import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';


const AUTH_API  = "http://localhost:8080/api/auth/signin";

const SIGNUP  = "http://localhost:8080/api/auth/patient/signup";

const GET_OTP_API  = "http://localhost:8080/api/otp/generateOtp";

const VALIDATE_OTP_API  = "http://localhost:8080/api/otp/validateOtp";

const ADD_CONSULT  = "http://localhost:8080/api/consultation/add";

const UPDATE_CONSULT  = "http://localhost:8080/api/consultation/update";

const GET_CONSULT  = "http://localhost:8080/api/consultation/findById/";

const GET_ALL_CONSULT  = "http://localhost:8080/api/consultation/findAll";

const UPDATE_PATIENT  = "http://localhost:8080/api/patient/update";

const GET_PATIENT  = "http://localhost:8080/api/patient/findById/";

const GET_ALL_PATIENT  = "http://localhost:8080/api/patient/findAll";

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
    return this.http.get(VALIDATE_OTP_API +"?otpnum="+otpnum , httpOptions);
  }

  requestConsultation(payload:any): Observable<any> {
    return this.http.post(ADD_CONSULT , payload, httpOptions);
  }

  updateConsultation(payload:any): Observable<any> {
    return this.http.post(UPDATE_CONSULT , payload, httpOptions);
  }

  getConsultation(cID:any):Observable<any> {
    return this.http.get(GET_CONSULT +"{"+cID+"}" , httpOptions);
  }

  getAllConsultations():Observable<any> {
    return this.http.get(GET_ALL_CONSULT , httpOptions);
  }

  signup(user:any): Observable<any> {
    return this.http.post(SIGNUP , user, httpOptions);
  }

  updatePatient(payload:any): Observable<any> {
    return this.http.post(UPDATE_PATIENT , payload, httpOptions);
  }

  getPatient(pID:any):Observable<any> {
    return this.http.get(GET_PATIENT +"{"+pID+"}" , httpOptions);
  }

  getAllPatients():Observable<any> {
    return this.http.get(GET_ALL_PATIENT , httpOptions);
  }


}
