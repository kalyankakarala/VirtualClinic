import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  registerForm: FormGroup
  message=""
  selectedStatus: Array<string>;
  GenderDetails =["male", "female"]
  constructor(private formBuilder: FormBuilder, private router: Router) { 
this.selectedStatus=[]
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('',[ Validators.required]),
      lastName: new FormControl('',[ Validators.required]),
      dateOfBirth:new FormControl('',[ Validators.required]),
      gender: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      mobile:new FormControl('', [Validators.required]),  
      emergencyContact: new FormControl(''),
      country: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      reason:new FormControl('',[Validators.required])
    });
  }

  
  get data() {   
    return this.registerForm.controls; }
  ngOnInit(): void {
  }

  selectGender(e: any){
    if(e.source._checked){
      this.message=""
    
  }
}
  uploadSubmit(event: any){
    if(this.registerForm.value.gender==""){
      this.message="please select gender"
    }
    if(this.registerForm.invalid){
      return;
    }
let data=this.registerForm.value;
let obj={
  "firstName":data.firstName || '',
  "lastName":data.lastName || '',
  "dateOfBirth": data.dateOfBirth || '',
  "gender":data.gender || '',
  "email": data.email || '',
  "mobile":data.mobile || '',
  "country": data.country || '',
  "state": data.state || "",
 "address": data.address || "",
  "reason":data.reason || "none"
}
console.log(obj);


  }
  selectionlists(date: any){

  }

  resetData(){
    this.registerForm.reset()
    this.message="please select gender"
  }
}


