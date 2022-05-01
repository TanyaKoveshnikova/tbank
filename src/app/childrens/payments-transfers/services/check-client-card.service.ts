import { Injectable } from '@angular/core';
import { FondCardsService } from '../../personal/services/fond-cards.service';
import { map, Observable } from 'rxjs';
import { IUser } from '../../spa/interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { ICard } from '../../spa/interfaces/ICard';
import { FactoryCardHistory } from '../../../../libs/factory.history/factory';
import { PeopleService } from '../../login/services/people.service';


@Injectable({
    providedIn: 'root',
})
export class CheckClientCardService {
    private static formattingMoney(needFormatNumber: number): string {
        return new Intl.NumberFormat('ru-RU').format(needFormatNumber);
    }

    public nameSavAccount?: string;
    public transferAmount!: number;
    public clientCardNumber: string | undefined;
    public client: IUser | undefined;
    public user?: IUser;
    // eslint-disable-next-line @typescript-eslint/typedef
    private _urlCount = 'http://localhost:3000/signupUsers';
    // eslint-disable-next-line @typescript-eslint/typedef
    private _urlSavAccount = 'http://localhost:3000/savingsAcc';

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

    public findClient(): Observable<IUser> {
        return this._fondCardsService.getNeedUserParams()
            .pipe(
                map((user: IUser[]): IUser => {
                    return user.filter((u: IUser) =>
                        u.cards.find((card: ICard) => card.cardNumber === this.clientCardNumber))[0];
                })
            );
    }

    public patchPlusSumClient(moneyPlusSum: number, clientCardName: string): void {
        const url: string = this._urlCount + '/' + this.client?.id;
        const money: string = CheckClientCardService.formattingMoney(moneyPlusSum);
        this._http.patch<never>(url, {
            'cards': [{
                'cardName': clientCardName,
                'RUB': money,
                'cardNumber': this.clientCardNumber
            }]
        }).subscribe(
            () => {
                //
            },
            () => {
                //
            },
            () => {
            }
        );
    }

    public patchMinusSumUser(moneyMinusSum: number): void {
        const url: string = this._urlCount + '/' + this.user?.id;
        const money: string = CheckClientCardService.formattingMoney(moneyMinusSum);
        this._http.patch<never>(url, {
            'cards': [{
                'cardName': this.user?.cards[0].cardName,
                'RUB': money,
                'cardNumber': this.user?.cards[0].cardNumber
            }]
        }).subscribe(
            () => {
                //
            },
            () => {
                //
            },
            () => {
                this._peopleService.getLoginUser();
            });
    }


    public changeSumSavAccount(newCountMoney: number, idSavCard: number): void {
        const url: string = this._urlSavAccount + '/' + idSavCard;
        const money: string = CheckClientCardService.formattingMoney(newCountMoney);
        this._http.patch<never>(url,
            {
                'doneRUB': money,
            }).subscribe(
            () => {
                //
            },
            () => {
                //
            },
            () => {
                this._peopleService.getLoginUser();
            });
    }
}

