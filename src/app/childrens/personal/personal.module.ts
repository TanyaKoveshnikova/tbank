import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalHomeAfterAuthComponent } from './components/personal-home-after-auth/personal-home-after-auth.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalHistoryPageComponent } from './components/personal-history/personal-history.page.component';
import { PaymentsTransfersComponent } from '../payments-transfers/components/payments-transfers/payments-transfers.component';

import { FondCardsService } from './services/fond-cards.service';
import { HttpClientModule } from '@angular/common/http';
import { PersonalMainPageComponent } from './components/personal-main-page/personal-main-page.component';
import { PersonalMainPageSavingAccountComponent } from './components/personal-main-page/childrens/personal-main-page-saving-account/personal-main-page-saving-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExitAboutGuard } from '../spa/guards/exit.about.guard';
import { PersonalAutoPaymentsComponent } from './components/personal-auto-payments/personal-auto-payments.component';
import { SkeletoneLoadingModule } from '../skeletone-loading/skeletone-loading.module';
import { AuthGuard } from './guards/auth.guard';
import { PersonalHistoryService } from './services/personal-history.service';


@NgModule({
    declarations: [
        PersonalHomeAfterAuthComponent,
        PersonalHistoryPageComponent,
        PersonalMainPageComponent,
        PersonalMainPageSavingAccountComponent,
        PersonalAutoPaymentsComponent
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
        PersonalHistoryService,
    ]
})
export class PersonalModule {
}
