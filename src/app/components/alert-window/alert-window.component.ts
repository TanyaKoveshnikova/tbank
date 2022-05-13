import { Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AlertifyServiceService } from '../../services/alertify-service.service';
import { INotificationOptions } from '../../childrens/spa/interfaces/INotificationOptions';

@Component({
    selector: 'app-alert-window',
    templateUrl: './alert-window.component.html',
    styleUrls: ['./alert-window.component.scss']
})
export class AlertWindowComponent implements OnInit {
    public showNotification: boolean = false;
    public notificationOptions!: INotificationOptions | null;
    private _onDestroyEvent$: Subject<void> = new Subject<void>();

    constructor(private _alertifyServiceService: AlertifyServiceService,) {
    }

    public ngOnInit(): void {
        this._alertifyServiceService.subject$
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
