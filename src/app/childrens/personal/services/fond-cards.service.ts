import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../spa/interfaces/IUser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject, Subscription, switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ICard } from '../../spa/interfaces/ICard';
import { ISavingsAccount } from '../../spa/interfaces/ISavingsAccount';
import { SingletoneService } from '../../spa/services/singletone.service';

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
    public savAcc?: ISavingsAccount[];
    private _urlSignupUser: string = 'http://localhost:3000/signupUsers';
    private _urlSavingAcc: string = 'http://localhost:3000/savingsAcc';
    private _newSavAcc!: ISavingsAccount;

    //длЯ отрисовки подсказки при наводке
    private  _mouseoverExplanation: any = new BehaviorSubject(false);


    constructor(
        private _http: HttpClient,
        public activateRoute: ActivatedRoute,
        private _singletoneService: SingletoneService,
    ) {
    }

    public ngOnInit(): void {
        // this.userService = this._singletoneService.loggedUser;
        this._singletoneService.loggedUser.subscribe((res: IUser) => this.userService = res);
    }

    public setMouseoverExplanation(state: boolean): void{
        this._mouseoverExplanation.next(state);
    }
    public getMouseoverExplanation(): Observable<boolean> {
        return this._mouseoverExplanation;
    };


    //получем первую карту юзера( для списания денег на сохранительные счета )
    public getFirstCardUser(): ICard | undefined {
        return this.userService?.cards[0];
    }

    public sendOnServerSavingAcc(savingsAccForm: FormGroup): void {
        this._newSavAcc = {
            name: savingsAccForm.value.name,
            endDate: savingsAccForm.value.endDate,
            goalRUB: FondCardsService.stringGoalRUB(savingsAccForm.value.goalRUB),
            doneRUB: '0',
            idCreator: this.id,
        };

        this.postSavingsAcc();
    }


    public getUrlSavingAcc(): Observable<ArrayBuffer> | Observable<ISavingsAccount[]> {
        return this._http.get<ISavingsAccount[]>(this._urlSavingAcc);
    }

    //Для выгрузки карточек сберегательных счетов
    public getSavingsAccount(): Observable<ISavingsAccount[]> {
        return this._http.get<ISavingsAccount[]>(this._urlSavingAcc + '?idCreator=' + this.id);
    }

    public getNeedUserParams(): Observable<IUser[]> {
        return this._http.get<IUser[]>(this._urlSignupUser);
    }

    private postSavingsAcc(): void {
        this._http.post<ISavingsAccount>(this._urlSavingAcc, this._newSavAcc)
            .subscribe(
                () => {
                    //
                });
    }
}
