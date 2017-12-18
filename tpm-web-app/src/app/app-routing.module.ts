import { AuthIndividualGuard } from './guards/auth-individual-guard.guard';
import { BookingComponent } from './components/booking/booking.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OffersComponent } from './components/offers/offers.component';
import { MyOffersIndividualComponent } from './components/my-offers-individual/my-offers-individual.component';
import { AuthUserGuard } from './guards/auth-user-guard.guard';
import { AuthAgencyGuard } from './guards/auth-agency-guard.guard';
import { UnauthGuard } from './guards/unauth-guard.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent, canActivate: [UnauthGuard]},
            { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard] },
            { path: 'offers/trip', component: OffersComponent },
            { path: 'offers/ride', component: OffersComponent },
            { path: 'offers/renting', component: OffersComponent },
            { path: 'my-offers-agency', component: MyOffersComponent, canActivate: [AuthAgencyGuard] },
            { path: 'my-offers-individual', component: MyOffersIndividualComponent, canActivate: [AuthIndividualGuard] },
            { path: 'booking', component: BookingComponent, canActivate: [AuthUserGuard] },
            { path: '**', redirectTo: '/', pathMatch: 'full' },
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ],
        {useHash: true}),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
