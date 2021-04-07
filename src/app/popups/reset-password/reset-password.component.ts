import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup
  submitted=false;
  constructor(private formBuilder: FormBuilder,  private router: Router,  public dialogRef: MatDialogRef<ResetPasswordComponent>,public _dialog: MatDialog,) { 
    dialogRef.disableClose = true;
    this.resetForm= this.formBuilder.group({
  
      password: new FormControl('',[ Validators.required]),
      confirmpassword: new FormControl('',[ Validators.required]),
    },
    {validator: this.checkIfMatchingPasswords('password', 'confirmpassword')
    
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
  }
  closeDialog(){
    this.dialogRef.close();
  }
  onSubmit(){   
    if(this.resetForm.invalid){
      return 
    }


    let data = this.resetForm.value
    let obj = {
    
      "password": data.password,
      "confirmpassword": data.confirmpassword
    }
    console.log(obj);

      this.submitted = true;
      this.router.navigate(['login']);
        //this.reloadPage();
    this.dialogRef.close()
  }

}
