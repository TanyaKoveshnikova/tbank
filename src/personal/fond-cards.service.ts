import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, savingsAccount } from '../spa/interfaces';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, Subscription, switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { parse } from '@typescript-eslint/parser';

@Injectable({
    providedIn: 'root'
})
export class FondCardsService implements OnInit {
    private static stringGoalRUB(amount: number): string {
        return new Intl.NumberFormat('ru-RU').format(amount);
    }
    public id?: number;
    public userService?: IUser;
    public getUserSubject: Subject<IUser> = new Subject<IUser>();
    public getSavAccSubject: Subject<savingsAccount[]> = new Subject<savingsAccount[]>();
    public savAcc?: savingsAccount[];

    // eslint-disable-next-line @typescript-eslint/typedef
    private _urlSignupUser  = 'http://localhost:3000/signupUsers';
    // eslint-disable-next-line @typescript-eslint/typedef
    private _urlSavingAcc= 'http://localhost:3000/savingsAcc';
    private _newSavAcc!: savingsAccount;



    constructor(private _http: HttpClient, public activateRoute: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.createUsrService();
        // this.getAllNecessaryAcc();
    }

    public sendOnServerSavingAcc(savingsAccForm: FormGroup): void  {
        this._newSavAcc = {
            name: savingsAccForm.value.name,
            endDate: savingsAccForm.value.endDate,
            goalRUB: FondCardsService.stringGoalRUB(savingsAccForm.value.goalRUB),
            doneRUB: '0',
            idCreator: this.id
        };

        this.postSavingsAcc();
    }


    public getUrlSavingAcc(): Observable<ArrayBuffer> |  Observable<savingsAccount[]>{
        return this._http.get<savingsAccount[]>(this._urlSavingAcc);
    }

    //Для выгрузки карточек сберегательных счетов
    public getSavingsAccount(): Observable<savingsAccount[]> {
        return this._http.get<savingsAccount[]>(this._urlSavingAcc + '?idCreator=' + this.id);
    }

    //Для выгрузки найденного пользователя, после логина
    public getNeedUserParams(): Observable<IUser[]> {
        return this._http.get<IUser[]>(this._urlSignupUser);
    }

    private postSavingsAcc(): void {
        this._http.post<savingsAccount>(this._urlSavingAcc, this._newSavAcc)
            .subscribe(
                () => {
                    //
                });
    }


    // public getAllNecessaryAcc() {
    //     this._getSavingsAccount()
    //         .subscribe((acc: savingsAccount[]) => {
    //             this.savAcc = acc;
    //             this.getSavAccSubject.next(acc);
    //         })
    // }


    private getUserParams(): Observable<IUser> {
        return this.getNeedUserParams()
            .pipe(
                map((user: IUser[]): IUser => {
                    return user.filter((u:IUser) => u.id === this.id)[0];
                })
            );
    }

    private createUsrService(): void {
        this.getUserParams()
            .subscribe((user: IUser) => {
                this.userService = user;
                this.getUserSubject.next(user);
            });
    }


}
