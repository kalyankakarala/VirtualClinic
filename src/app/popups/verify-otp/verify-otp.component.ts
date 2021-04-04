import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { APIService } from '../../services/api-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class VerifyOtpComponent implements OnInit {
  errorMessage = '';
  role: string = '';
  isLoggedIn = false;
  otpForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<VerifyOtpComponent>, private apiService: APIService, private router: Router) { 
    dialogRef.disableClose = true;
    this.otpForm = this.formBuilder.group({
      otp: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.otpForm.invalid) {
      return;
    }else{
      let data= this.otpForm.value;
      let otpnum = data.otp || '';
      this.apiService.validateOTP(otpnum).subscribe(
        data => {
          console.log(data);
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
      this.router.navigate(['consultation/add']);
    }
   }

}
