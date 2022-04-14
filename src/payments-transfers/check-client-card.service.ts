import { Injectable } from '@angular/core';
import { FondCardsService } from '../personal/fond-cards.service';
import { map, Observable } from 'rxjs';
import { cards, IUser } from '../spa/interfaces';

@Injectable({
    providedIn: 'root'
})
export class CheckClientCardService {
    public clientCardNumber: string | undefined;

    constructor(private _fondCardsService: FondCardsService) {
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
}
