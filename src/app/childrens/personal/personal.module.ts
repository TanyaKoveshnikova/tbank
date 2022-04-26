import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAfterAuthComponent } from './components/home-after-auth/home-after-auth.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { PaymentsTransfersComponent } from '../payments-transfers/components/payments-transfers/payments-transfers.component';

import { FondCardsService } from './services/fond-cards.service';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateSavingAccComponent } from './components/create-saving-acc/create-saving-acc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExitAboutGuard } from '../spa/guards/exit.about.guard';
import { AutoPaymentsComponent } from './components/auto-payments/auto-payments.component';
import { SkeletoneLoadingModule } from '../skeletone-loading/skeletone-loading.module';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
    declarations: [
        HomeAfterAuthComponent,
        HistoryComponent,
        MainPageComponent,
        CreateSavingAccComponent,
        AutoPaymentsComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PersonalRoutingModule,
        HttpClientModule,
        SkeletoneLoadingModule
    ],
    providers: [
        FondCardsService,
        ExitAboutGuard,
        AuthGuard,
    ]
})
export class PersonalModule {
}
