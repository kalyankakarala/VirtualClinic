import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { PatientComponent } from './patient/patient.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { EditPatientComponent } from './patient/edit-patient/edit-patient.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { DoctorComponent } from './doctor/doctor.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddConsultationComponent } from './consultation/add-consultation/add-consultation.component';
import { EditConsultationComponent } from './consultation/edit-consultation/edit-consultation.component';
import { VerifyOtpComponent } from './popups/verify-otp/verify-otp.component';
import { RevisitComponent } from './popups/revisit/revisit.component';
import { ResetPasswordComponent } from './popups/reset-password/reset-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { authInterceptorProviders } from './helper/auth.interceptor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    UserloginComponent,
    PatientComponent,
    AddPatientComponent,
    EditPatientComponent,
    NavbarComponent,
    ConsultationComponent,
    DoctorComponent,
    CalendarComponent,
    AddConsultationComponent,
    EditConsultationComponent,
    VerifyOtpComponent,
    RevisitComponent,
    ResetPasswordComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    FullCalendarModule 
  ],
  providers: [authInterceptorProviders,
    {provide:MatDialogRef , useValue:{} },

    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
