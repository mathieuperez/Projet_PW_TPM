import { AppConstants } from './../../app-constants';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

declare const $: any;

@Component({
  selector: 'app-my-offers-individual',
  templateUrl: './my-offers-individual.component.html',
  styleUrls: ['./my-offers-individual.component.css']
})

export class MyOffersIndividualComponent implements OnInit {
    private tableHeadContent = {
        'rentingTable' : [
            'Pays', 'Ville', 'Adresse', 'Tarif', 'Date début', 'Durée', 'Surface', 'Description'
        ],
        'rideTable' : [
            'Ville de départ', 'Ville de destination', 'Lieu de départ', 'Lieu de destination', 'Tarif', 'Places restantes', 'Date'
        ]
    };

    private tableContent = {
        'rentingTable' : [],
        'rideTable' : []
    };

    private areThereRentings: boolean;
    private areThereRides: boolean;

    private rentingForm: FormGroup;
    private rentingSubmitted: boolean;
    private rentingError: boolean;
    private rentingLoading: boolean;

    private rideForm: FormGroup;
    private rideSubmitted: boolean;
    private rideError: boolean;
    private rideLoading: boolean;

    private rentingModalTitle: string;
    private rideModalTitle: string;

    @ViewChild('rentingModal')
    private rentingModal: ElementRef;
    @ViewChild('rideModal')
    private rideModal: ElementRef;

    public constructor(private router: Router,
                    private httpClient: HttpClient) { }

    ngOnInit() {
        this.areThereRentings = false;
        this.areThereRides = false;

        this.rentingSubmitted = false;
        this.rentingLoading = false;
        this.rentingError = false;
        this.rentingForm = new FormGroup({
            country: new FormControl('', [ Validators.required ]),
            city: new FormControl('', [ Validators.required ]),
            price: new FormControl('', [ Validators.required ]),
            address: new FormControl('', [ Validators.required ]),
            startDate: new FormControl('', [ Validators.required ]),
            time: new FormControl('', [ Validators.required ]),
            surface: new FormControl('', [ Validators.required ]),
            description: new FormControl('', [ Validators.required ])
        });

        this.rideSubmitted = false;
        this.rideLoading = false;
        this.rideError = false;
        this.rideForm = new FormGroup({
            rideStartCity: new FormControl('', [ Validators.required ]),
            rideArrivalCity: new FormControl('', [ Validators.required ]),
            rideStart: new FormControl('', [ Validators.required ]),
            rideArrival: new FormControl('', [ Validators.required ]),
            ridePrice: new FormControl('', [ Validators.required ]),
            rideSeat: new FormControl('', [ Validators.required ]),
            rideDate: new FormControl('', [ Validators.required ])
        });

        $(this.rentingModal.nativeElement).on('hidden.bs.modal', () => {
            this.rentingForm.reset();
        });

        $(this.rideModal.nativeElement).on('hidden.bs.modal', () => {
            this.rideForm.reset();
        });

        this.getRentingList();
        this.getRideList();
    }

    public addRentingOffer(): void {
        this.rentingModalTitle = 'Nouvelle offre de location';
        $(this.rentingModal.nativeElement).modal('show');
    }

    public addRideOffer(): void {
        this.rideModalTitle = 'Nouvelle offre de trajet';
        $(this.rideModal.nativeElement).modal('show');
    }

    public modifyRentingOffer(): void {
        this.rentingModalTitle = 'Modifier l\'offre de location';
        $(this.rentingModal.nativeElement).modal('show');
    }

    public modifyRideOffer(): void {
        this.rideModalTitle = 'Modifier l\'offre de trajet';
        $(this.rideModal.nativeElement).modal('show');
    }

    public getRentingList(): void {
        const params = new HttpParams();
        params.append('login', localStorage.getItem(AppConstants.LOGIN_USER));
        params.append('token', localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME));
        /*this.httpClient.get('/api/offers/rentings', {params: params}).subscribe((response: any) => {
            if (response['success'] === true) {

            }
        },
        (error: any) => {

        });*/
    }

    public getRideList(): void {
        const params = new HttpParams();
        params.append('login', localStorage.getItem(AppConstants.LOGIN_USER));
        params.append('token', localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME));
        /*this.httpClient.get('/api/offers/rides', {params: params}).subscribe((response: any) => {
            if (response['success'] === true) {

            }
        },
        (error: any) => {

        });*/
    }


    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get country (): AbstractControl { return this.rentingForm.get('country'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get city (): AbstractControl { return this.rentingForm.get('city'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get price (): AbstractControl { return this.rentingForm.get('price'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get address (): AbstractControl { return this.rentingForm.get('address'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get startDate (): AbstractControl { return this.rentingForm.get('startDate'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get time (): AbstractControl { return this.rentingForm.get('time'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get surface (): AbstractControl { return this.rentingForm.get('surface'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get description (): AbstractControl { return this.rentingForm.get('description'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get rideStartCity (): AbstractControl { return this.rideForm.get('rideStartCity'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get rideArrivalCity (): AbstractControl { return this.rideForm.get('rideArrivalCity'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get rideStart (): AbstractControl { return this.rideForm.get('rideStart'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get rideArrival (): AbstractControl { return this.rideForm.get('rideArrival'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get ridePrice (): AbstractControl { return this.rideForm.get('ridePrice'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get rideSeat (): AbstractControl { return this.rideForm.get('rideSeat'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get rideDate (): AbstractControl { return this.rideForm.get('rideDate'); }
}
