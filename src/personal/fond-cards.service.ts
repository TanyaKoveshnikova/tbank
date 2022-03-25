import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ISavAcc, IUser, savingsAccount} from "../spa/interfaces";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, Subject, switchMap} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FondCardsService implements OnInit {
    private urlSignupUser: string = 'http://localhost:3000/signupUsers';
    private _urlSavingAcc: string = '' +
        '';
    public id?: number;
    public userService?: IUser;
    public getUserSubject: Subject<IUser> = new Subject<IUser>();
    private _newSavAcc!: savingsAccount;


    constructor(private http: HttpClient, public activateRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this._createUsrService();
    }

    public sendOnServerSavingAcc(name: string, endDate: Date, amount: number, savingsAccForm: FormGroup) {
        this._newSavAcc = {
            name: name,
            endDate: endDate,
            goalRUB: FondCardsService._stringGoalRUB(amount),
            doneRUB: '',
            id: savingsAccForm.value.id
        }

        this._postSavingsAcc();
    }

    private static _stringGoalRUB(amount: number): string {
        return new Intl.NumberFormat('ru-RU').format(amount);
    }

    public get_urlSavingAcc(): Observable<Array<ISavAcc>> {
        return this.http.get<ISavAcc[]>(this._urlSavingAcc);
    }


    private _getSavingAccParams(): Observable<ISavAcc> {
        return this.get_urlSavingAcc()
            .pipe(
                map((savAccs: ISavAcc[]): ISavAcc => {
                    return savAccs.filter(acc => acc.id === this.id)[0];
                })
            );
    }


    private _postSavingsAcc() {
        let urlNeedAcc = this._getSavingAccParams()
        this.http.patch(urlNeedAcc + '/{savingsAccount}', this._newSavAcc)
            .subscribe(
                res => {
                    console.log('received ok response from patch request');
                })
    }

    //Для выгрузки найденного пользователя, после логина
    public getNeedUserParams(): Observable<Array<IUser>> {
        return this.http.get<IUser[]>(this.urlSignupUser);
    }

    private getUserParams(): Observable<IUser> {
        return this.getNeedUserParams()
            .pipe(
                map((user: IUser[]): IUser => {
                    return user.filter(u => u.id === this.id)[0];
                })
            );
    }

    private _createUsrService() {
        this.getUserParams()
            .subscribe((user: IUser) => {
                this.userService = user;
                this.getUserSubject.next(user);
            })
    }
}
