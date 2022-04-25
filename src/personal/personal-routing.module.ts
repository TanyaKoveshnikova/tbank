import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAfterAuthComponent } from './components/home-after-auth/home-after-auth.component';
import { HistoryComponent } from './components/history-page/history/history.component';
import { PaymentsTransfersComponent } from '../payments-transfers/components/payments-transfers/payments-transfers.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateSavingAccComponent } from './components/create-saving-acc/create-saving-acc.component';
import { AuthGuard } from './providers/auth.guard';
import { ExitAboutGuard } from '../spa/providers/exit.about.guard';
import { AutoPaymentsComponent } from './components/auto-payments/auto-payments.component';
import { PaymentsTransfersModule } from '../payments-transfers/payments-transfers.module';


const childrenRoutes: Routes = [
    { path: 'history', component: HistoryComponent },
    {
        path: 'transfer', loadChildren: () => import('../payments-transfers/payments-transfers.module')
            .then((mod: any) => mod.PaymentsTransfersModule)
    },
    {
        path: 'main-page', component: MainPageComponent, children: [
            {
                path: 'createSavingsAccount', // child route path
                component: CreateSavingAccComponent, // child route component that the router renders
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
    { path: 'personal/:id', component: HomeAfterAuthComponent, canActivate: [AuthGuard] },
    { path: ':id', component: HomeAfterAuthComponent, children: childrenRoutes },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalRoutingModule {
}
