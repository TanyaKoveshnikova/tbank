import { Injectable } from '@angular/core';
import { FondCardsService } from '../personal/fond-cards.service';
import { map, Observable } from 'rxjs';
import { cards, IUser } from '../spa/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CheckClientCardService {
    public clientCardNumber: string | undefined;
    public client: IUser | undefined;
    // eslint-disable-next-line @typescript-eslint/typedef
    private _urlPlusCount = 'http://localhost:3000/signupUsers';

    constructor(private _fondCardsService: FondCardsService, private _http: HttpClient) {
        //
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

    public patchPlusSumClient(moneyPlusSum: number): void {
        const url: string = this._urlPlusCount + '/' + this.client?.id;
        const money: string = this.formattingMoney(moneyPlusSum);
        this._http.patch<any>(url, {
            'RUB': money
        })
            .subscribe(
                () => {
                    console.log('patchPlusSumClient - done!');
                });
    }

    private formattingMoney(needFormatNumber: number): string {
        return new Intl.NumberFormat('ru-RU').format(needFormatNumber);
    }

}
