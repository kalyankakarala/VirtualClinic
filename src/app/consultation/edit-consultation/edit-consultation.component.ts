import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api-service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-edit-consultation',
  templateUrl: './edit-consultation.component.html',
  styleUrls: ['./edit-consultation.component.css']
})
export class EditConsultationComponent implements OnInit {

 
  errorMessage = '';
  role: string = '';
  title="Minimal Invasive Valve Surgery"
  description="The valves help blood flow through the heart's 4 chambers and out to your body normally. The surgery is called “minimally invasive” because it uses a smaller incision than a traditional open repair. This may lead to easier and faster recovery from surgery."
  caseType="EMERGENCY"
  isLoggedIn = false;
  EditConsultationForm: FormGroup;
  confrimActions: string[] = ["ACCEPT", "REJECT"];
  patientActions: string[]=['PatientReportRequired', 'PaymentRequired']
  isAccept: boolean= false
  message= "";
  consultationId: string="";
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: APIService, private tokenStorage: TokenStorageService) {

    this.EditConsultationForm = this.formBuilder.group({

  caseComments:  new FormControl('',[Validators.required]),
  actions: new FormControl('', [Validators.required]),
  confirmactions: new FormControl('', [Validators.required])

    });
  }
   
  get consultdata() { 

    return this.EditConsultationForm.controls; }

  ngOnInit(): void {
    this.consultationId =this.tokenStorage.getConsultationID();
    console.log(this.consultationId)
  }

  selectAction(e: any){
    console.log(e.value);
    if(e.source._checked ){
      if(e.value==='ACCEPT'){
      this.isAccept= true
    }
    else{
      this.isAccept=false
    }
      this.message=""
    }
  }

  selectCase(e: any){
    console.log(e);
    
    if(e.source._checked){
      this.isAccept= true
      this.message=""
    }
  }
  EditConsultDataSubmit(e: any){
    if(this.EditConsultationForm.value.caseComments=="" ){
      this.message="Please select either one. "
    }
    if (this.EditConsultationForm.invalid) {
      return
    }
  let data=this.EditConsultationForm.value;

  let obj={

    "caseComments":data.caseComments || ""
  }
  console.log(obj);

  
  }
  cancelData(){
    this.EditConsultationForm.reset();
  }
}