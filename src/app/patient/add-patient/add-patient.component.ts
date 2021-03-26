import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
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
      mobile:new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]),  
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
  "reason":data.reason || ""
}
console.log({'obj':obj});


  }
  selectionlists(date: any){

  }

  resetData(){
    this.registerForm.reset()
    this.message="please select gender"
  }
}

