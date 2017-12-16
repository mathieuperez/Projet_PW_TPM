import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../../app-constants';

declare const $: any;

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
    private tripTable = [
        'Adresse de location', 'Ville', 'Pays', 'Tarif', 'Date aller', 'Date retour', 'Lieu aller', 'Lieu retour', 'Durée', 'Description'
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
    @ViewChild('deleteTripModal')
    private deleteTripModal: ElementRef;

    private selectedRowTrips;
    private selectedRowTripsIndex;

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.areThereTrips = false;
        this.isModifyingTrip = false;

        this.tripSubmitted = false;
        this.tripLoading = false;
        this.tripError = false;
        this.tripForm = new FormGroup({
            address: new FormControl('', [ Validators.required ]),
            city: new FormControl('', [ Validators.required ]),
            country: new FormControl('', [ Validators.required ]),
            price: new FormControl('', [ Validators.required ]),
            startDate: new FormControl('', [ Validators.required ]),
            endDate: new FormControl('', [ Validators.required ]),
            startArea: new FormControl('', [ Validators.required ]),
            arrivalArea: new FormControl('', [ Validators.required ]),
            time: new FormControl('', [ Validators.required ]),
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
                city: this.selectedRowTrips.city,
                country: this.selectedRowTrips.country,
                price: this.selectedRowTrips.price,
                startDate: this.selectedRowTrips.startDate,
                endDate: this.selectedRowTrips.endDate,
                startArea: this.selectedRowTrips.startArea,
                arrivalArea: this.selectedRowTrips.arrivalArea,
                time: this.selectedRowTrips.time,
                description: this.selectedRowTrips.description
            });
            $(this.tripModal.nativeElement).modal('show');
            this.isModifyingTrip = true;
        }
    }

    public deleteTripClick(): void {
        if (this.selectedRowTrips) {
            $(this.deleteTripModal.nativeElement).modal('show');
        }
    }

    public addTripOffer(): void {
        if (this.isModifyingTrip) {
            this.modifyTripOffer();
        } else {
            this.tripSubmitted = true;

            if (this.tripForm.valid && !this.tripLoading) {
                this.tripLoading = true;
                this.httpClient.post(`/api/trips/${localStorage.getItem(AppConstants.LOGIN_USER)}`,
                    this.tripForm.value, {
                        responseType: 'json',
                        headers: new HttpHeaders(
                            { 'Content-Type': 'application/json',
                              'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
                        )
                    }
                ).subscribe( (response: any) => {
                    this.tripLoading = false;
                    if (response['success'] === true) {
                        this.tripLoading = false;
                        alert('Votre offre de voyage a bien été ajoutée.');
                        this.tripForm.reset();
                        this.getTripList();
                        $(this.tripModal.nativeElement).modal('hide');
                    } else {
                        alert('Une erreur est survenue lors de la création de votre offre de voyage.');
                    }
                });
            }
        }
    }

    public modifyTripOffer(): void {
        this.tripSubmitted = true;

        if (this.tripForm.valid && !this.tripLoading) {
            this.tripLoading = true;
            this.httpClient.patch(
                `/api/trips/${localStorage.getItem(AppConstants.LOGIN_USER)}/${this.tripTableContent[this.selectedRowTripsIndex]._id}`,
                this.tripForm.value, {
                    responseType: 'json',
                    headers: new HttpHeaders(
                        { 'Content-Type': 'application/json',
                          'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
                    )
                }
            ).subscribe( (response: any) => {
                this.tripLoading = false;
                if (response['success'] === true) {
                    this.tripLoading = false;
                    alert('Votre offre de voyage a bien été modifiée.');
                    this.tripForm.reset();
                    this.getTripList();
                    $(this.tripModal.nativeElement).modal('hide');
                } else {
                    alert('Une erreur est survenue lors de la modification de votre offre de voyage.');
                }
            });
        }
    }

    public deleteTripOffer(): void {
        if (this.selectedRowTrips) {
            this.httpClient.delete(
                `/api/trips/${localStorage.getItem(AppConstants.LOGIN_USER)}/${this.tripTableContent[this.selectedRowTripsIndex]._id}`,
                {
                    headers: new HttpHeaders(
                        {
                            'Content-Type': 'application/json',
                            'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)
                        }
                    )
                }
            ).subscribe( (response: any) => {
                if (response['success'] === true) {
                    alert('Votre offre de voyage a bien été supprimée.');
                    this.getTripList();
                } else {
                    alert('Une erreur est survenue lors de la modification de votre offre de voyage.');
                }
                $(this.deleteTripModal.nativeElement).modal('hide');
            });
        }
    }

    public getTripList(): void {
        this.httpClient.get(`/api/trips/${localStorage.getItem(AppConstants.LOGIN_USER)}`, {
            headers: new HttpHeaders(
                { 'Content-Type': 'application/json',
                  'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
            )}
        ).subscribe((response: any) => {
            if (response.length > 0) {
                response.forEach(element => {
                    element.startDate = new Date(element.startDate);
                    element.endDate = new Date(element.endDate);
                });
                this.tripTableContent = response;
                this.areThereTrips = true;
            }
        },
        (error: any) => {
            alert('Une erreur est survenue lors de la récupération de la liste de vos agences.');
        });
    }

    public onSelectTrip(selectedItem: any, index: number): void {
        this.selectedRowTrips = selectedItem;
        this.selectedRowTripsIndex = index;
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
    public get city (): AbstractControl { return this.tripForm.get('city'); }

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
    public get endDate (): AbstractControl { return this.tripForm.get('endDate'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get startArea (): AbstractControl { return this.tripForm.get('startArea'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get arrivalArea (): AbstractControl { return this.tripForm.get('arrivalArea'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get time (): AbstractControl { return this.tripForm.get('time'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get description (): AbstractControl { return this.tripForm.get('description'); }
}
