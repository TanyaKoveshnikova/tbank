import { Injectable } from '@angular/core';
import { FondCardsService } from '../../personal/services/fond-cards.service';
import { map, Observable } from 'rxjs';
import { IUser } from '../../spa/interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { ICard } from '../../spa/interfaces/ICard';
import { FactoryCardHistory } from '../../../../libs/factory.history/factory';
import { PeopleService } from '../../login/services/people.service';
import { convertElementSourceSpanToLoc } from '@angular-eslint/template-parser/dist/template-parser/src/convert-source-span-to-loc';


@Injectable({
    providedIn: 'root',
})
export class CheckClientCardService {
    private static formattingMoney(needFormatNumber: number): string {
        return new Intl.NumberFormat('ru-RU').format(needFormatNumber);
    }

    public findCardClientForTransitions?: ICard;
    public nameSavAccount?: string;
    public transferAmount!: number;
    public clientCardNumber: string | undefined;
    public client: IUser | undefined;
    public user?: IUser;
    private _urlCardForTransactions: string = 'http://localhost:3000/cardsUsers';
    private _urlSavAccount: string = 'http://localhost:3000/savingsAcc';
    private _urlSignupUser: string = 'http://localhost:3000/signupUsers';

    constructor(
        private _fondCardsService: FondCardsService,
        private _http: HttpClient,
        private _factoryCardHistory: FactoryCardHistory,
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


    public findClient(): any {

        return this._http.get<ICard[]>(this._urlCardForTransactions)
            .pipe(
                map(
                    (cards: ICard[]) => {
                        const card: ICard | undefined = cards.find((c: ICard) => c.cardNumber === this.clientCardNumber);
                        if (card) {
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
}

