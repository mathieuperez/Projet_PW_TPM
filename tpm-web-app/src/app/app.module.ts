import { UnauthGuard } from './guards/unauth-guard.guard';
import { AuthAgencyGuard } from './guards/auth-agency-guard.guard';
import { AuthUserGuard } from './guards/auth-user-guard.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './app-routing.module';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OffersComponent } from './components/offers/offers.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { MyOffersIndividualComponent } from './components/my-offers-individual/my-offers-individual.component';
import { BookingComponent } from './components/booking/booking.component';
import { AuthIndividualGuard } from './guards/auth-individual-guard.guard';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    OffersComponent,
    MyOffersComponent,
    MyOffersIndividualComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthUserGuard,
    AuthIndividualGuard,
    AuthAgencyGuard,
    UnauthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
