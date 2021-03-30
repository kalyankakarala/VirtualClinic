import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<VerifyOtpComponent>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
