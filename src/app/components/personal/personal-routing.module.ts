import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalHomeAfterAuthComponent } from './components/personal-home-after-auth/personal-home-after-auth.component';
import { PersonalHistoryPageComponent } from './components/personal-history/personal-history.page.component';
import { PersonalMainPageComponent } from './components/personal-main-page/personal-main-page.component';
import { PersonalMainPageSavingAccountComponent } from './components/personal-main-page/childrens/personal-main-page-saving-account/personal-main-page-saving-account.component';
import { AuthGuard } from './guards/auth.guard';
import { ExitAboutGuard } from '../spa/guards/exit.about.guard';
import { PersonalMainPageNewCardComponent } from './components/personal-main-page/childrens/personal-main-page-new-card/personal-main-page-new-card.component';
import { PersonalMainPageCloseSavAccountComponent } from './components/personal-main-page/childrens/personal-main-page-close-sav-account/personal-main-page-close-sav-account.component';


const childrenRoutes: Routes = [
    {
        path: 'history',
        component: PersonalHistoryPageComponent,
        data: { breadcrumb: { alias: 'History' } },
        canActivate: [AuthGuard],
    },
    {
        path: 'transfer',
        data: { breadcrumb: { alias: 'PaymentsAndTransfers' }, },
        loadChildren: () => import('../payments-transfers/payments-transfers.module')
            .then((mod: any) => mod.PaymentsTransfersModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'personal-main-page',
        component: PersonalMainPageComponent,
        data: { breadcrumb: { alias: 'MainPage' } },
        canActivate: [AuthGuard],
        children: [
            {
                path: 'createSavingsAccount', // child route path
                component: PersonalMainPageSavingAccountComponent, // child route component that the router renders
                canDeactivate: [ExitAboutGuard],
                canActivate: [AuthGuard],
                data: { breadcrumb: { alias: 'CreateSavingsAccount' } },
            },
            {
                path: 'createNewCard', // child route path
                component: PersonalMainPageNewCardComponent, // child route component that the router renders
                canDeactivate: [ExitAboutGuard],
                canActivate: [AuthGuard],
                data: { breadcrumb: { alias: 'Create new card' } },
            },
            {
                path: 'closeCard', // child route path
                component: PersonalMainPageCloseSavAccountComponent, // child route component that the router renders
                canDeactivate: [ExitAboutGuard],
                canActivate: [AuthGuard],
                data: { breadcrumb: { alias: 'Close Card' } },
            }
        ]
    }
];

const routes: Routes = [
    {
        path: ':id',
        component: PersonalHomeAfterAuthComponent,
        children: childrenRoutes,
        canActivate: [AuthGuard],
        data: { breadcrumb: { skip: true } }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalRoutingModule {
}
