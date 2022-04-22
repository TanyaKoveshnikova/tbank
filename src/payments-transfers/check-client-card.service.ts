import { Injectable } from '@angular/core';
import { FondCardsService } from '../personal/fond-cards.service';
import { map, Observable } from 'rxjs';
import { cards, IUser } from '../spa/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CheckClientCardService {
    private static formattingMoney(needFormatNumber: number): string {
        return new Intl.NumberFormat('ru-RU').format(needFormatNumber);
    }

    public transferAmount!: number;
    public clientCardNumber: string | undefined;
    public client: IUser | undefined;
    public user?: IUser;
    // eslint-disable-next-line @typescript-eslint/typedef
    private _urlCount = 'http://localhost:3000/signupUsers';

    constructor(private _fondCardsService: FondCardsService, private _http: HttpClient) {
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
                        u.cards.find((card: cards) => card.cardNumber === this.clientCardNumber))[0];
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
            });
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
            });
    }
}
