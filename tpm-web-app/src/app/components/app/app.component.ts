import { Component, OnInit } from '@angular/core';

import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import { UsersService } from './../../services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  /**
     * FormGroup for the search form.
     */
    private searchForm: FormGroup;

    /**
     * If true, show loading spinner on the search submit button.
     */
    private searchLoading: boolean;

    /**
     * True if the form has been submitted at least one.
     */
    private searchSubmitted: boolean;

  // users: Array<any>;

    // Create an instance of the DataService through dependency injection
    constructor(private _dataService: UsersService) {

      // Access the Data Service's getUsers() method we defined
      /*this._dataService.getUsers()
          .subscribe(res => this.users = res);*/
    }

    /**
     * Initialize FormGroup for search form.
     */
    public ngOnInit(): void {
        this.searchLoading = false;
        this.searchSubmitted = false;
        this.searchForm = new FormGroup({

        })
    }



}
