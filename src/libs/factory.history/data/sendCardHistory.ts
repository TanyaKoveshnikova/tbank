import { HttpClient } from '@angular/common/http';
import { ICommon } from '../interfaces/ICommon';
import { Injectable } from '@angular/core';
import { BetweenAccounts } from '../types-actions/betweenAccounts';
import { IBetweenAccount } from '../interfaces/IBetweenAccount';

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
        this.postCommon(urlMyHistory, bodyRequest);
    }

    public postBetweenAccounts(urlMyHistory: string, bodyRequest: IBetweenAccount): void {
        this.postCommon(urlMyHistory, bodyRequest);
    }

    public postWithdrawal(urlMyHistory: string, bodyRequest: ICommon){
        this.postCommon(urlMyHistory, bodyRequest);
    }

    private postCommon(url: string, bodyRequest: IBetweenAccount | ICommon): void {
        this._http.post<IBetweenAccount | ICommon>(url, bodyRequest)
            .subscribe(() => {
                console.log( 'postCommon DO IT');
            });
    }
}
