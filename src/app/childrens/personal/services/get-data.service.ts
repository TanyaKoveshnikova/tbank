import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from '../../spa/interfaces/ICard';
import { HttpClient } from '@angular/common/http';
import { IInformationNewCard } from '../interfaces/IInformationNewCard';
import { FormGroup } from '@angular/forms';
import { PeopleService } from '../../login/services/people.service';
import { FondCardsService } from './fond-cards.service';

@Injectable({
    providedIn: 'root'
})
export class GetDataService {

    private _urlNewCard: string = 'http://localhost:3000/contentNewCard';
    private _urlCreateCard: string = 'http://localhost:3000/cardsUsers';

    constructor(private _http: HttpClient,public fondCardsService: FondCardsService,) {
    }

    public getInformationNewCard(): Observable<IInformationNewCard[]>{
        return this._http.get<IInformationNewCard[]>(this._urlNewCard);
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
