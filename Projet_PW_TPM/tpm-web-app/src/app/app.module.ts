import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './app-routing.module';

import {  TrajetService } from './services/trajet-service';


// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentingComponent } from './components/renting/renting.component';
import { RideComponent } from './components/ride/ride.component';
import { TripComponent } from './components/trip/trip.component';
import {TrajetComponent} from './components/offres/trajet/trajet.component';
import {TrajetCreateComponent} from './components/offres/trajet-create/trajet-create.component';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    RentingComponent,
    RideComponent,
    TrajetComponent,
    TrajetCreateComponent,
    TripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TrajetService],
  bootstrap: [AppComponent]
})
export class AppModule { }