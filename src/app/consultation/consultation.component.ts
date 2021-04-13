import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { APIService } from '../services/api-service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  tabs=['Requested','Active','Complete']
  
 patientColumns = ['caseTitle', 'caseType','requestDate', 'status', 'action' ];
 doctorColumns = ['patientName', 'caseTitle', 'caseType','requestData', 'status', 'action' ];
 errorMessage ='';
 patientActive: any=[];
 patientComplete: any=[];
 patientRevist: any=[];
 patientReject: any=[];
 doctorActive: any=[];
 doctorComplete: any=[];
 doctorRevist: any=[];
 doctorReject: any=[];
 isPatient: boolean=false;
 userMail: string="";
  constructor(private tokenStorage: TokenStorageService, private apiService: APIService){
  
  }
  ngOnInit(): void{
    this.tokenStorage.isPatient.subscribe((patient:boolean) =>
    {
      this.isPatient = patient;
    });
    if (this.tokenStorage.getToken()) {
      this.userMail = this.tokenStorage.getUser().email;
    }
    this.apiService.getConsultationByMail(this.userMail).subscribe(
      (data:any[]) =>{
        data.forEach(el => {
          if(el.status == "ACTIVE")
          {
            this.patientActive = el.consultationes;
          } else if(el.status == "REJECT"){
            this.patientReject = el.consultationes;
          } else if(el.status == "REVISIT"){
            this.patientRevist = el.consultationes;
          } else if(el.status == "COMPLETED"){
            this.patientComplete = el.consultationes;
          }
        });
        console.log(data);
      }
    );
    this.apiService.getAllConsultations().subscribe(
      (docData:any[]) =>{
        docData.forEach(el => {
          if(el.status == "ACTIVE")
          {
            this.doctorActive = el.consultationes;
          } else if(el.status == "REJECT"){
            this.doctorReject = el.consultationes;
          } else if(el.status == "REVISIT"){
            this.doctorRevist = el.consultationes;
          } else if(el.status == "COMPLETED"){
            this.doctorComplete = el.consultationes;
          }
        });
        console.log(docData);
      }
    );
  }

  fetchConsultation(cId:string){
    console.log(cId);
  }
}