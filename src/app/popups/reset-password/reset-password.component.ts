import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';
import { DataService } from '../../services/data.service';
import { APIService } from '../../services/api-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errorMessage = "";
  payload:any;
  isReset=true;
  submitted=false;
  constructor(private formBuilder: FormBuilder,  private router: Router,  public dialogRef: MatDialogRef<ResetPasswordComponent>,public _dialog: MatDialog, private dataService: DataService, private apiService: APIService) { 
    dialogRef.disableClose = true;
    this.resetForm= this.formBuilder.group({
  
      password: new FormControl('',[ Validators.required]),
      confirmpassword: new FormControl('',[ Validators.required]),
    },
    {
      validator: this.checkIfMatchingPasswords('password', 'confirmpassword')    
    })
  }
  get data(){
    return this.resetForm.controls
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    this.payload = this.dataService.getSignupObj();
    this.isReset = this.dataService.getPasswordTitle();
  }
  closeDialog(){
    this.dialogRef.close();
  }
  onSubmit(){   
    if(this.resetForm.invalid){
      return 
    } else{
      let data = this.resetForm.value;
      this.payload.password = data.password;
      console.log(this.payload);
      this.submitted = true;
      
      this.dialogRef.close();
      this.apiService.signup(this.payload).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['login']);
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );

    }
      
  }

}
