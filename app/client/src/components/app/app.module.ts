import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { UIRouterModule } from 'ui-router-ng2';

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { WallComponent } from '../wall/wall.component';
import { ChatComponent } from '../chat/chat.component';
import { MapComponent } from '../map/map.component';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    UIRouterModule.forRoot({
      states: [
        { name: 'login', url: '/login', component: LoginComponent },
        { name: 'wallByName', url: '/wall/{name}', component: WallComponent },
      ],
      otherwise: '/login',
    }),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    WallComponent,
    ChatComponent,
    MapComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
