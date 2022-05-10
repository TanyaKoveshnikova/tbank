import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaBodyContainerComponent } from './components/spa-body-container/spa-body-container.component';

import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from '../login/login.module';
import { FooterSpaComponent } from './components/footer-spa/footer-spa.component';
import { SpaBodyComponent } from './components/spa-body/spa-body.component';
import { SingletonService } from './services/singleton.service';
import { AuthGuard } from '../personal/guards/auth.guard';
import { AlertifyServiceService } from '../../services/alertify-service.service';
import { AlertWindowComponent } from '../../components/alert-windiw/alert-window.component';


@NgModule({
    declarations: [
        SpaBodyContainerComponent,
        SpaBodyComponent,
        FooterSpaComponent,
    ],
    exports: [
        SpaBodyContainerComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        LoginModule,
    ],
    providers: [
        SingletonService,
        AuthGuard,
        AlertifyServiceService,
    ]
})
export class SpaModule {
}
