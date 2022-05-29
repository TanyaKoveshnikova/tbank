import { Injectable } from '@angular/core';
import { Observable, publishReplay, refCount } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IInformationNewCard } from '../interfaces/IInformationNewCard.interface';
import { PeopleService } from '../../login/services/people.service';
import { FondCardsService } from './fond-cards.service';
import { ICard } from '../../spa/interfaces/ICard.interface';

@Injectable({
    providedIn: 'root'
})
export class GetDataService {
    private _informationNewCard?: Observable<IInformationNewCard[]>;
    private _urlNewCard: string = <string>'http://localhost:3000/contentNewCard';
    private _urlCreateCard: string = <string>'http://localhost:3000/cardsUsers';

    constructor(private _http: HttpClient, public fondCardsService: FondCardsService,) {
    }

    public getInformationNewCard(): Observable<IInformationNewCard[]> {
        if (!this._informationNewCard) {
            this._informationNewCard = this._http.get<IInformationNewCard[]>(this._urlNewCard)
                .pipe(
                    publishReplay(),
                    refCount(),
                );
        }

        return this._informationNewCard;
    }

    public sendOnServerNewCard(cardName: string, idCreator: number): void {
        const newCard: ICard = {
            cardName: cardName,
            RUB: '0',
            cardNumber: PeopleService.cardNumber(),
            idCreator: idCreator,
        };

        this.postCardUser(newCard)
            .subscribe({
                complete: () => {
                    this.fondCardsService.getCardsUser()
                        .subscribe({
                            next: (cards: ICard[]) => {
                                this.fondCardsService.cardUser$.next(cards);
                            }
                        });
                }
            });
    }

    public postCardUser(card: ICard): Observable<ICard> {
        return this._http.post<ICard>(this._urlCreateCard, card);
    }
}
