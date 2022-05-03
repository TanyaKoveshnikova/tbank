import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsTransfersComponent } from './components/payments-transfers/payments-transfers.component';
import { PaymentsBetweenAccountsComponent } from './components/payments-between-account/payments-between-accounts/payments-between-accounts.component';
import { PaymentsAnotherClientComponent } from './components/payments-another/payments-another-client/payments-another-client.component';
import { PaymentsMobileComponent } from './components/payments-mobile/payments-mobile.component';
import { PaymentsTransfersWrapperComponent } from './components/payments-transfers-wrapper/payments-transfers-wrapper.component';
import { PersonalMainPageSavingAccountComponent } from '../personal/components/personal-main-page/childrens/personal-main-page-saving-account/personal-main-page-saving-account.component';
import { ExitAboutGuard } from '../spa/guards/exit.about.guard';
import { PaymentsAnotherClientCheckComponent } from './components/payments-another/payments-another-client-check/payments-another-client-check.component';
import { PaymentsAnotherClientSumComponent } from './components/payments-another/payments-another-client-sum/payments-another-client-sum.component';
import { PaymentsAnotherAnnouncementComponent } from './components/payments-another/payments-another-announcement/payments-another-announcement.component';
import { PaymentBetweenFillingDetailsComponent } from './components/payments-between-account/payment-between-filling-details/payment-between-filling-details.component';
import { PaymentBetweenConfirmationComponent } from './components/payments-between-account/payment-between-confirmation/payment-between-confirmation.component';


const childrenRoutes: Routes = [
    {
        path: 'between-account',
        component: PaymentsBetweenAccountsComponent,
        data: { breadcrumb: 'BetweenAccount' },
        children: [
            {
                path: 'fillingDetails',
                component: PaymentBetweenFillingDetailsComponent,
                data: { breadcrumb: { skip: true } },
            },
            {
                path: 'confirmation',
                component: PaymentBetweenConfirmationComponent,
                data: { breadcrumb: { skip: true } },
            }
        ]
    },
    { path: 'another-client', component: PaymentsAnotherClientComponent, data: { breadcrumb: 'another-client' }, },
    { path: 'check', component: PaymentsAnotherClientCheckComponent, data: { breadcrumb: { skip: true } }, },
    { path: 'transfer-amount', component: PaymentsAnotherClientSumComponent, data: { breadcrumb: { skip: true } }, },
    { path: 'announcement', component: PaymentsAnotherAnnouncementComponent, data: { breadcrumb: { skip: true } }, },
    { path: 'mobile', component: PaymentsMobileComponent },
    {
        path: 'choice',
        component: PaymentsTransfersComponent,
        data: { breadcrumb: { skip: true } },
        children: []
    }
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
