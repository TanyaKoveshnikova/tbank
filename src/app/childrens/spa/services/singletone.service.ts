import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SingletoneService {
    public loggedUser!: IUser;
    public loading: boolean = false;

    private _flagSource: any = new BehaviorSubject(false);
    public flag: Observable<boolean> = this._flagSource;

    private _loggedInStatus: boolean | null = false;


    constructor() {
        //
    }

    public changeFlag(value: boolean): void{
        this._flagSource
            .next(value);
    }

    public setLoggedIn(value: boolean): void {
        this._loggedInStatus = value;
    }

    public get isLoggedIn(): boolean | null {
        return this._loggedInStatus;
    }

}
