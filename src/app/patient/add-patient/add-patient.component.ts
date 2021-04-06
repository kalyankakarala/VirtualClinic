import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpComponent } from 'src/app/popups/verify-otp/verify-otp.component';
import { APIService } from 'src/app/services/api-service';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  registerForm: FormGroup
  confirmMessage = '';
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiservice:APIService, @Inject(MAT_DIALOG_DATA) private data1: any,public _dialog: MatDialog, public dialogRef: MatDialogRef<VerifyOtpComponent>) { 

    this.registerForm = this.formBuilder.group({
      email:new FormControl('',[ Validators.required]),
      password: new FormControl('',[ Validators.required]),
      confirmpassword: new FormControl('',[ Validators.required]),
    },
    {validator: this.checkIfMatchingPasswords('password', 'confirmpassword')
    
    })
  }
  get data() {   
  
    return this.registerForm.controls; }
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
 
  registerSubmit(){

    if(this.registerForm.invalid){
      return
    }
let data = this.registerForm.value;
let obj = {
  "email": data.email || '',
  "password": data.password || '',
  "confirmpassword":data.confirmpassword
}

  const dialogRef = this._dialog.open(VerifyOtpComponent, {
    width: '500px',
    disableClose: false,
    autoFocus: true,
    data: obj || ''
  });
  dialogRef.afterClosed().subscribe((result: any) => {
    this.submitted = true;
    this.router.navigate(['consultation/add']);
      //this.reloadPage();

  });
  
  
  }
  
  
}

