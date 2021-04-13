import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder) {

    this.contactForm = this.formBuilder.group({
      Comment: new FormControl('',[Validators.required]),
    });
   }
 
  ngOnInit(){
  }

  get data() { return this.contactForm.controls}
  
contactFormSubmit(){
console.log(this.contactForm.value)
let data=  this.contactForm.value

let obj = {
  "comment": data.Comment
}
console.log(obj);

}
}