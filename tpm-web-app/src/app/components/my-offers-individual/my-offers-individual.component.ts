import { AppConstants } from './../../app-constants';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Button } from 'selenium-webdriver';

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
            'Ville de départ', 'Ville de destination', 'Lieu de départ', 'Lieu de destination', 'Date de départ',
            'Date d\'arrivée, Heure de départ', 'Heure d\'arrivée', 'Transport', 'Tarif', 'Places restantes'
        ]
    };

    private tableContent = {
        'rentingTable' : [],
        'rideTable' : []
    };

    private areThereRentings: boolean;
    private areThereRides: boolean;

    private isModifyingRenting: boolean;
    private isModifyingRide: boolean;

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
    @ViewChild('deleteRentingModal')
    private deleteRentingModal: ElementRef;
    @ViewChild('deleteRideModal')
    private deleteRideModal: ElementRef;

    private selectedRowRentings;
    private selectedRowRides;
    private selectedRowRentingsIndex;
    private selectedRowRidesIndex;

    public constructor(private router: Router,
                    private httpClient: HttpClient) { }

    ngOnInit() {
        this.areThereRentings = false;
        this.areThereRides = false;
        this.isModifyingRenting = false;
        this.isModifyingRide = false;

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
            rideStartDate: new FormControl('', [ Validators.required ]),
            rideArrivalDate: new FormControl('', [ Validators.required ]),
            rideStartTime: new FormControl('', [ Validators.required ]),
            rideArrivalTime: new FormControl('', [ Validators.required ]),
            rideConveyance: new FormControl('', [ Validators.required ]),
            ridePrice: new FormControl('', [ Validators.required ]),
            rideSeat: new FormControl('', [ Validators.required ])
        });

        $(this.rentingModal.nativeElement).on('hidden.bs.modal', () => {
            this.isModifyingRenting = false;
            this.rentingForm.reset();
        });

        $(this.rideModal.nativeElement).on('hidden.bs.modal', () => {
            this.isModifyingRide = false;
            this.rideForm.reset();
        });

        this.getRentingList();
        this.getRideList();
    }

    public newRentingClick(): void {
        this.rentingModalTitle = 'Nouvelle offre de location';
        $(this.rentingModal.nativeElement).modal('show');
    }

    public newRideClick(): void {
        this.rideModalTitle = 'Nouvelle offre de trajet';
        $(this.rideModal.nativeElement).modal('show');
    }

    public modifyRentingClick(): void {
        if (this.selectedRowRentings) {
            this.rentingModalTitle = 'Modifier l\'offre de location';
            this.rentingForm.setValue({
                country: this.selectedRowRentings.country,
                city: this.selectedRowRentings.city,
                price: this.selectedRowRentings.price,
                address: this.selectedRowRentings.address,
                startDate: this.selectedRowRentings.startDate.toISOString().split('T')[0],
                time: this.selectedRowRentings.time,
                surface: this.selectedRowRentings.surface,
                description: this.selectedRowRentings.description
            });
            $(this.rentingModal.nativeElement).modal('show');
            this.isModifyingRenting = true;
        }
    }

    public modifyRideClick(): void {
        if (this.selectedRowRides) {
            this.rideModalTitle = 'Modifier l\'offre de trajet';
            this.rideForm.setValue({
                rideStartCity: this.selectedRowRides.rideStartCity,
                rideArrivalCity: this.selectedRowRides.rideArrivalCity,
                rideStart: this.selectedRowRides.rideStart,
                rideArrival: this.selectedRowRides.rideArrival,
                rideStartTime: this.selectedRowRides.rideStartTime,
                rideArrivalTime: this.selectedRowRides.rideArrivalTime,
                rideConveyance: this.selectedRowRides.rideConveyance,
                ridePrice: this.selectedRowRides.ridePrice,
                rideSeat: this.selectedRowRides.rideSeat,
                rideStartDate: this.selectedRowRides.rideStartDate.toISOString().split('T')[0],
                rideArrivalDate: this.selectedRowRides.rideArrivalDate.toISOString().split('T')[0]
            });
            $(this.rideModal.nativeElement).modal('show');
            this.isModifyingRide = true;
        }
    }

    public deleteRentingClick(): void {
        if (this.selectedRowRentings) {
            $(this.deleteRentingModal.nativeElement).modal('show');
        }
    }

    public deleteRideClick(): void {
        if (this.selectedRowRides) {
            $(this.deleteRideModal.nativeElement).modal('show');
        }
    }

    public addRentingOffer(): void {
        if (this.isModifyingRenting) {
            this.modifyRentingOffer();
        } else {
            this.rentingSubmitted = true;

            if (this.rentingForm.valid && !this.rentingLoading) {
                this.rentingLoading = true;
                this.httpClient.post(
        `/api/rentings/${localStorage.getItem(AppConstants.LOGIN_USER)}/${this.tableContent.rideTable[this.selectedRowRidesIndex]._id}`,
                    this.rentingForm.value, {
                        responseType: 'json',
                        headers: new HttpHeaders(
                            { 'Content-Type': 'application/json',
                              'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
                        )
                    }
                ).subscribe( (response: any) => {
                    this.rentingLoading = false;
                    if (response['success'] === true) {
                        this.rentingLoading = false;
                        alert('Votre offre de location a bien été ajoutée.');
                        this.rentingForm.reset();
                        this.getRentingList();
                        $(this.rentingModal.nativeElement).modal('hide');
                    } else {
                        alert('Une erreur est survenue lors de la création de votre offre de location.');
                    }
                });
            }
        }
    }

    public addRideOffer(): void {
        if (this.isModifyingRide) {
            this.modifyRideOffer();
        } else {
            this.rideSubmitted = true;

            if (this.rideForm.valid && !this.rideLoading) {
                this.rideLoading = true;
                this.httpClient.post(
            `/api/rides/${localStorage.getItem(AppConstants.LOGIN_USER)}/${this.tableContent.rideTable[this.selectedRowRidesIndex]._id}`,
                    this.rideForm.value, {
                        responseType: 'json',
                        headers: new HttpHeaders(
                            { 'Content-Type': 'application/json',
                              'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
                        )
                    }
                ).subscribe( (response: any) => {
                    this.rideLoading = false;
                    if (response['success'] === true) {
                        this.rideLoading = false;
                        alert('Votre offre de trajet a bien été ajoutée.');
                        this.rideForm.reset();
                        this.getRideList();
                        $(this.rideModal.nativeElement).modal('hide');
                    } else {
                        alert('Une erreur est survenue lors de la création de votre offre de trajet.');
                    }
                });
            }
        }
    }

    public modifyRentingOffer(): void {
        this.rentingSubmitted = true;

        if (this.rentingForm.valid && !this.rentingLoading) {
            this.rentingLoading = true;
            this.httpClient.patch(
    `/api/rentings/${localStorage.getItem(AppConstants.LOGIN_USER)}/${this.tableContent.rentingTable[this.selectedRowRentingsIndex]._id}`,
                this.rentingForm.value, {
                    responseType: 'json'
                }
            ).subscribe( (response: any) => {
                this.rentingLoading = false;
                if (response['success'] === true) {
                    this.rentingLoading = false;
                    alert('Votre offre de location a bien été modifiée.');
                    this.rentingForm.reset();
                    this.getRentingList();
                    $(this.rentingModal.nativeElement).modal('hide');
                } else {
                    alert('Une erreur est survenue lors de la modification de votre offre de location.');
                }
            });
        }
    }

    public modifyRideOffer(): void {
        this.rideSubmitted = true;

        if (this.rideForm.valid && !this.rideLoading) {
            this.rideLoading = true;
            this.httpClient.patch(
            `/api/rides/${localStorage.getItem(AppConstants.LOGIN_USER)}/${this.tableContent.rideTable[this.selectedRowRidesIndex]._id}`,
                this.rideForm.value, {
                    responseType: 'json',
                    headers: new HttpHeaders(
                        { 'Content-Type': 'application/json',
                          'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
                    )
                }
            ).subscribe( (response: any) => {
                this.rideLoading = false;
                if (response['success'] === true) {
                    this.rideLoading = false;
                    alert('Votre offre de trajet a bien été modifiée.');
                    this.rideForm.reset();
                    this.getRideList();
                    $(this.rideModal.nativeElement).modal('hide');
                } else {
                    alert('Une erreur est survenue lors de la modification de votre offre de trajet.');
                }
            });
        }
    }

    public deleteRenting(): void {
        if (this.selectedRowRentings) {
            this.httpClient.delete(`/api/rentings/${localStorage.getItem(AppConstants.LOGIN_USER)}/
                                    ${this.tableContent.rentingTable[this.selectedRowRentingsIndex]._id}`, {
                                        headers: new HttpHeaders(
                                            { 'Content-Type': 'application/json',
                                              'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
                                        )
                                    }
            ).subscribe( (response: any) => {
                if (response['success'] === true) {
                    alert('Votre offre de location a bien été supprimée.');
                    this.getRideList();
                } else {
                    alert('Une erreur est survenue lors de la modification de votre offre de location.');
                }
                $(this.deleteRentingModal.nativeElement).modal('hide');
            });
        }
    }

    public deleteRide(): void {
        if (this.selectedRowRides) {
            this.httpClient.delete(`/api/rides/${localStorage.getItem(AppConstants.LOGIN_USER)}/
                                ${this.tableContent.rideTable[this.selectedRowRidesIndex]._id}`, {
                                    headers: new HttpHeaders(
                                        { 'Content-Type': 'application/json',
                                          'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
                                    )
                                }
            ).subscribe( (response: any) => {
                if (response['success'] === true) {
                    alert('Votre offre de trajet a bien été supprimée.');
                    this.getRideList();
                } else {
                    alert('Une erreur est survenue lors de la modification de votre offre de trajet.');
                }
                $(this.deleteRideModal.nativeElement).modal('hide');
            });
        }
    }

    public getRentingList(): void {
        this.httpClient.get(`/api/rentings/${localStorage.getItem(AppConstants.LOGIN_USER)}`, {
            headers: new HttpHeaders(
                { 'Content-Type': 'application/json',
                  'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
            )}
        ).subscribe((response: any) => {
            if (response.length > 0) {
                response.forEach(element => {
                    element.startDate = new Date(element.startDate);
                });
                this.tableContent.rentingTable = response;
                this.areThereRentings = true;
            }
        },
        (error: any) => {
            alert('Une erreur est survenue lors de la récupération de la liste de vos locations.');
        });
    }

    public getRideList(): void {
        this.httpClient.get(`/api/rides/${localStorage.getItem(AppConstants.LOGIN_USER)}`, {
            headers: new HttpHeaders(
                { 'Content-Type': 'application/json',
                  'access-token':  localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)}
            )}
        ).subscribe((response: any) => {
            if (response.length > 0) {
                response.forEach(element => {
                    element.rideStartDate = new Date(element.rideStartDate);
                    element.rideArrivalDate = new Date(element.rideArrivalDate);
                });
                this.tableContent.rideTable = response;
                this.areThereRides = true;
            }
        },
        (error: any) => {
            alert('Une erreur est survenue lors de la récupération de la liste de vos trajets.');
        });
    }

    public onSelectRenting(selectedItem: any, index: number) {
        this.selectedRowRentings = selectedItem;
        this.selectedRowRentingsIndex = index;
    }

    public onSelectRide(selectedItem: any, index: number) {
        this.selectedRowRides = selectedItem;
        this.selectedRowRidesIndex = index;
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
    public get rideStartTime (): AbstractControl { return this.rideForm.get('rideStartTime'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get rideArrivalTime (): AbstractControl { return this.rideForm.get('rideArrivalTime'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get rideConveyance (): AbstractControl { return this.rideForm.get('rideConveyance'); }

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
    public get rideStartDate (): AbstractControl { return this.rideForm.get('rideStartDate'); }

    /**
     * Getter for the login FormControl.
     * @return {AbstractControl}
     */
    public get rideArrivalDate (): AbstractControl { return this.rideForm.get('rideArrivalDate'); }
}
