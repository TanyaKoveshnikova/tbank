import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsTransfersComponent } from './components/payments-transfers/payments-transfers.component';
import { PaymentsTransfersRoutingModule } from './payments-transfers-routing.module';
import { PaymentsBetweenAccountsComponent } from './components/payments-between-accounts/payments-between-accounts.component';
import { PaymentsAnotherClientComponent } from './components/payments-another/payments-another-client/payments-another-client.component';
import { PaymentsMobileComponent } from './components/payments-mobile/payments-mobile.component';
import { PaymentsTransfersWrapperComponent } from './components/payments-transfers-wrapper/payments-transfers-wrapper.component';
import { FondCardsService } from '../personal/fond-cards.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PaymentsAnotherClientCheckComponent } from './components/payments-another/payments-another-client-check/payments-another-client-check.component';
import { CheckClientCardService } from './check-client-card.service';
import { PaymentsAnotherClientSumComponent } from './components/payments-another/payments-another-client-sum/payments-another-client-sum.component';


@NgModule({
    declarations: [
        PaymentsTransfersComponent,
        PaymentsBetweenAccountsComponent,
        PaymentsAnotherClientComponent,
        PaymentsAnotherClientCheckComponent,
        PaymentsMobileComponent,
        PaymentsTransfersWrapperComponent,
        PaymentsAnotherClientSumComponent
    ],
    imports: [
        CommonModule,
        PaymentsTransfersRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [CheckClientCardService]
})
export class PaymentsTransfersModule {
}
