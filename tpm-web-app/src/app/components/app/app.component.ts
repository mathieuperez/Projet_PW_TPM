import { Component } from '@angular/core';

import { UsersService } from './../../services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  users: Array<any>;

    // Create an instance of the DataService through dependency injection
    constructor(private _dataService: UsersService) {

      // Access the Data Service's getUsers() method we defined
      this._dataService.getUsers()
          .subscribe(res => this.users = res);
    }
}
