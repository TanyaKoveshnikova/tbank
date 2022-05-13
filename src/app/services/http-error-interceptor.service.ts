import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertifyServiceService } from './alertify-service.service';
import { AlertWindowComponent } from '../components/alert-window/alert-window.component';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

    constructor(private _alertify: AlertWindowComponent) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log(error);

                    return throwError(error.error + 'inter');
                })
            );
    }
}
