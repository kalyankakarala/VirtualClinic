import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routerChangeButton: boolean=false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routerChange(check:string){
    if(check=='login'){
    this.router.navigate(['/login'])
    setTimeout(()=>{  this.routerChangeButton= true   }, 500)

    }
    else{
      this.router.navigate([''])
      setTimeout(()=>{  this.routerChangeButton= false   }, 500)
     
    }
  }
}
