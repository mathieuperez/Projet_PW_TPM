import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { UsersService } from './services/users/users.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' }
    ]),
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
