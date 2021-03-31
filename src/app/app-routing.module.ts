import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddConsultationComponent } from './consultation/add-consultation/add-consultation.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { EditConsultationComponent } from './consultation/edit-consultation/edit-consultation.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { EditPatientComponent } from './patient/edit-patient/edit-patient.component';
import { PatientComponent } from './patient/patient.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [
  {path: '', component: MainpageComponent},
  {path: 'login', component: UserloginComponent},
  {
    path: 'patient', 
    children: [
      {
        path: 'add',
        component: AddPatientComponent
      },
      {
        path: 'edit',
        component: EditPatientComponent
      },
      { path: '', component: PatientComponent, pathMatch: 'full'}
            ]
},
{
  path: 'consultation', 
  children: [
    {
      path: 'add',
      component: AddConsultationComponent
    },
    {
      path: 'edit',
      component: EditConsultationComponent
    },
    { path: '', component: ConsultationComponent, pathMatch: 'full'}
          ]
},
{path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
