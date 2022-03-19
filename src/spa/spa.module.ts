import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpaBodyComponent} from "./components/spa-body/spa-body.component";

import {AppRoutingModule} from "../app/app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "../login/login.module";
import {FooterSpaComponent} from "./components/footer-spa/footer-spa.component";
import {SpaBodyRouterComponent} from "./components/spa-body-router/spa-body-router.component";


@NgModule({
  declarations: [
    SpaBodyComponent,
    FooterSpaComponent,
    SpaBodyRouterComponent
  ],
  exports: [
    SpaBodyComponent,
    FooterSpaComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
  ],
  providers: []
})
export class SpaModule { }
