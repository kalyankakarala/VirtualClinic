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
  selectedStatus: Array<string>;
  constructor(private formBuilder: FormBuilder, private router: Router) { 
this.selectedStatus=[]
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      dateOfBirth:['', Validators.required],
      options: new FormControl('male'),
      Email: ['', Validators.required],
      Mobile:['', Validators.required],
      Address: ['', Validators.required]

    });
  }
  get data() { return this.registerForm.controls; }
  ngOnInit(): void {
  }

  uploadSubmit(event: any){
console.log(this.registerForm.value)
this.registerForm.value

  }
  selectionlists(date: any){

  }
}
