import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Injectable({
    providedIn: 'root'
})
export class SingletoneService {
    public loggedUser!: IUser;

    private _loggedInStatus: boolean | null = false;


    constructor() {
        //
    }

    public setLoggedIn(value: boolean): void {
        this._loggedInStatus = value;
    }

    public get isLoggedIn(): boolean | null {
        return this._loggedInStatus;
    }

}
