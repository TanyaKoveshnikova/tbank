import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AlertWindowComponent } from '../components/alert-windiw/alert-window.component';


@Injectable({
    providedIn: 'root'
})
export class AlertifyServiceService implements OnInit {

    public qq?: BehaviorSubject<boolean>;

    constructor() {
        this.qq?.next(false);
        console.log(this.qq?.getValue());
    }

    public ngOnInit(): void {
        //
    }

    public changeQQ(): void {
        if (this.qq?.value === true) {
            this.qq?.next(false);
        } else {
            this.qq?.next(true);
        }
    }

    public openModel(message: string): any {

    }
}
