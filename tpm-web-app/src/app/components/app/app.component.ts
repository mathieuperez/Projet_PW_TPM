import { Router, NavigationEnd } from '@angular/router';
import { AppConstants } from './../../app-constants';
import { Component, OnInit } from '@angular/core';

import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
    public pageTitle: string;
    public pageText: string;

    public isHomePage: boolean;

    constructor(private router: Router) {
    }

    public ngOnInit(): void {
        localStorage.setItem(AppConstants.ACCESS_COOKIE_NAME, 'access_cookie');
        localStorage.setItem(AppConstants.LOGIN_USER, 'login_user');
        localStorage.setItem(AppConstants.EMAIL_USER, 'email_user');
        localStorage.setItem(AppConstants.ROLE_USER, 'role_user');

        this.isHomePage = true;

        this.pageTitle = 'TPM Application';
        this.pageText = 'Bienvenue sur une application de gestion d\'offres de voyages, de trajets et de locations !';

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                if (val.url !== '/') {
                    this.isHomePage = false;
                } else {
                    this.isHomePage = true;
                    this.changeHomePage();
                }
            }
        });
    }

    public isLoggedIn(): boolean {
        if (localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME)
            && localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME) !== 'access_cookie') {
            return true;
        }
        return false;
    }

    public getLogin(): string {
        return (localStorage.getItem(AppConstants.LOGIN_USER));
    }

    public getUserRole(): string {
        return (localStorage.getItem(AppConstants.ROLE_USER));
    }

    public logout(): void {
        localStorage.clear();
        localStorage.setItem(AppConstants.ACCESS_COOKIE_NAME, 'access_cookie');
        localStorage.setItem(AppConstants.LOGIN_USER, 'login_user');
        localStorage.setItem(AppConstants.EMAIL_USER, 'email_user');
        localStorage.setItem(AppConstants.ROLE_USER, 'role_user');
        this.router.navigate(['/']);
        this.changeHomePage();
    }

    public changeHomePage(): void {
        if (this.isLoggedIn()) {
            this.pageTitle = 'Bonjour ' + localStorage.getItem(AppConstants.LOGIN_USER) + '!';
            switch (localStorage.getItem(AppConstants.ROLE_USER)) {
                case 'Utilisateur':
                    this.pageText = 'Bienvenue sur une application de recherche d\'offres de voyages, de trajets et de locations ! <br />'
                                    + 'Vous pouvez naviguer entre les différents onglets en haut de page pour rechercher <br />'
                                    + 'des offres et en ajouter à votre liste de réservations. <br /><br />Bonne visite !';
                break;
                case 'Agence':
                    this.pageText = 'Bienvenue sur une application de recherche d\'offres de voyages, de trajets et de locations ! <br />'
                                    + 'Vous pouvez naviguer entre les différents onglets en haut de page pour gérer vos offres<br />'
                                    + 'de voyages que vous avez proposées, en y ajoutant des nouvelles, modifiant ou <br />'
                                    + 'supprimant les existantes. <br /><br />Bonne visite !';
                break;
                case 'Particulier':
                    this.pageText = 'Bienvenue sur une application de recherche d\'offres de voyages, de trajets et de locations ! <br />'
                                    + 'Vous pouvez naviguer entre les différents onglets en haut de page pour gérer vos offres<br />'
                                    + 'de trajets ou de locations que vous avez proposées, en y ajoutant des nouvelles, modifiant ou <br />'
                                    + 'supprimant les existantes. <br /><br />Bonne visite !';
                break;
            }
        } else {
            this.pageText = 'Bienvenue sur une application de gestion d\'offres de voyages, de trajets et de locations !';
        }
    }

}
