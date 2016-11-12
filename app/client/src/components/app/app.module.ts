import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { WallComponent } from '../wall/wall.component';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'wall', component: WallComponent },
      { path: 'wall/:name', component: WallComponent },
      { path: '**', component: LoginComponent }
    ]),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    WallComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
