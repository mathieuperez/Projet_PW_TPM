import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../../app-constants';

declare const $: any;

/**
 * Define logic of the login page of the application.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    /**
     * FormGroup for the login form.
     */
    private loginForm: FormGroup;

    /**
     * If true, show loading spinner on the login submit button.
     */
    private loginLoading: boolean;

    /**
     * True if the form has been submitted at least one.
     */
    private loginSubmitted: boolean;

    /**
     * If true error for run again the login.
     */
    private loginError: boolean;

    private modalBody: string;

    @ViewChild('loginModal')
    private loginModal: ElementRef;

    /**
     * LoginComponent constructor.
     * @param {Router} router
     * @param {HttpClient} httpClient
     */
    public constructor(private router: Router,
                       private httpClient: HttpClient) { }

    /**
     * Initialize FormGroup for login form.
     */
    public ngOnInit(): void {
        this.loginLoading = false;
        this.loginSubmitted = false;
        this.loginError = false;
        this.loginForm = new FormGroup({
            login: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ])
        });
    }

    /**
     * Submit the login form.
     */
    public submitLoginForm(): void {
        this.loginSubmitted = true;

        if (this.loginForm.valid && !this.loginLoading) {
            this.loginLoading = true;
            this.httpClient.post('/api/users/token',
                this.loginForm.value, {
                    responseType: 'json'
                }
            ).subscribe((response: any) => {
                this.loginLoading = false;
                localStorage.setItem(AppConstants.ACCESS_COOKIE_NAME, response['token']);
                localStorage.setItem(AppConstants.LOGIN_USER, response['user'].email);
                localStorage.setItem(AppConstants.ROLE_USER, response['user'].role);
                this.router.navigate(['/']);
            }, () => {
                $(this.loginModal.nativeElement).modal('show');
                this.loginLoading = false;
                this.loginError = true;
                this.modalBody = 'Une erreur est survenue lors de votre connexion.';
            });
        }
    }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get login (): AbstractControl { return this.loginForm.get('login'); }

    /**
     * Getter for the password FormControl.
     * @return {AbstractControl}
     */
    public get password (): AbstractControl { return this.loginForm.get('password'); }
}
