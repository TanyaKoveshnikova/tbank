import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyServiceService } from './alertify-service.service';
import { AlertifyWithServerService } from './alertify-with-server.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(
        private _injector: Injector,
        private _alertifyServiceService: AlertifyServiceService,
        private _alertifyWithServerService: AlertifyWithServerService,
    ) {
    }


    public handleError(error: Error | HttpErrorResponse): void {

        if (error instanceof HttpErrorResponse) {
            this._alertifyWithServerService.makeNewAlert().next({
                text: 'Sorry, we have technical chocolates. Please check back later',
                status: 'error',
            });

            console.error('Error from global error handler', error, 'backend');
        } else {
            this._alertifyWithServerService.makeNewAlert().next({
                text: error.message,
                status: 'error',
            });

            console.error('Error from global error handler', error, 'fr');
        }
    }
}
