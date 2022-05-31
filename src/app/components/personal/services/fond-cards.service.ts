import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../spa/interfaces/IUser.interface';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ISavingsAccount } from '../../spa/interfaces/ISavingsAccount.interface';
import { GeneralService } from '../../spa/services/general.service';
import { ICard } from '../../spa/interfaces/ICard.interface';

@Injectable({
    providedIn: 'root'
})
export class FondCardsService implements OnInit {
    private static stringGoalRUB(amount: number): string {
        return new Intl.NumberFormat('ru-RU').format(amount);
    }

    public chosenSavingAccClose!: ISavingsAccount;

    public id?: number;
    //Юзер, чей банк
    public userService!: IUser;
    public savAcc$: BehaviorSubject<ISavingsAccount[] | null> = new BehaviorSubject<ISavingsAccount[] | null>(null);
    public cardUser$: BehaviorSubject<ICard[] | null> = new BehaviorSubject<ICard[] | null>(null);
    private _urlSavingAcc: string = <string>'http://localhost:3000/savingsAcc';
    private _urlCreateCard: string = <string>'http://localhost:3000/cardsUsers';
    private _newSavAcc!: ISavingsAccount;

    //длЯ отрисовки подсказки при наводке
    private _mouseoverExplanation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    constructor(
        private _http: HttpClient,
        public activateRoute: ActivatedRoute,
        private _singletoneService: GeneralService,
    ) {
    }

    public ngOnInit(): void {
        this._singletoneService.loggedUser.subscribe((res: IUser) => this.userService = res);
    }

    public setMouseoverExplanation(state: boolean): void {
        this._mouseoverExplanation.next(state);
    }

    public getMouseoverExplanation(): Observable<boolean> {
        return this._mouseoverExplanation;
    };

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


    //Для выгрузки карт юзера
    public getCardsUser(): Observable<ICard[]> {
        return this._http.get<ICard[]>(this._urlCreateCard + '?idCreator=' + this.id);
    }
    //
    // public getCardsUserAnotherClient(idClient: number): Observable<ICardInterface[]> {
    //     return this._http.get<ICardInterface[]>(this._urlCreateCard + '?idCreator=' + idClient);
    // }

    //Для выгрузки карточек сберегательных счетов
    public getSavingsAccount(): Observable<ISavingsAccount[]> {
        return this._http.get<ISavingsAccount[]>(this._urlSavingAcc + '?idCreator=' + this.id);
    }

    //создыть новую карту
    public createNewCard(): void {
        //
    }

    private postSavingsAcc(): void {
        this._http.post<ISavingsAccount>(this._urlSavingAcc, this._newSavAcc)
            .subscribe({
                complete: () => {
                    this.getSavingsAccount()
                        .subscribe({
                            next: (acc: ISavingsAccount[]) => {
                                this.savAcc$.next(acc);
                            },
                        });
                }
            });
    }
}
