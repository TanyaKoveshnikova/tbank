import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { INotificationOptions } from '../components/spa/interfaces/INotificationOptions.interface';
import { AbstractAlertifyService } from './abstract-alertify.service';


@Injectable({
    providedIn: 'root'
})
export class AlertifyServiceService implements AbstractAlertifyService {
    private _subject$: Subject<INotificationOptions> = new Subject<INotificationOptions>();

    public makeNewAlert(): Subject<INotificationOptions> {
        return this._subject$;
    }
}

