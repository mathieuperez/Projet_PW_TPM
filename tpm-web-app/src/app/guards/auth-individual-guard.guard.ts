import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConstants } from '../app-constants';

@Injectable()
export class AuthIndividualGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME) !== 'access_cookie') {
            if (localStorage.getItem(AppConstants.ROLE_USER) === 'Particulier') {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }

        this.router.navigate(['/login']);
        return false;
    }
}
