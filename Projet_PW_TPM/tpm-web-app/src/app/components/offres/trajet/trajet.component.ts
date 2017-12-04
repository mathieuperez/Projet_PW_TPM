import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import { TrajetService } from '../../../services/trajet-service' ;
import { User } from '../../../models/users';
@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrajetComponent implements OnInit {
   public trajets:any;
  currentUser: User;
  loading = false;
  constructor(private trajetService:TrajetService ,private http: HttpClient) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);

      this.trajetService.getUserTrajets(this.currentUser.login).subscribe(trajets =>  {
        this.trajets = trajets;
        console.log(this.currentUser.login);
         });;

  }


}
