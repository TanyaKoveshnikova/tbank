import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpaModule } from './childrens/spa/spa.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SpaModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        BreadcrumbModule
    ],
    // guards: [AuthGuard],
    bootstrap: [AppComponent],
    providers: [CookieService]
})
export class AppModule {
}

