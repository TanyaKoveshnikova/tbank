import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsTransfersComponent } from './components/payments-transfers/payments-transfers.component';
import { PaymentsTransfersRoutingModule } from './payments-transfers-routing.module';
import { PaymentsBetweenAccountsComponent } from './components/payments-between-account/payments-between-accounts/payments-between-accounts.component';
import { PaymentsAnotherClientComponent } from './components/payments-another/payments-another-client/payments-another-client.component';
import { PaymentsMobileComponent } from './components/payments-mobile/payments-mobile.component';
import { PaymentsTransfersWrapperComponent } from './components/payments-transfers-wrapper/payments-transfers-wrapper.component';
import { FondCardsService } from '../personal/services/fond-cards.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PaymentsAnotherClientCheckComponent } from './components/payments-another/payments-another-client-check/payments-another-client-check.component';
import { CheckClientCardService } from './services/check-client-card.service';
import { PaymentsAnotherClientSumComponent } from './components/payments-another/payments-another-client-sum/payments-another-client-sum.component';
import { SkeletoneLoadingModule } from '../skeletone-loading/skeletone-loading.module';
import { PaymentsAnnouncementComponent } from './components/payments-another/payments-announcement/payments-announcement.component';
import { FillingDetailsComponent } from './components/payments-between-account/filling-details/filling-details.component';
import { ConfirmationComponent } from './components/payments-between-account/confirmation/confirmation.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FactoryCardHistory } from '../../../libs/factory.history/factory';
import { SendCardHistory } from '../../../libs/factory.history/data/sendCardHistory';


@NgModule({
    declarations: [
        PaymentsTransfersComponent,
        PaymentsBetweenAccountsComponent,
        PaymentsAnotherClientComponent,
        PaymentsAnotherClientCheckComponent,
        PaymentsMobileComponent,
        PaymentsTransfersWrapperComponent,
        PaymentsAnotherClientSumComponent,
        PaymentsAnnouncementComponent,
        FillingDetailsComponent,
        ConfirmationComponent
    ],
    imports: [
        CommonModule,
        PaymentsTransfersRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SkeletoneLoadingModule,
        BreadcrumbModule,
    ],
    providers: [CheckClientCardService, FactoryCardHistory, SendCardHistory]
})
export class PaymentsTransfersModule {
}
