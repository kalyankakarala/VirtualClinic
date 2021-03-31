import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddConsultationComponent } from './consultation/add-consultation/add-consultation.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { PatientComponent } from './patient/patient.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [
  {path: '', component: UserloginComponent},
  {path: 'login', component: UserloginComponent},
  {path: 'patient', component:PatientComponent},
  {path: 'requestConsult', component: AddConsultationComponent},
  {path:'patient', component:AddPatientComponent,
        children: [
           {path: 'addpatient', component: AddPatientComponent, pathMatch:'full'},
            ]
},
{path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
