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
import { PeopleService } from '../login/services/people.service';
import { SingletoneService } from '../spa/services/singletone.service';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { PersonalAdvertisingComponent } from './components/personal-advertising/personal-advertising.component';
import { BrowserModule } from '@angular/platform-browser';
import { HintHostListenerDirective } from './directives/hint-host-listener.directive';
import { AppModule } from '../../app.module';



@NgModule({
    declarations: [
        PersonalHomeAfterAuthComponent,
        PersonalHistoryPageComponent,
        PersonalMainPageComponent,
        PersonalMainPageSavingAccountComponent,
        PersonalAutoPaymentsComponent,
        PersonalAdvertisingComponent,
        HintHostListenerDirective,
    ],
    entryComponents: [
        PersonalAdvertisingComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PersonalRoutingModule,
        HttpClientModule,
        SkeletoneLoadingModule,
        BreadcrumbModule,
    ],
    providers: [
        FondCardsService,
        ExitAboutGuard,
        AuthGuard,
        PersonalHistoryService,
    ]
})
export class PersonalModule {
    constructor(
        private _peopleService: PeopleService,
        private _singletoneService: SingletoneService,
        private _fondCardsService: FondCardsService,
    ) {
        this._singletoneService.setLoggedIn(true);
        this._peopleService.getLoginUser();
        this._fondCardsService.ngOnInit();
    }
}
