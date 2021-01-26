import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup | any;
  submited = false;

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'recaptcha');
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*-?&])[A-Za-z\d$@$!%*-?&].{7,}")]),
      RecaptchaToken: new FormControl("")
    })
  }

  submit(): void {
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      console.log("Recaptcha: ", token);
      this.form.patchValue({ RecaptchaToken: token })
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'recaptcha');
  }
}
