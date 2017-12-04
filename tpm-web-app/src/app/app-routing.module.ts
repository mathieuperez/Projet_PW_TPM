import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OffersComponent } from './components/offers/offers.component';
/*import {AuthGuard} from "./guards/auth/auth.guard";
import {UnAuthGuard} from "./guards/un-auth/un-auth.guard";*/

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent/*, canActivate: [UnAuthGuard]*/},
            { path: 'signup', component: SignupComponent/*canActivate: [UnAuthGuard]*/ },
            { path: 'offers', component: OffersComponent, children: [
                { path: 'trip', component: OffersComponent },
                { path: 'renting', component: OffersComponent },
                { path: 'ride', component: OffersComponent }
            ]/*canActivate: [UnAuthGuard]*/ },
            { path: 'my-offers', component: MyOffersComponent/*canActivate: [UnAuthGuard]*/ },
            { path: '**', redirectTo: '/', pathMatch: 'full' },
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
