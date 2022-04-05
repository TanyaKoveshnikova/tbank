import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SingletoneService {
    private _loggedInStatus: boolean =  false;

    public setLoggedIn(value: boolean) {
        this._loggedInStatus = value;
    }

    public get isLoggedIn() {
        return this._loggedInStatus;
    }

    constructor() {
    }
}
