import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})

export class OffersComponent implements OnInit {
    private map: any;
    private mapProperties: any;
    private markerMap: any;

    private url: string;

    private pageTitle: string;

    private res: string[];

    private tableHeadContent = {
        'tripTable': [
            'Pays', 'Adresse de location', 'Tarif', 'Date aller', 'Date retour', 'Lieu aller', 'Lieu retour', 'Durée', 'Description'
        ],
        'rentingTable' : [
            'Pays', 'Ville', 'Adresse', 'Tarif', 'Date début', 'Durée', 'Surface', 'Description'
        ],
        'rideTable' : [
            'Départ', 'Destination', 'Lieu de départ', 'Lieu de destination', 'Tarif', 'Places restantes', 'Date'
        ]
    };

    constructor(private router: Router) {
    }

    ngOnInit() {
        let url = this.router.url.split('/');
        this.url = url[url.length - 1];
        this.changeContent(this.url);

        const myClass = this; // save instance of our main class to use functions in handlers

        this.router.events.subscribe((event) => {
            if (event['url']) {
                url = event['url'].split('/');
                myClass.url = url[url.length - 1];
                myClass.changeContent(myClass.url);
            }
        });

        this.mapProperties = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("googleMap"), this.mapProperties);

        this.addMarkerToMap(this.mapProperties.center, this.map);
        this.markerMap.setVisible(false);

        this.map.addListener('click', function(e) {
            myClass.removeMarker();
            myClass.addMarkerToMap(e.latLng, myClass.map);
        });
    }

    public removeMarker(): void {
        this.markerMap.setMap(null);
    }

    public addMarkerToMap(position: any, map: any): void {
        this.markerMap = new google.maps.Marker({
            position: position,
            map: map,
            draggable: true,
            title: 'Destination'
        });

        this.markerMap.setMap(map);
    }

    public changeContent(route: string): void {
        switch (route) {
            case 'trip':
                this.res = this.tableHeadContent['tripTable'];
                this.pageTitle = 'Rechercher un voyage';
            break;

            case 'ride':
                this.res = this.tableHeadContent['rideTable'];
                this.pageTitle = 'Rechercher un trajet';
            break;

            case 'renting':
                this.res = this.tableHeadContent['rentingTable'];
                this.pageTitle = 'Rechercher une location';
            break;
        }
    }

}
