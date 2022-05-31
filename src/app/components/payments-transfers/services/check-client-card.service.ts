import { Injectable } from '@angular/core';
import { FondCardsService } from '../../personal/services/fond-cards.service';
import { map, Observable } from 'rxjs';
import { IUser } from '../../spa/interfaces/IUser.interface';
import { HttpClient } from '@angular/common/http';
import { PeopleService } from '../../login/services/people.service';
import { ICard } from '../../spa/interfaces/ICard.interface';


@Injectable()
export class CheckClientCardService {
    private static formattingMoney(needFormatNumber: number): string {
        return new Intl.NumberFormat('ru-RU').format(needFormatNumber);
    }

    public findCardClientForTransitions?: ICard;
    public nameSavAccount?: string;
    public transferAmount!: number;
    public clientCardNumber: string | undefined;
    public client: IUser | undefined;
    public user!: IUser;
    private _urlCardForTransactions: string = <string>'http://localhost:3000/cardsUsers';
    private _urlSavAccount: string = <string>'http://localhost:3000/savingsAcc';
    private _urlSignupUser: string = <string>'http://localhost:3000/signupUsers';

    constructor(
        private _fondCardsService: FondCardsService,
        private _http: HttpClient,
        private _peopleService: PeopleService,
    ) {
        this.user = _fondCardsService.userService;
    }

    public getTransferAmount(): string {
        return CheckClientCardService.formattingMoney(this.transferAmount);
    }

    public transformMoneyInNumber(moneyString: string): number {
        const rubUser: string = moneyString.replace(' ', '');

        return (parseInt(<string>rubUser));
    }


    public findClient(): Observable<Observable<IUser> | undefined> {
        this.user = this._fondCardsService.userService;

        return this._http.get<ICard[]>(this._urlCardForTransactions)
            .pipe(
                map(
                    (cards: ICard[]) => {
                        const card: ICard | undefined = cards.find((c: ICard) => c.cardNumber === this.clientCardNumber);
                        if (card && card.idCreator !== this.user.id) {
                            this.findCardClientForTransitions = card;

                            return this._http.get<IUser>(this._urlSignupUser + '/' + card.idCreator);
                        } else {
                            return undefined;
                        }
                    }
                ));
    }


    public patchAmountMoneyOnCardUser(moneyMinusSum: number, idCard: number): void {
        const url: string = this._urlCardForTransactions + '/' + idCard;
        const money: string = CheckClientCardService.formattingMoney(moneyMinusSum);
        this._http.patch<never>(url,
            {
                'RUB': money,
            }).subscribe();
    }


    public changeSumSavAccount(newCountMoney: number, idSavCard: number): void {
        const url: string = this._urlSavAccount + '/' + idSavCard;
        const money: string = CheckClientCardService.formattingMoney(newCountMoney);
        this._http.patch<never>(url,
            {
                'doneRUB': money,
            }).subscribe();
    }

    public deleteSavingAccount(idSavCard: number): void {
        const url: string = this._urlSavAccount + '/' + idSavCard;
        this._http.delete(url).subscribe();
    }
}

