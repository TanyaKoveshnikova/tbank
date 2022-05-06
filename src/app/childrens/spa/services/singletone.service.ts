import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SingletoneService {
    public loggedUser!: Observable<IUser>;
    // public loading: boolean = false;
    private _flagSource: any = new BehaviorSubject(false);
    /*private _loggedInStatus: boolean | null = false;*/


    constructor() {
        //
    }

    public setFlag(value: boolean): void {
        this._flagSource
            .next(value);
    }

    public getFlag(): BehaviorSubject<boolean> {
        return this._flagSource;
    }

    // public setLoggedIn(value: boolean): void {
    //     this._loggedInStatus = value;
    // }
    //
    // public get isLoggedIn(): boolean | null {
    //     return this._loggedInStatus;
    // }
}
