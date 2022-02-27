import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AunthetiatedComponent } from './authenticated/aunthetiated.component';
import { HomeComponent } from './home/home.component';
import { HomeAunthetiatedComponent } from './home-aunthetiated/home-aunthetiated.component';
import {SpaModule} from "../spa/spa.module";

@NgModule({
  declarations: [
    AppComponent,
    AunthetiatedComponent,
    HomeComponent,
    HomeAunthetiatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
