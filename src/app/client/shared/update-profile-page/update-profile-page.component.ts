import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-update-profile-page',
  templateUrl: './update-profile-page.component.html',
  styleUrls: ['./update-profile-page.component.scss']
})
export class UpdateProfilePageComponent implements OnInit {
  form: FormGroup | any;
  submitted = false;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
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

    this.clientService.getClientProfile().subscribe(res => {
      console.log("GET USER INFO: ", res);
      this.form.patchValue(
        {
          ...res,
          phone: res.phoneNumber === null ? "+380" : res.phoneNumber,
          school: res.schoolName
        });
        this.spinnerService.hide();
    },
      err => {
        console.log("ERROR GET USER INFO: ", err);
        this.spinnerService.hide();
      })
  }

  setPhoto(){
    
  }

  public submit() {
    this.spinnerService.show();
    if (this.form.invalid) {
      return;
    }

    const clientInfo = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      middleName: this.form.value.middleName,
      email: this.form.value.email,
      phoneNumber: this.form.value.phone,
      schoolName: this.form.value.school
    }

    this.clientService.setClientProfile(clientInfo).subscribe(
      res => { console.log("SET USER INFO: ", res) },
      err => { console.log("ERROR SET USER INFO: ", err); });

    this.router.navigate(['/client', 'dashboard']);
    this.spinnerService.hide();
  }
}
