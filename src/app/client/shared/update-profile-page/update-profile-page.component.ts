import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile-page',
  templateUrl: './update-profile-page.component.html',
  styleUrls: ['./update-profile-page.component.scss']
})
export class UpdateProfilePageComponent implements OnInit {
  form: FormGroup | any;
  submitted = false;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      // client name 
      name: new FormControl(null, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)]),

      // client middle name 
      middleName: new FormControl(null, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)]),

      // client surname 
      surname: new FormControl(null, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)]),

      // client photo 
      photo: new FormControl(null),

      // client phone 
      phone: new FormControl("+380", [Validators.required,
      Validators.pattern('[0-9+]*'),
      Validators.minLength(13),
      Validators.maxLength(13)]),

      // client email
      email: new FormControl(null, [Validators.required, Validators.email]),
      school: new FormControl(null, Validators.required)
    });
  }

  public submit() {

  }

  getClientPhoto(): string {
    return "http://localhost:5000/images/aed73414-5470-4fa7-8d59-5d226a5274cd.jpg";
  }
}
