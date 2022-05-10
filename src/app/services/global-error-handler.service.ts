import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    public handleError(error: Error | HttpErrorResponse): void {
        console.error('Error from global error handler', error);
    }
}
