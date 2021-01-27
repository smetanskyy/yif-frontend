import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup | any;
  submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router,
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
      recaptchaToken: new FormControl("", Validators.required)
    })
    
    this.recaptchaV3Service.execute("login").subscribe((token) => {
      this.form.patchValue({ recaptchaToken: token })
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      recaptchaToken: this.form.value.recaptchaToken
    }
    
    this.auth.login(user).subscribe( res => {
      console.log("Response: ", res);
    })
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'recaptcha');
  }
}
