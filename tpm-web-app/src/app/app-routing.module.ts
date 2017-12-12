import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OffersComponent } from './components/offers/offers.component';
import { MyOffersIndividualComponent } from './components/my-offers-individual/my-offers-individual.component';
/*import {AuthGuard} from "./guards/auth/auth.guard";
import {UnAuthGuard} from "./guards/un-auth/un-auth.guard";*/

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent/*, canActivate: [UnAuthGuard]*/},
            { path: 'signup', component: SignupComponent/*canActivate: [UnAuthGuard]*/ },
            { path: 'offers/trip', component: OffersComponent },
            { path: 'offers/ride', component: OffersComponent },
            { path: 'offers/renting', component: OffersComponent },
            { path: 'my-offers-agency', component: MyOffersComponent/*canActivate: [UnAuthGuard]*/ },
            { path: 'my-offers-individual', component: MyOffersIndividualComponent/*canActivate: [UnAuthGuard]*/ },
            { path: '**', redirectTo: '/', pathMatch: 'full' },
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ],
        {useHash: true}),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
