import { Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AlertifyServiceService } from '../../../services/alertify-service.service';
import { INotificationOptions } from '../../../components/spa/interfaces/INotificationOptions.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { AlertifyWithServerService } from '../../../services/alertify-with-server.service';

@Component({
    selector: 'app-alert-window',
    templateUrl: './alert-window.component.html',
    styleUrls: ['./alert-window.component.scss'],
    animations: [
        trigger('explanatoryWindow', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate('1.2s', style({ opacity: 1 })),
            ]),
            transition('* => void', [
                animate('1.2s', style({ opacity: 0 })),
            ]),
        ])
    ]
})
export class AlertWindowComponent implements OnInit {
    public showNotification: boolean = <boolean>false;
    public notificationOptions!: INotificationOptions | null;
    private _onDestroyEvent$: Subject<void> = new Subject<void>();

    constructor(
        private _alertifyServiceService: AlertifyServiceService,
        private _alertifyWithServerService: AlertifyWithServerService,
    ) {
    }

    public ngOnInit(): void {
        this._alertifyServiceService.makeNewAlert()
            .pipe(
                takeUntil(this._onDestroyEvent$)
            )
            .subscribe((options: INotificationOptions): void => {
                this.showNotification = true;
                this.notificationOptions = options;

                setTimeout(() => {
                    this.showNotification = false;
                    this.notificationOptions = null;
                }, 4000);
            });

        this._alertifyWithServerService.makeNewAlert()
            .pipe(
                takeUntil(this._onDestroyEvent$)
            )
            .subscribe((options: INotificationOptions): void => {
                this.showNotification = true;
                this.notificationOptions = options;

                setTimeout(() => {
                    this.showNotification = false;
                    this.notificationOptions = null;
                }, 4000);
            });
    }

}
