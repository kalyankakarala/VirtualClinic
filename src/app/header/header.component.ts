import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routerChangeButton: boolean=false;
  isLoggedIn: boolean=false;
  isPatient: boolean=false;
  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.tokenStorage.isLoggedIn.subscribe((loggedIn:boolean) =>
    {
      this.isLoggedIn = loggedIn;
    });
    this.tokenStorage.isPatient.subscribe((patient:boolean) =>
    {
      this.isPatient = patient;
    });
    
    
    console.log("Inside Header");
    console.log(this.isPatient);
    console.log(this.isLoggedIn);
  }

  logout() {
    this.tokenStorage.signOut();
  }


  }

