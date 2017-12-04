import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TrajetService } from '../../../services/trajet-service'
import { User } from '../../../models/users';

@Component({
  selector: 'app-trajet-create',
  templateUrl: './trajet-create.component.html',
  styleUrls: ['./trajet-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrajetCreateComponent implements OnInit {
  trajet: any = {};
  currentUser: User;
  loading = false;


  constructor(private trajetService:TrajetService ,private http: HttpClient, private router: Router) { }

  ngOnInit() {
       this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
         

  }

  saveTrajet() {

      this.trajetService.create(this.trajet, this.currentUser._id);

      this.router.navigate(['/trajet'])
  }

}
