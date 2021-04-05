import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { APIService } from '../services/api-service';

export interface PeriodicElement {
 patientId: number,
 patientName: string,
 caseSummary: string,
 requestDate: string
}
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PatientComponent implements OnInit {

  tabs=['Requested','Active','Complete']
   ELEMENT_DATA: PeriodicElement[] = [
    {patientId: 1, patientName: 'A', caseSummary : 'Diabetes', requestDate: '30/04/2021'},
    {patientId: 2, patientName: 'B', caseSummary : 'BP', requestDate: '05/04/2021'},
    {patientId: 3, patientName: 'C', caseSummary : 'Nerve Weekness', requestDate: '06/04/2021'},
    {patientId: 4, patientName: 'D', caseSummary : 'Fever', requestDate: '10/04/2021'},


  ];
  dataSource: any[]=[]
  columnsToDisplay = ['patientId', 'firstName', 'lastName','dateOfBirth', 'gender','email','mobile','country', 'state', 'address','reason'];
  errorMessage ='';
  patienData: any[]=[];
  constructor(private apiservice: APIService){
    this.dataSource= this.ELEMENT_DATA   
  }
  ngOnInit(){}
 
  onselectChange(tab: any){
console.log(tab);

  }

  getAllPatients(){
    this.apiservice.getAllPatients().subscribe(res=>{
     this.patienData= res
      
    },
    err => {
      this.errorMessage = err.error.message;
    }
    )
  }
}
