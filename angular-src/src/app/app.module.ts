import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { ShowtaskComponent } from './components/showtask/showtask.component';
import { EdittaskComponent } from './components/edittask/edittask.component';
import { DetailtaskComponent } from './components/detailtask/detailtask.component';


import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuard1 } from './guards/auth1.guard';

const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent,  canActivate:[AuthGuard1]},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'addtask', component: AddtaskComponent },
  {path:'showtask', component: ShowtaskComponent },
  {path: 'edittask/:_id',component: EdittaskComponent },
  {path: 'detailtask/:_id',component: DetailtaskComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AddtaskComponent,
    ShowtaskComponent,
    EdittaskComponent,
    DetailtaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, AuthService, AuthGuard, AuthGuard1],
  bootstrap: [AppComponent]
})
export class AppModule { }
