import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConstants } from '../app-constants';

@Injectable()
export class UnauthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME) === 'access_cookie') {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
