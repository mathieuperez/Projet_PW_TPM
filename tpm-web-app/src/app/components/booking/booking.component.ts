import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

    public tableHead = {
        'tripTable': [
            'Adresse', 'Ville', 'Pays', 'Tarif', 'Date aller', 'Date retour', 'Lieu aller',
            'Lieu retour', ''
        ],
        'rentingTable' : [
            'Pays', 'Ville', 'Adresse', 'Tarif', 'Date début', 'Durée', 'Surface', ''
        ],
        'rideTable' : [
            'Départ', 'Arrivée', 'Début le', 'Arrivée le', 'Heure', 'Heure', 'Transport', 'Tarif', ''
        ]
    };
    public tripTableContent = [];
    public rideTableContent = [];
    public rentingTableContent = [];

    constructor() { }

    ngOnInit() {

    }

    public getTripsBooked(): void {

    }

    public getRentingsBooked(): void {

    }

    public getRidesBooked(): void {

    }

}
