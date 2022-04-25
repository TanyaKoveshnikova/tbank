import { HttpClient } from '@angular/common/http';
import { ICommon } from '../interfaces/ICommon';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SendCardHistory {

    constructor(
        private _http: HttpClient,
    ) {
        //
    }

    public postFromSomeone(urlMyHistory: string, bodyRequest: ICommon): void {
        this.postCommon(urlMyHistory, bodyRequest)
        ;
    }

    private postCommon(url: string, bodyRequest: any): void {
        this._http.post<any>(url, bodyRequest)
            .subscribe(() => {
                console.log( 'DO IT');
            });
    }
}
