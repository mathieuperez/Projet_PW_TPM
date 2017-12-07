import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

declare const $: any;

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
    private signupSubmitted: boolean;

    /**
     * If true error for run again the login.
     */
    private signupError: boolean;
    private signupLoading: boolean;

    private modalBody: string;

    @ViewChild('signupModal')
    private signupModal: ElementRef;

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
        this.signupSubmitted = false;
        this.signupLoading = false;
        this.signupError = false;
        this.signupForm = new FormGroup({
            email: new FormControl('', [ Validators.required ]),
            login: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ]),
            role: new FormControl(null, [ Validators.required ])
        });

        $(this.signupModal.nativeElement).on('hidden.bs.modal', () => {
            this.router.navigate(['/login']);
        });
    }

    public submitSignupForm(): void {
        this.signupSubmitted = true;

        if (this.signupForm.valid && !this.signupLoading) {
            this.signupLoading = true;
            $(this.signupModal.nativeElement).modal('show');
            this.httpClient.post('/api/users',
                this.signupForm.value, {
                    responseType: 'json'
                }
            ).subscribe( (response: any) => {
                this.signupLoading = false;
                if (response['success'] === true) {
                    this.modalBody = "Vous êtes bien inscrit à l'application.";
                    this.signupForm.reset();
                }
                else {
                    this.modalBody = "Une erreur est survenue lors de votre inscription à l'application.";
                    this.signupForm.reset();
                }
            });
        }
    }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get email (): AbstractControl { return this.signupForm.get('email'); }

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
