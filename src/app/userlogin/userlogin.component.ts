import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpComponent } from '../popups/verify-otp/verify-otp.component';
import { APIService } from '../services/api-service';
import { TokenStorageService } from '../services/token-storage.service';
import { ResetPasswordComponent } from '../popups/reset-password/reset-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  otpData: any;
  
  constructor( private formBuilder: FormBuilder, private router: Router, public snackBar: MatSnackBar,public _dialog: MatDialog, private apiService: APIService, private tokenStorage: TokenStorageService) { 
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
        var tk = data.token;
        tk = tk.replace(/^Bearer\s/, '');
        console.log(tk)
        this.tokenStorage.saveToken(tk);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.login();
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().roles[0];
        this.tokenStorage.setUserRole(this.role);
        this.snackBar.open("succesfully loggedin", "close", {
          duration: 500,
        });
        console.log(this.role);
        this.router.navigate(['consultation']);
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.snackBar.open("login Failed.....!", "close", {
          duration: 500,
        });
      }
    );  
     
  }
  //this.getOtp(); 

}


getOtp() {
  const dialogRef = this._dialog.open(VerifyOtpComponent, {
    width: '500px',
    disableClose: false,
    autoFocus: true
  });
  dialogRef.afterClosed().subscribe((result: any) => {
    this.submitted = true;
    this.router.navigate(['login']);

  });
    

    
  }

  openForgotDialog(){
    if(this.loginForm.value.username === '' || this.loginForm.value.username== undefined){
    
      this.snackBar.open('please enter email', 'close', {
        duration:1000
      })
      return
    }
    const dialogRef = this._dialog.open(ResetPasswordComponent, {
      width: '800px',
      disableClose: false,
      autoFocus: true,
      data: this.otpData || ''
    });
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   this.submitted = true;
    //   this.router.navigate(['consultation/add']);
    //     //this.reloadPage();

    // });

    this.loginForm.reset()
  }
}
