import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }
  ngOnInit(): void {
}

get data() { return this.loginForm.controls}

onSubmit() {  
  if (this.loginForm.invalid) {
    return;
  }
  else {
    let data= this.loginForm.value;
    let obj= {
      "username": data.username || '',
    "password": data.password || ''
    }  
    console.log({'obj':obj});
    
    this.submitted = true;      
  }
  this.router.navigate(['patient/addpatient']);
}
}
