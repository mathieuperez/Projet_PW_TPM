import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
selector: 'app-ride',
templateUrl: './ride.component.html',
styleUrls: ['./ride.component.css']
})

export class RideComponent implements OnInit {
    private map: any;
    private mapProperties: any;
    private markerMap: any;

    constructor() {
    }

    ngOnInit() {
        this.mapProperties = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("googleMap"), this.mapProperties);

        this.addMarkerToMap(this.mapProperties.center, this.map);
        this.markerMap.setVisible(false);

        const myClass = this; // save instance of our main class to use functions in handlers

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

}
