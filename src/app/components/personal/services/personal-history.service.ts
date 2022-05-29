import { Injectable } from '@angular/core';
import { PeopleService } from '../../login/services/people.service';
import { HttpClient } from '@angular/common/http';
import { ICommon } from '../../../../libs/factory.history/interfaces/ICommon.interface';
import { IBetweenAccount } from '../../../../libs/factory.history/interfaces/IBetweenAccount.interface';
import { Observable, publishReplay, refCount } from 'rxjs';
import { ICommonHistory } from '../interfaces/ICommonHistory.interface';
import { FondCardsService } from './fond-cards.service';

@Injectable({
    providedIn: 'root'
})
export class PersonalHistoryService {
    private _urlGetUserHistory: string = <string>'http://localhost:3000/history';
    private _idUser!: number;

    constructor(private _http: HttpClient, private _fondCardsService: FondCardsService) {
        if (_fondCardsService.id) {
            this._idUser = _fondCardsService.id;
            this._urlGetUserHistory += this._idUser;
            console.log(this._urlGetUserHistory);
        }
    }

    public getUserHistory(): Observable<ICommonHistory[]> {
        return this._http.get<ICommonHistory[]>(this._urlGetUserHistory)
    }
}

