import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app-constants';

declare const $: any;

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
    private tripTable = [
        'Adresse de location', 'Pays', 'Tarif', 'Date aller', 'Date retour', 'Lieu aller', 'Lieu retour', 'Durée', 'Description'
    ];

    private tripTableContent;

    private areThereTrips: boolean;

    private isModifyingTrip: boolean;

    private tripForm: FormGroup;
    private tripSubmitted: boolean;
    private tripError: boolean;
    private tripLoading: boolean;

    private tripModalTitle: string;

    @ViewChild('tripModal')
    private tripModal: ElementRef;

    private selectedRowTrips;

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.areThereTrips = false;
        this.isModifyingTrip = false;

        this.tripSubmitted = false;
        this.tripLoading = false;
        this.tripError = false;
        this.tripForm = new FormGroup({
            address: new FormControl('', [ Validators.required ]),
            country: new FormControl('', [ Validators.required ]),
            price: new FormControl('', [ Validators.required ]),
            startDate: new FormControl('', [ Validators.required ]),
            arrivalDate: new FormControl('', [ Validators.required ]),
            start: new FormControl('', [ Validators.required ]),
            arrival: new FormControl('', [ Validators.required ]),
            last: new FormControl('', [ Validators.required ]),
            description: new FormControl('')
        });

        $(this.tripModal.nativeElement).on('hidden.bs.modal', () => {
            this.isModifyingTrip = false;
            this.tripForm.reset();
        });

        this.getTripList();
    }

    public newTripClick(): void {
        this.tripModalTitle = 'Nouvelle offre de voyage';
        $(this.tripModal.nativeElement).modal('show');
    }

    public modifyTripClick(): void {
        if (this.selectedRowTrips) {
            this.tripModalTitle = 'Modifier l\'offre de voyage';
            this.tripForm.setValue({
                address: this.selectedRowTrips.address,
                country: this.selectedRowTrips.country,
                price: this.selectedRowTrips.price,
                startDate: this.selectedRowTrips.startDate,
                arrivalDate: this.selectedRowTrips.arrivalDate,
                start: this.selectedRowTrips.start,
                arrival: this.selectedRowTrips.arrival,
                last: this.selectedRowTrips.last,
                description: this.selectedRowTrips.description
            });
            $(this.tripModal.nativeElement).modal('show');
            this.isModifyingTrip = true;
        }
    }

    public addTripOffer(): void {
        if (this.isModifyingTrip) {
            this.modifyTripOffer();
        } else {

        }
    }

    public modifyTripOffer(): void {

    }

    public deleteTripOffer(): void {

    }

    public getTripList(): void {
        this.httpClient.get(`/api/trips/${localStorage.getItem(AppConstants.LOGIN_USER)}`).subscribe((response: any) => {
            if (response.length > 0) {
                this.tripTableContent = response;
                this.areThereTrips = true;
            }
        },
        (error: any) => {
            alert('Une erreur est survenue lors de la récupération de la liste de vos agences.');
        });
    }

    public onSelectTrip(selectedItem: any): void {
        this.selectedRowTrips = selectedItem;
    }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get address (): AbstractControl { return this.tripForm.get('address'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get country (): AbstractControl { return this.tripForm.get('country'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get price (): AbstractControl { return this.tripForm.get('price'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get startDate (): AbstractControl { return this.tripForm.get('startDate'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get arrivalDate (): AbstractControl { return this.tripForm.get('arrivalDate'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get start (): AbstractControl { return this.tripForm.get('start'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get arrival (): AbstractControl { return this.tripForm.get('arrival'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get last (): AbstractControl { return this.tripForm.get('last'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get description (): AbstractControl { return this.tripForm.get('description'); }
}
