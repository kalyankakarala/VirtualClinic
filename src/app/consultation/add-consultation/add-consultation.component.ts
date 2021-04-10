import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../../services/api-service';
import { TokenStorageService } from '../../services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-consultation',
  templateUrl: './add-consultation.component.html',
  styleUrls: ['./add-consultation.component.css']
})
export class AddConsultationComponent implements OnInit {

  errorMessage = '';
  role: string = '';
  isLoggedIn = false;
  consultationForm: FormGroup;
  consultCase: string[] = ["EMERGENCY", "NORMAL"];
  message= "";
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: APIService, private tokenStorage: TokenStorageService,  public snackBar: MatSnackBar) {

    this.consultationForm = this.formBuilder.group({
  title: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  caseDetails:  new FormControl('',[Validators.required])
    });
  }
   
  get consultdata() { 

    return this.consultationForm.controls; }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().roles[0];
    }
  }

  selectCase(e: any){
    if(e.source._checked){
      this.message=""
    }
  }
  ConsultDataSubmit(e: any){
    if(this.consultationForm.value.caseDetails==""){
      this.message="Please select either one. "
    }
    if (this.consultationForm.invalid) {
      return
    }
  let data=this.consultationForm.value;

  let obj={
    "title":data.title || "",
    "description": data.description || "",
    "caseType":data.caseDetails || ""
  }
  console.log(obj);

  this.apiService.requestConsultation(obj).subscribe(
    data => {
      console.log(data);
      this.snackBar.open("Consultation Requested Succesfully", "close", {
        duration: 500,
      });
      this.router.navigate(['consultation']);
    },
    err => {
      this.errorMessage = err.error.message;
    }
  );
  
  }
  cancelData(){
    this.consultationForm.reset();
  }

}
