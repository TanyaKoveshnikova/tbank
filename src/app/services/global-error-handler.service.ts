import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyServiceService } from './alertify-service.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(private _injector: Injector,  private _alertifyServiceService: AlertifyServiceService,) {}


    public handleError(error: Error | HttpErrorResponse): void {

        if( error instanceof HttpErrorResponse){
            this._alertifyServiceService.makeNewAlert().next({
                text: 'Sorry, we have technical chocolates. Please check back later',
                status: 'error',
            });

            console.error('Error from global error handler', error, 'backend');
        } else{
            this._alertifyServiceService.makeNewAlert().next({
                text: error.message,
                status: 'error',
            });

            console.error('Error from global error handler', error, 'fr');
        }
    }
}
