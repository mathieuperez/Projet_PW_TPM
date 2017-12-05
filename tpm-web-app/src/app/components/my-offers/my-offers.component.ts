import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';

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

    private areThereTrips: boolean;

    private tripForm: FormGroup;
    private tripSubmitted: boolean;
    private tripError: boolean;
    private tripLoading: boolean;

    private tripModalTitle: string;

    @ViewChild('tripModal')
    private tripModal: ElementRef;

    constructor() { }

    ngOnInit() {
        this.areThereTrips = false;

        this.tripSubmitted = false;
        this.tripLoading = false;
        this.tripError = false;
        this.tripForm = new FormGroup({

        });

        $(this.tripModal.nativeElement).on('hidden.bs.modal', () => {
            this.tripForm.reset();
        });

        //TODO : get trips from api
    }

    public addTripOffer(): void {
        this.tripModalTitle = 'Nouvelle offre de voyage';
        $(this.tripModal.nativeElement).modal('show');
    }

    public modifyTripOffer(): void {
        this.tripModalTitle = 'Modifier l\'offre de voyage';
        $(this.tripModal.nativeElement).modal('show');
    }
}
