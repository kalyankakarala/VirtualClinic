import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class VerifyOtpComponent implements OnInit {
  otpForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<VerifyOtpComponent>, private authService: AuthService) { 
    dialogRef.disableClose = true;
    this.otpForm = this.formBuilder.group({
      otp: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() { }

}
