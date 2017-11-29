import { Router } from '@angular/router';
import { AppConstants } from './../../app-constants';
import { AuthGuard } from './../../guards/auth-guard.guard';
import { Component, OnInit } from '@angular/core';

import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  /**
     * FormGroup for the search form.
     */
    private searchForm: FormGroup;

    /**
     * If true, show loading spinner on the search submit button.
     */
    private searchLoading: boolean;

    /**
     * True if the form has been submitted at least one.
     */
    private searchSubmitted: boolean;

  // users: Array<any>;

    // Create an instance of the DataService through dependency injection
    constructor(private router: Router) {

      // Access the Data Service's getUsers() method we defined
      /*this._dataService.getUsers()
          .subscribe(res => this.users = res);*/
    }

    /**
     * Initialize FormGroup for search form.
     */
    public ngOnInit(): void {
        this.searchLoading = false;
        this.searchSubmitted = false;
        this.searchForm = new FormGroup({

        });
        localStorage.setItem(AppConstants.ACCESS_COOKIE_NAME, 'access_cookie');
        localStorage.setItem(AppConstants.LOGIN_USER, 'login_user');
        localStorage.setItem(AppConstants.ROLE_USER, 'role_user');
    }

    public isLoggedIn(): boolean {
        if (localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME) !== 'access_cookie') {
            return true;
        }
        return false;
    }

    public getLogin(): string {
        return (localStorage.getItem(AppConstants.LOGIN_USER));
    }

    public logout(): void {
        localStorage.setItem(AppConstants.ACCESS_COOKIE_NAME, 'access_cookie');
        localStorage.setItem(AppConstants.LOGIN_USER, 'login_user');
        localStorage.setItem(AppConstants.ROLE_USER, 'role_user');
        this.router.navigate(['/']);
    }

}
