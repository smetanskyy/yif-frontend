import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { UniversityPageComponent } from './shared/university-page/university-page.component';
import { AdminLayoutComponent } from './admin/shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './admin/shared/login-page/login-page.component';
import { RegisterPageComponent } from './admin/shared/register-page/register-page.component';
import { DashboardPageComponent } from './admin/shared/dashboard-page/dashboard-page.component';
import { ProfilePageComponent } from './admin/shared/profile-page/profile-page.component';
import { UpdateProfilePageComponent } from './admin/shared/update-profile-page/update-profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    UniversityPageComponent,
    AdminLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardPageComponent,
    ProfilePageComponent,
    UpdateProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
