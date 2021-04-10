import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { APIService } from '../services/api-service';
import { TokenStorageService } from '../services/token-storage.service';

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
  columnsToDisplay = ['name', 'dateOfBirth', 'gender','email','mobile','country', 'state', 'address','reason'];
  errorMessage ='';
  patienData: any[]=[];
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
    this.apiService.getAllPatients().subscribe(
      data =>{
        console.log(data);
        this.patienData = data;
      }
    );
  }
 
}
