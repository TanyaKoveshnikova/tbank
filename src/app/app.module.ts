import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpaModule } from './components/spa/spa.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { CookieService } from 'ngx-cookie-service';
import { AlertifyServiceService } from './services/alertify-service.service';
import { AlertWindowComponent } from './general-components/components/alert-window/alert-window.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        AppComponent,
        AlertWindowComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SpaModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        BreadcrumbModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        CookieService,
        AlertifyServiceService,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandlerService
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: HttpErrorInterceptorService,
        //     multi: true,
        // },
    ]
})
export class AppModule {
}

