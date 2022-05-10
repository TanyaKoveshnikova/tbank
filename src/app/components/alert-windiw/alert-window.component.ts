import { Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertifyServiceService } from '../../services/alertify-service.service';

@Component({
    selector: 'app-alert-window',
    templateUrl: './alert-window.component.html',
    styleUrls: ['./alert-window.component.scss']
})
export class AlertWindowComponent implements OnInit {
    public message?: string;
    public q?: BehaviorSubject<boolean>;

    constructor(private _alertifyServiceService: AlertifyServiceService,) {
        this.q?.next(false);
        this.q = _alertifyServiceService.qq;
        console.log('AlertWindowComponent' + this.q + this.q?.getValue());
    }

    public ngOnInit(): void {
    }

    public openWindow(message: string): void {
        this.message = message;
        document.getElementById('modal')!.style.display = 'display';
        setTimeout(this.closeWindow, 3000);

    }

    public closeWindow(message: string): void {
        this.message = message;
        document.getElementById('modal')!.style.display = 'none';
    }
}
