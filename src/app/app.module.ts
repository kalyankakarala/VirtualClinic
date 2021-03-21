import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { PatientComponent } from './patient/patient.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { EditPatientComponent } from './patient/edit-patient/edit-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    UserloginComponent,
    PatientComponent,
    AddPatientComponent,
    EditPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
