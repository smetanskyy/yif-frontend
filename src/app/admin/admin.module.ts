import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout.component";
import { DashboardPageComponent } from "./shared/dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./shared/login-page/login-page.component";
import { ProfilePageComponent } from "./shared/profile-page/profile-page.component";
import { RegisterPageComponent } from "./shared/register-page/register-page.component";
import { UpdateProfilePageComponent } from "./shared/update-profile-page/update-profile-page.component";

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: 'login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'register', component: RegisterPageComponent},
                    {path: 'dashboard', component: DashboardPageComponent},
                    {path: 'profile', component: ProfilePageComponent},
                    {path: 'update', component: UpdateProfilePageComponent}
                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AdminModule{

}