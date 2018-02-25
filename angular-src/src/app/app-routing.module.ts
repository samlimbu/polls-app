import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    //{ path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]  }
  ]
@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class AppRoutingModule { }
