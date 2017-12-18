import { AppConstants } from './../../app-constants';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare const google: any;
declare const $: any;

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})

export class OffersComponent implements OnInit {
    private map: any;
    private mapProperties: any;
    private markerMap: any;
    private geocoder: any;

    public url: string;

    private pageTitle: string;

    public noResults: boolean;

    public tableHead: string[];
    public tableContent: Array<{[x: string]: string}>;
    public tableContentCopy: Array<{[x: string]: string}>;

    private tableHeadContent = {
        'tripTable': [
            'Pays', 'Ville', 'Adresse', 'Tarif', 'Date aller', 'Date retour', 'Lieu aller',
            'Lieu retour', 'Durée', 'Description', ''
        ],
        'rentingTable' : [
            'Pays', 'Ville', 'Adresse', 'Tarif', 'Date début', 'Durée', 'Surface', 'Description', ''
        ],
        'rideTable' : [
            'Départ', 'Arrivée', 'Lieu de départ', 'Lieu de destination', 'Début le',
            'Arrivée le', 'Heure', 'Heure', 'Transport', 'Tarif', 'Places restantes', ''
        ]
    };

    constructor(private router: Router, private httpClient: HttpClient, private ngzone: NgZone) {
    }

    ngOnInit() {
        const url = this.router.url.split('/');
        this.url = url[url.length - 1];
        this.changeContent(this.url);

        this.tableContentCopy = new Array<{[x: string]: string}>();
        this.tableContent = new Array<{[x: string]: string}>();

        this.noResults = false;

        this.mapProperties = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById("googleMap"), this.mapProperties);
        this.geocoder = new google.maps.Geocoder();

        this.addMarkerToMap(this.mapProperties.center, this.map);
        this.markerMap.setVisible(false);

        this.map.addListener('click', (e) => {
            this.removeMarker();
            this.addMarkerToMap(e.latLng, this.map);
            this.updateTable(e.latLng);
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
        this.markerMap.setVisible(true);

        this.markerMap.setMap(map);
    }

    public resetAll(formvalue: any): void {
        formvalue.reset();
        this.noResults = false;
        this.markerMap.setMap(null);
        this.tableContent = this.tableContentCopy;
    }

    public updateTable(position: any) {
        let city;
        let country;
        const table = new Array<{[x: string]: string}>();
        this.geocoder.geocode({'latLng': position}, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    for (let i = 0; i < results[0].address_components.length; i++) {
                        for (let b = 0; b < results[0].address_components[i].types.length; b++) {
                            if (results[0].address_components[i].types[b] === 'locality') {
                                city = results[0].address_components[i];
                            } else if (results[0].address_components[i].types[b] === 'country') {
                                country = results[0].address_components[i];
                            }
                        }
                    }

                    if (city && country) {
                        if (this.tableContentCopy) {
                            this.tableContentCopy.forEach(element => {
                                if (element.country === country.long_name && element.city === city.long_name) {
                                    table.push(element);
                                }
                            });
                            this.tableContent = table;
                            this.noResults = false;
                        }
                    } else {
                        this.noResults = true;
                    }
                } else {
                    this.noResults = true;
                }
            } else {
                this.noResults = true;
            }
        });
    }

    public searchByDate(datevalue: any): void {
        const date = new Date(datevalue);
        const table = new Array<{[x: string]: string}>();
        let startDate;
        let endDate;
        this.tableContent.forEach(element => {
            if (this.url === 'ride') {
                startDate = new Date(element.rideStartDate);
                endDate = new Date(element.rideArrivalDate);
            } else if (this.url === 'renting') {
                startDate = new Date(element.startDate);
                endDate = new Date(startDate.getTime() + (1000 * 60 * 60 * 24 * parseInt(element.time, 10)));
                console.log(endDate);
            } else {
                startDate = new Date(element.startDate);
                endDate = new Date(element.endDate);
            }
            if (date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()) {
                table.push(element);
            }
        });
        this.tableContent = table;
    }

    public getTrips(): void {
        this.httpClient.get('/api/trips/').subscribe((response: any) => {
            if (response.success === true) {
                if (response.trips.length > 0) {
                    response.trips.forEach(element => {
                        element.startDate = new Date(element.startDate);
                        element.endDate = new Date(element.endDate);
                    });
                    this.tableContent = response.trips;
                    this.tableContentCopy = this.tableContent;
                }
            }
        },
        (error: any) => {
            alert('Une erreur est survenue lors de la récupération de la liste de vos locations.');
        });
    }

    public getRentings(): void {
        this.httpClient.get('/api/rentings/').subscribe((response: any) => {
            if (response.success === true) {
                if (response.rentings.length > 0) {
                    response.rentings.forEach(element => {
                        element.startDate = new Date(element.startDate);
                    });
                    this.tableContent = response.rentings;
                    this.tableContentCopy = this.tableContent;
                }
            }
        },
        (error: any) => {
            alert('Une erreur est survenue lors de la récupération de la liste de vos locations.');
        });
    }

    public getRides(): void {
        this.httpClient.get('/api/rides/').subscribe((response: any) => {
            if (response.length > 0) {
                response.forEach(element => {
                    element.rideDate = new Date(element.rideDate);
                });
                this.tableContent = response;
                this.tableContentCopy = this.tableContent;
            }
        },
        (error: any) => {
            alert('Une erreur est survenue lors de la récupération de la liste de vos locations.');
        });
    }

    public changeContent(route: string): void {
        switch (route) {
            case 'trip':
                this.tableHead = this.tableHeadContent['tripTable'];
                this.getTrips();
                this.pageTitle = 'Rechercher un voyage';
            break;

            case 'ride':
                this.tableHead = this.tableHeadContent['rideTable'];
                this.getRides();
                this.pageTitle = 'Rechercher un trajet';
            break;

            case 'renting':
                this.tableHead = this.tableHeadContent['rentingTable'];
                this.getRentings();
                this.pageTitle = 'Rechercher une location';
            break;
        }
    }

    public canBook(): boolean {
        return ((localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME) !== 'access_cookie')
                && (localStorage.getItem(AppConstants.ROLE_USER) === 'Utilisateur'));
    }
}
