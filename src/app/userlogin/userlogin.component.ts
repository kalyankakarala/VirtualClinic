import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpComponent } from '../popups/verify-otp/verify-otp.component';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  dialogRef: MatDialogRef<VerifyOtpComponent> | undefined;
  constructor(private formBuilder: FormBuilder, private router: Router,public _dialog: MatDialog, ) { 
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

  }
  ngOnInit(): void {
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
    const dialogRef = this._dialog.open(VerifyOtpComponent, {
      width: '500px',
      disableClose: false,
      autoFocus: true,
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {

    });
    this.submitted = true;      
  }
  
  this.router.navigate(['patient/addpatient']);
}
}
