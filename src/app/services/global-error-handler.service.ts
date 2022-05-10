import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    public handleError(error: any): void {
        // your custom error handling logic
    }
}
