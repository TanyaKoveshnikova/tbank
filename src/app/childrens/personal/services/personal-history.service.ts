import { Injectable } from '@angular/core';
import { PeopleService } from '../../login/services/people.service';
import { HttpClient } from '@angular/common/http';
import { ICommon } from '../../../../libs/factory.history/interfaces/ICommon';
import { IBetweenAccount } from '../../../../libs/factory.history/interfaces/IBetweenAccount';
import { Observable } from 'rxjs';
import { ICommonHistory } from '../interfaces/ICommonHistory';

@Injectable({
    providedIn: 'root'
})
export class PersonalHistoryService {
    private _urlGetUserHistory: string = 'http://localhost:3000/history';
    private _idUser!: number;

    constructor(private _http: HttpClient, private _peopleService: PeopleService) {
        if (_peopleService.userWithId) {
            this._idUser = _peopleService.userWithId?.id;
            this._urlGetUserHistory += this._idUser;
        }
    }

    public getUserHistory(): Observable<ICommonHistory[]> {
        return this._http.get<ICommonHistory[]>(this._urlGetUserHistory);
    }
}
