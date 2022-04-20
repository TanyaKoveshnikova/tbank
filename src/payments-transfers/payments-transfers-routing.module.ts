import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsTransfersComponent } from './components/payments-transfers/payments-transfers.component';
import { PaymentsBetweenAccountsComponent } from './components/payments-between-accounts/payments-between-accounts.component';
import { PaymentsAnotherClientComponent } from './components/payments-another/payments-another-client/payments-another-client.component';
import { PaymentsMobileComponent } from './components/payments-mobile/payments-mobile.component';
import { PaymentsTransfersWrapperComponent } from './components/payments-transfers-wrapper/payments-transfers-wrapper.component';
import { CreateSavingAccComponent } from '../personal/components/create-saving-acc/create-saving-acc.component';
import { ExitAboutGuard } from '../spa/providers/exit.about.guard';
import { PaymentsAnotherClientCheckComponent } from './components/payments-another/payments-another-client-check/payments-another-client-check.component';
import { PaymentsAnotherClientSumComponent } from './components/payments-another/payments-another-client-sum/payments-another-client-sum.component';
import { PaymentsAnnouncementComponent } from './components/payments-another/payments-announcement/payments-announcement.component';


const childrenRoutes: Routes = [
    { path: 'between-account', component: PaymentsBetweenAccountsComponent },
    { path: 'another-client', component: PaymentsAnotherClientComponent },
    { path: 'check', component: PaymentsAnotherClientCheckComponent },
    { path: 'transfer-amount', component: PaymentsAnotherClientSumComponent },
    { path: 'announcement', component: PaymentsAnnouncementComponent },
    { path: 'mobile', component: PaymentsMobileComponent },
    { path: 'choice', component: PaymentsTransfersComponent },
];

const routes: Routes = [
    { path: '', component: PaymentsTransfersWrapperComponent, children: childrenRoutes },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentsTransfersRoutingModule {
}
