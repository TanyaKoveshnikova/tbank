import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AlertWindowComponent } from '../components/alert-window/alert-window.component';
import { INotificationOptions } from '../childrens/spa/interfaces/INotificationOptions';


@Injectable({
    providedIn: 'root'
})
export class AlertifyServiceService implements OnInit {
    public statusAlert: string = 'error';

    public subject$: Subject<INotificationOptions> = new Subject<INotificationOptions>();

    constructor() {
        //
    }

    public ngOnInit(): void {
        //
    }
}

