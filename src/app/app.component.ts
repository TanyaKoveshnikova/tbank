import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AlertifyServiceService } from './services/alertify-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
    // public showNotification: boolean = false;
    // public notificationOptions: INotificationOptions;
    // private _onDestroyEvent$: Subject<void> = new Subject<void>();
    public title: string | null = 'tbank';

    //configSoc: SpaConfigSettings;

    constructor(private _alertifyServiceService: AlertifyServiceService,) {
        // const config: SpaConfigSettings = {
        //   socialIcons: [
        //     {imageFile: 'src/assets/images/logo_blue.png', alt: 'Telegram', url: 'ggj####'},
        //     {imageFile: 'src/assets/images/logo_blue.png', alt: 'Telegram', url: 'ggj####'},
        //     {imageFile: 'src/assets/images/logo_blue.png', alt: 'Telegram', url: 'ggj####'},
        //     {imageFile: 'src/assets/images/logo_blue.png', alt: 'Telegram', url: 'ggj####'}
        //   ]
        // }
        // this.configSoc = config
    }

    public ngOnInit(): void {
        // this._alertifyServiceService.subject$
        //     .pipe(
        //         takeUntil(this._onDestroyEvent$)
        //     )
        //     .subscribe((options: INotificationOptions): void => {
        //         this.showNotification = true;
        //         this.notificationOptions = options;
        //
        //         setTimeout(() => {
        //             this.showNotification = false;
        //             this.notificationOptions = null;
        //         }, 5000);
        //     });
    }

    public ngOnDestroy(): void {
        //this._onDestroyEvent$.next();
    }

}
