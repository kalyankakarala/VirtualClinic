import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [
  // {path:'', component:MainpageComponent},
  {path: '', component: UserloginComponent},

  {path: 'login', component: UserloginComponent},
  {path:'patient', component:AddPatientComponent,
children: [
  {path: 'addpatient', component: AddPatientComponent, pathMatch:'full'},
]
},
{path: '**', redirectTo: 'login', pathMatch: 'full'},

// {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
