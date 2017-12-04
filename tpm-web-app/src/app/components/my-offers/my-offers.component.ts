import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
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

    constructor() { }

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
    }

    public addRentingOffer(): void {
        this.rentingModalTitle = 'Nouvelle offre de location';
        $(this.rentingModal.nativeElement).modal('show');
    }

    public addRideOffer(): void {
        this.rideModalTitle = 'Nouvelle offre de trajet';
        $(this.rideModal.nativeElement).modal('show');
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
