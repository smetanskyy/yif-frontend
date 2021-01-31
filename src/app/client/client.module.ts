import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ClientLayoutComponent } from "./shared/client-layout/client-layout.component";
import { DashboardPageComponent } from "./shared/dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./shared/login-page/login-page.component";
import { ProfilePageComponent } from "./shared/profile-page/profile-page.component";
import { RegisterPageComponent } from "./shared/register-page/register-page.component";
import { UpdateProfilePageComponent } from "./shared/update-profile-page/update-profile-page.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { environment } from "src/environments/environment"
import { ClientGuard } from "./client.guard";
import { QuillModule } from 'ngx-quill'

@NgModule({
    declarations: [
        ClientLayoutComponent,
        LoginPageComponent,
        RegisterPageComponent,
        DashboardPageComponent,
        ProfilePageComponent,
        UpdateProfilePageComponent
      ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RecaptchaV3Module,
        QuillModule.forRoot(),
        RouterModule.forChild([
            {
                path: '', component: ClientLayoutComponent, children: [
                    {path: '', redirectTo: 'login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'register', component: RegisterPageComponent},
                    {path: 'dashboard', component: DashboardPageComponent, canActivate: [ClientGuard]},
                    {path: 'profile', component: ProfilePageComponent, canActivate: [ClientGuard]},
                    {path: 'update', component: UpdateProfilePageComponent, canActivate: [ClientGuard]}
                ]
            }
        ])
    ],
    providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaSiteKey }],
    exports: [RouterModule]
})

export class ClientModule{

}