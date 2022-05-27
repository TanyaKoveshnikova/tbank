import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalHomeAfterAuthComponent } from './components/personal-home-after-auth/personal-home-after-auth.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalHistoryPageComponent } from './components/personal-history/personal-history.page.component';

import { FondCardsService } from './services/fond-cards.service';
import { HttpClientModule } from '@angular/common/http';
import { PersonalMainPageComponent } from './components/personal-main-page/personal-main-page.component';
import { PersonalMainPageSavingAccountComponent } from './components/personal-main-page/childrens/personal-main-page-saving-account/personal-main-page-saving-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExitAboutGuard } from '../spa/guards/exit.about.guard';
import { PersonalAutoPaymentsComponent } from './components/personal-auto-payments/personal-auto-payments.component';
import { SkeletoneLoadingModule } from '../loading/skeletone-loading.module';
import { AuthGuard } from './guards/auth.guard';
import { PersonalHistoryService } from './services/personal-history.service';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { PersonalAdvertisingComponent } from './components/personal-advertising/personal-advertising.component';
import { HintHostListenerDirective } from './directives/hint-host-listener.directive';
import { PersonalMainPageNewCardComponent } from './components/personal-main-page/childrens/personal-main-page-new-card/personal-main-page-new-card.component';
import { GetDataService } from './services/get-data.service';
import { GeneralComponentsModule } from '../../general-components/general-components.module';


@NgModule({
    declarations: [
        PersonalHomeAfterAuthComponent,
        PersonalHistoryPageComponent,
        PersonalMainPageComponent,
        PersonalMainPageSavingAccountComponent,
        PersonalAutoPaymentsComponent,
        PersonalAdvertisingComponent,
        HintHostListenerDirective,
        PersonalMainPageNewCardComponent
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
        GeneralComponentsModule,
    ],
    providers: [
        FondCardsService,
        GetDataService,
        ExitAboutGuard,
        AuthGuard,
        PersonalHistoryService,
    ]
})
export class PersonalModule {
}
