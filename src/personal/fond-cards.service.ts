import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser, savingsAccount} from "../spa/interfaces";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, Subject, Subscription, switchMap} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FondCardsService implements OnInit {
    private urlSignupUser: string = 'http://localhost:3000/signupUsers';
    private _urlSavingAcc: string = 'http://localhost:3000/savingsAcc';
    public id?: number;
    public userService?: IUser;
    public getUserSubject: Subject<IUser> = new Subject<IUser>();
    public getSavAccSubject: Subject<savingsAccount[]> = new Subject<savingsAccount[]>();
    private _newSavAcc!: savingsAccount;
    public savAcc?: savingsAccount[];


    constructor(private http: HttpClient, public activateRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this._createUsrService();
        // this.getAllNecessaryAcc();
    }

    public sendOnServerSavingAcc(savingsAccForm: FormGroup) {
        this._newSavAcc = {
            name: savingsAccForm.value.name,
            endDate: savingsAccForm.value.endDate,
            goalRUB: FondCardsService._stringGoalRUB(savingsAccForm.value.goalRUB),
            doneRUB: '',
            idCreator: this.id
        }

        this._postSavingsAcc();
    }

    private static _stringGoalRUB(amount: number): string {
        return new Intl.NumberFormat('ru-RU').format(amount);
    }

    public get_urlSavingAcc(): Observable<Array<savingsAccount>> {
        return this.http.get<savingsAccount[]>(this._urlSavingAcc);
    }

    private _postSavingsAcc() {
        this.http.post<savingsAccount>(this._urlSavingAcc, this._newSavAcc)
            .subscribe(
                res => {
                })
    }

    //Для выгрузки карточек сберегательных счетов
    public _getSavingsAccount(): Observable<Array<savingsAccount>> {
        return this.http.get<savingsAccount[]>(this._urlSavingAcc + '?idCreator=' + this.id);
    }

    // public getAllNecessaryAcc() {
    //     this._getSavingsAccount()
    //         .subscribe((acc: savingsAccount[]) => {
    //             this.savAcc = acc;
    //             this.getSavAccSubject.next(acc);
    //         })
    // }


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
