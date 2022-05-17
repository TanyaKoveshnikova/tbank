import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsTransfersComponent } from './components/payments-transfers/payments-transfers.component';
import { PaymentsTransfersRoutingModule } from './payments-transfers-routing.module';
import { PaymentsBetweenAccountsComponent } from './components/payments-between-account/payments-between-accounts/payments-between-accounts.component';
import { PaymentsAnotherClientComponent } from './components/payments-another/payments-another-client/payments-another-client.component';
import { PaymentsMobileComponent } from './components/payments-mobile/payments-mobile.component';
import { FondCardsService } from '../personal/services/fond-cards.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PaymentsAnotherClientCheckComponent } from './components/payments-another/payments-another-client-check/payments-another-client-check.component';
import { CheckClientCardService } from './services/check-client-card.service';
import { PaymentsAnotherClientSumComponent } from './components/payments-another/payments-another-client-sum/payments-another-client-sum.component';
import { SkeletoneLoadingModule } from '../skeletone-loading/skeletone-loading.module';
import { PaymentsAnotherAnnouncementComponent } from './components/payments-another/payments-another-announcement/payments-another-announcement.component';
import { PaymentBetweenFillingDetailsComponent } from './components/payments-between-account/payment-between-filling-details/payment-between-filling-details.component';
import { PaymentBetweenConfirmationComponent } from './components/payments-between-account/payment-between-confirmation/payment-between-confirmation.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FactoryCardHistory } from '../../../libs/factory.history/factory';
import { SendCardHistory } from '../../../libs/factory.history/data/sendCardHistory';
import { ActivatedRoute, Router } from '@angular/router';


@NgModule({
    declarations: [
        PaymentsTransfersComponent,
        PaymentsBetweenAccountsComponent,
        PaymentsAnotherClientComponent,
        PaymentsAnotherClientCheckComponent,
        PaymentsMobileComponent,
        PaymentsAnotherClientSumComponent,
        PaymentsAnotherAnnouncementComponent,
        PaymentBetweenFillingDetailsComponent,
        PaymentBetweenConfirmationComponent
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
