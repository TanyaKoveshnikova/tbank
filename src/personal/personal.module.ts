import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAfterAuthComponent } from './components/home-after-auth/home-after-auth.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { PaymentsTransfersComponent } from './components/payments-transfers/payments-transfers.component';

import { FondCardsService } from './fond-cards.service';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateSavingAccComponent } from './components/create-saving-acc/create-saving-acc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExitAboutGuard } from '../spa/providers/exit.about.guard';
import { AutoPaymentsComponent } from './components/auto-payments/auto-payments.component';


@NgModule({
    declarations: [
        HomeAfterAuthComponent,
        HistoryComponent,
        PaymentsTransfersComponent,
        MainPageComponent,
        CreateSavingAccComponent,
        AutoPaymentsComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PersonalRoutingModule,
        HttpClientModule
    ],
    providers: [FondCardsService, ExitAboutGuard]
})
export class PersonalModule {
}
