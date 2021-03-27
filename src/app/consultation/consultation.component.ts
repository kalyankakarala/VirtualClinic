import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  consultationForm: FormGroup;

  consultCase: string[] = ["EMERGENCY", "NORMAL"];
  message= "";
  constructor(private formBuilder: FormBuilder, private router: Router) {

    this.consultationForm = this.formBuilder.group({
  title: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  caseDetails:  new FormControl('',[Validators.required])
    });
  }
   
  get consultdata() { 

    return this.consultationForm.controls; }

  ngOnInit(): void {
  }

  selectCase(e: any){
    if(e.source._checked){
      this.message=""
    }
  }
  ConsultDataSubmit(e: any){
    if(this.consultationForm.value.caseDetails==""){
      this.message="please check any one case"
    }
    if (this.consultationForm.invalid) {
      return
    }
  let data=this.consultationForm.value;

  let obj={
    "title":data.title || "",
    "description": data.description || "",
    "caseDetails":data.caseDetails || ""
  }
  console.log(obj);
  
  }
  cancelData(){
    this.consultationForm.reset()
    this.message="please check any one case"
  }

}
