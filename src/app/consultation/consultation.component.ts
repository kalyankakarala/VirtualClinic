import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodicElement } from '../patient/patient.component';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  tabs=['Requested','Active','Complete']
  ELEMENT_DATA: PeriodicElement[] = [
   {patientId: 1, patientName: 'A', caseSummary : 'Diabetes', requestDate: '30/04/2021'},
   {patientId: 2, patientName: 'B', caseSummary : 'BP', requestDate: '05/04/2021'},
   {patientId: 3, patientName: 'C', caseSummary : 'Nerve Weekness', requestDate: '06/04/2021'},
   {patientId: 4, patientName: 'D', caseSummary : 'Fever', requestDate: '10/04/2021'},


 ];
 dataSource: any[]=[]
 columnsToDisplay = ['patientId', 'patientName', 'caseSummary', 'requestDate', 'Actions' ];
 errorMessage ='';
 patienData: any[]=[];
 isPatient: boolean=false;
 userMail: string="";
  constructor(private tokenStorage: TokenStorageService){
    this.patienData = this.ELEMENT_DATA
  }
  ngOnInit(): void{
    this.tokenStorage.isPatient.subscribe((patient:boolean) =>
    {
      this.isPatient = patient;
    });
    if (this.tokenStorage.getToken()) {
      this.userMail = this.tokenStorage.getUser().email;
    }
  }
}