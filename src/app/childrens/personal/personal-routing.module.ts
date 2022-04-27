import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalHomeAfterAuthComponent } from './components/personal-home-after-auth/personal-home-after-auth.component';
import { PersonalHistoryPageComponent } from './components/personal-history/personal-history.page.component';
import { PaymentsTransfersComponent } from '../payments-transfers/components/payments-transfers/payments-transfers.component';
import { PersonalMainPageComponent } from './components/personal-main-page/personal-main-page.component';
import { PersonalMainPageSavingAccountComponent } from './components/personal-main-page/childrens/personal-main-page-saving-account/personal-main-page-saving-account.component';
import { AuthGuard } from './guards/auth.guard';
import { ExitAboutGuard } from '../spa/guards/exit.about.guard';
import { PersonalAutoPaymentsComponent } from './components/personal-auto-payments/personal-auto-payments.component';
import { PaymentsTransfersModule } from '../payments-transfers/payments-transfers.module';


const childrenRoutes: Routes = [
    { path: 'history', component: PersonalHistoryPageComponent },
    {
        path: 'transfer', loadChildren: () => import('../payments-transfers/payments-transfers.module')
            .then((mod: any) => mod.PaymentsTransfersModule)
    },
    {
        path: 'personal-main-page', component: PersonalMainPageComponent, children: [
            {
                path: 'createSavingsAccount', // child route path
                component: PersonalMainPageSavingAccountComponent, // child route component that the router renders
                canDeactivate: [ExitAboutGuard]
            }
        ]
    },
    {
        path: 'myArea', loadChildren: () => import('../personal-area/personal-area.module')
            .then((mod: any) => mod.PersonalAreaModule)
    }
];

const routes: Routes = [
    { path: 'personal/:id', component: PersonalHomeAfterAuthComponent, canActivate: [AuthGuard] },
    { path: ':id', component: PersonalHomeAfterAuthComponent, children: childrenRoutes },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalRoutingModule {
}