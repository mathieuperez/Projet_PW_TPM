import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import {LoginComponent} from './components/login/login.component';
//import {SignupComponent} from './components/signup/signup.component';
import {AppRoutingModule} from './app-routing.module';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { UsersService } from './services/users/users.service';


@NgModule({
  declarations: [
    AppComponent,
    //SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
