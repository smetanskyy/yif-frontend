import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterseptor } from './interseptors/auth.interseptor';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { UniversityPageComponent } from './shared/university-page/university-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    UniversityPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    QuillModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterseptor },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
