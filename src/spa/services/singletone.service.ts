import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SingletoneService {
    private _loggedInStatus: boolean | null = false;

    public setLoggedIn(value: boolean): void {
        this._loggedInStatus = value;
    }

    public get isLoggedIn(): boolean | null {
        return this._loggedInStatus;
    }

    constructor() {
        //
    }
}
