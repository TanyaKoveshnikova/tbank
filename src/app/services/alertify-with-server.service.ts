import { Injectable } from '@angular/core';
import { AbstractAlertifyService } from './abstract-alertify.service';
import { Subject } from 'rxjs';
import { INotificationOptions } from '../components/spa/interfaces/INotificationOptions.interface';

@Injectable({
    providedIn: 'root'
})
export class AlertifyWithServerService implements AbstractAlertifyService {
    private _subject$: Subject<INotificationOptions> = new Subject<INotificationOptions>();

    public makeNewAlert(): Subject<INotificationOptions> {
        this.sendServerMessage();

        return this._subject$;
    }

    public sendServerMessage(): void{
        console.log('Here I send an error message to the server, please fix it urgently!!!');
    }
}

