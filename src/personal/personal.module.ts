import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeAuthComponent} from "./components/home-auth/home-auth.component";
import {PersonalRoutingModule} from './personal-routing.module'
import {HistoryComponent} from "./components/history/history.component";
import {PaymentsTransfersComponent} from "./components/payments-transfers/payments-transfers.component";

import {FondCardsService} from "./fond-cards.service";
import {HttpClientModule} from "@angular/common/http";
import {HomePageComponent} from "./components/home-page/home-page.component";


@NgModule({
  declarations: [
    HomeAuthComponent,
    HistoryComponent,
    PaymentsTransfersComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    HttpClientModule
  ],
  providers: [FondCardsService]
})
export class PersonalModule {
}
