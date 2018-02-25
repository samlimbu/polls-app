import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PolladdComponent } from './polladd/polladd.component';
import { PolladdoptionComponent } from './polladd.options/polladd.options.component';
import { PolldetailComponent } from './polldetail/polldetail.component';
import { PollsService } from './services/polls.service';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    PolladdComponent,
    PolladdoptionComponent,
    PolldetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ValidateService, AuthService, AuthGuardService, PollsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
