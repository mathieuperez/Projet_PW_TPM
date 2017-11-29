import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RentingComponent } from './components/renting/renting.component';
import { RideComponent } from './components/ride/ride.component';
import { TripComponent } from './components/trip/trip.component';
/*import {AuthGuard} from "./guards/auth/auth.guard";
import {UnAuthGuard} from "./guards/un-auth/un-auth.guard";*/

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent/*, canActivate: [UnAuthGuard]*/},
            { path: 'signup', component: SignupComponent/*canActivate: [UnAuthGuard]*/ },
            { path: 'renting', component: RentingComponent/*canActivate: [UnAuthGuard]*/ },
            { path: 'ride', component: RideComponent/*canActivate: [UnAuthGuard]*/ },
            { path: 'trip', component: TripComponent/*canActivate: [UnAuthGuard]*/ },
            { path: '**', redirectTo: '/', pathMatch: 'full' },
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
