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
  
 dataSource: any[]=[]
 columnsToDisplay = ['patientName', 'caseTitle', 'caseType', 'status' ];
 errorMessage ='';
 patienData: any=[];
 isPatient: boolean=false;
 userMail: string="";
  constructor(private tokenStorage: TokenStorageService, private apiService: APIService,){
  
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
      data =>{
        console.log(data);
        this.patienData = data;
      }
    );
  }
}