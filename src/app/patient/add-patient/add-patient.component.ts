import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetPasswordComponent } from 'src/app/popups/reset-password/reset-password.component';
import { VerifyOtpComponent } from 'src/app/popups/verify-otp/verify-otp.component';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  registerForm: FormGroup
  confirmMessage = '';
  errorMessage = '';
  submitted = false;
  message='';
  GenderDetails =["male", "female"]
  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService, @Inject(MAT_DIALOG_DATA) private data1: any,public _dialog: MatDialog, public dialogRef: MatDialogRef<VerifyOtpComponent>) { 

    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('',[ Validators.required]),
      lastName: new FormControl('',[ Validators.required]),
      dateOfBirth:new FormControl('',[ Validators.required]),
      gender: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      mobile:new FormControl('', [Validators.required]),  
      country: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      reason:new FormControl('',[Validators.required])

    })
  }
  get data() 
  {   
    return this.registerForm.controls; 
  }

 

 
  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }
 
  selectGender(e: any){
    if(e.source._checked){
      this.message=""
    
  }
}
  registerSubmit(){
    if(this.registerForm.value.gender==""){
      this.message="please select gender"
    }
    if(this.registerForm.invalid){
      return
    } else{
    let data = this.registerForm.value;
    let obj = {
      "email": data.email || '',
      "password": data.password || '',
      "address": data.address,
      "country": data.country,
      "dateOfBirth": data.dateOfBirth,
      "firstName": data.firstName,
      "gender": data.gender,
      "lastName": data.lastName,
      "mobile": data.mobile,
      "reason": data.reason,
      "state": data.state
    }

    this.dataService.setSingupObj(obj, false);
    
    this.setPassword(obj);
    }

  }

  setPassword(obj:any) {
    console.log("Inside popup")
    const dialogRef = this._dialog.open(ResetPasswordComponent, {
      width: '500px',
      disableClose: false,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.submitted = true;
      //this.router.navigate(['login']);
  
    });
  }
  

  resetData(){
    this.registerForm.reset()
    this.message="please select gender"
  }
}

