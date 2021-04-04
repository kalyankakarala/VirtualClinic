import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpComponent } from '../popups/verify-otp/verify-otp.component';
import { APIService } from '../services/api-service';
import { TokenStorageService } from '../services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string = '';
  dialogRef: MatDialogRef<VerifyOtpComponent> | undefined;
  constructor(private formBuilder: FormBuilder, private router: Router,public _dialog: MatDialog, private apiService: APIService, private tokenStorage: TokenStorageService, private toastr: ToastrService) { 
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().roles[0];
    }
}

get data() { return this.loginForm.controls}

onSubmit() {  
  if (this.loginForm.invalid) {
    return;
  }
  else {
    let data= this.loginForm.value;
    let obj= {
      "username": data.username || '',
    "password": data.password || ''
    }
    console.log(obj);
    this.apiService.login(obj).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().roles[0];
        //this.toastr.success("Login Successfull !");
        this.getOtp(obj);
        console.log(this.role);
        //this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.toastr.error("Login Failed !");
      }
    );  
    //this.getOtp(obj);
     
  }
  

}

  private getOtp(obj: { username: any; password: any; }) {
    console.log(obj);
    const dialogRef = this._dialog.open(VerifyOtpComponent, {
      width: '500px',
      disableClose: false,
      autoFocus: true,
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.submitted = true;
      this.router.navigate(['patient/addpatient']);

    });
    this.apiService.getOTP().subscribe(
      data => {
        console.log(data);
        //this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
    
  }
}
