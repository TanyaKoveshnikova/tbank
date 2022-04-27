import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../spa/interfaces/IUser';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, Subscription, switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ICard } from '../../spa/interfaces/ICard';
import { ISavingsAccount } from '../../spa/interfaces/ISavingsAccount';

@Injectable({
    providedIn: 'root'
})
export class FondCardsService implements OnInit {
    private static stringGoalRUB(amount: number): string {
        return new Intl.NumberFormat('ru-RU').format(amount);
    }
    public id?: number;
    //Юзер, чей банк
    public userService?: IUser;
    public getUserSubject$: Subject<IUser> = new Subject<IUser>();
    public savAcc?: ISavingsAccount[];

    // eslint-disable-next-line @typescript-eslint/typedef
    private _urlSignupUser  = 'http://localhost:3000/signupUsers';
    // eslint-disable-next-line @typescript-eslint/typedef
    private _urlSavingAcc= 'http://localhost:3000/savingsAcc';
    private _newSavAcc!: ISavingsAccount;



    constructor(private _http: HttpClient, public activateRoute: ActivatedRoute,) {
    }

    public ngOnInit(): void {
        this.createUsrService();
    }


    //получем первую карту юзера( для списания денег на сохранительные счета )
    public getFirstCardUser(): ICard | undefined{
        return this.userService?.cards[0];
    }

    public sendOnServerSavingAcc(savingsAccForm: FormGroup): void  {
        this._newSavAcc = {
            name: savingsAccForm.value.name,
            endDate: savingsAccForm.value.endDate,
            goalRUB: FondCardsService.stringGoalRUB(savingsAccForm.value.goalRUB),
            doneRUB: '0',
            idCreator: this.id,
        };

        this.postSavingsAcc();
    }


    public getUrlSavingAcc(): Observable<ArrayBuffer> |  Observable<ISavingsAccount[]>{
        return this._http.get<ISavingsAccount[]>(this._urlSavingAcc);
    }

    //Для выгрузки карточек сберегательных счетов
    public getSavingsAccount(): Observable<ISavingsAccount[]> {
        return this._http.get<ISavingsAccount[]>(this._urlSavingAcc + '?idCreator=' + this.id);
    }

    ////////////////////////////////////////////////////

    //Для выгрузки найденного пользователя, после логина
    public getNeedUserParams(): Observable<IUser[]> {
        return this._http.get<IUser[]>(this._urlSignupUser);
    }

    private getUserParams(): Observable<IUser> {
        return this.getNeedUserParams()
            .pipe(
                map((user: IUser[]): IUser => {
                    return user.filter((u:IUser) => u.id === this.id)[0];
                })
            );
    }

    //////////////////////////////////////////////////////

    private postSavingsAcc(): void {
        this._http.post<ISavingsAccount>(this._urlSavingAcc, this._newSavAcc)
            .subscribe(
                () => {
                    //
                });
    }


    private createUsrService(): void {
        this.getUserParams()
            .subscribe((user: IUser) => {
                this.userService = user;
                this.getUserSubject$.next(user);
            });
    }
}