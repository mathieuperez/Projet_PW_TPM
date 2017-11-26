import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    /**
     * FormGroup for the signup form.
     */
    private signupForm: FormGroup;

    /**
     * True if the form has been submitted at least one.
     */
    private loginSubmitted: boolean;

    /**
     * If true error for run again the login.
     */
    private loginError: boolean;

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
        this.loginSubmitted = false;
        this.loginError = false;
        this.signupForm = new FormGroup({
            login: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ]),
            role: new FormControl('', [ Validators.required ])
        });
    }

    public submitSignupForm(): void {
        this.loginSubmitted = true;

        if (this.signupForm.valid) {
            this.httpClient.post('/api/users', {email: this.signupForm.value.login,
                password: this.signupForm.value.password,
                role: this.signupForm.value.role })
            .subscribe( (response) => {
                if (response['message'] && response['message'] === 'Success') {
                    alert("Inscription réalisée avec succès.");
                }
                else {
                    alert("Une erreur est survenue lors de votre inscription.");
                }
            });
        }
        else {

        }
    }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get login (): AbstractControl { return this.signupForm.get('login'); }

    /**
     * Getter for the password FormControl.
     * @return {AbstractControl}
     */
    public get password (): AbstractControl { return this.signupForm.get('password'); }

    /**
     * Getter for the role FormControl.
     * @return {AbstractControl}
     */
    public get role (): AbstractControl { return this.signupForm.get('role'); }
}
