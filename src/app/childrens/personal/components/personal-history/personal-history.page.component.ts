import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../../login/services/people.service';
import { PersonalHistoryService } from '../../services/personal-history.service';
import { ICommonHistory } from '../../interfaces/ICommonHistory';
import { FondCardsService } from '../../services/fond-cards.service';

@Component({
    selector: 'history',
    templateUrl: './personal-history.page.component.html',
    styleUrls: ['./personal-history.page.component.scss']
})
export class PersonalHistoryPageComponent implements OnInit {
    public cardsHistory!: ICommonHistory[];
    public selectedCard?: ICommonHistory;

    constructor(private _personalHistoryService: PersonalHistoryService, private _fondCardsService: FondCardsService,) {
        this.getTransactionsHistory();
    }

    public ngOnInit(): void {
        //
    }

    public clickCard(card: ICommonHistory): void {
        this.selectedCard = card;
        document.getElementById('modal-1')!.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modalOpen');
    }

    public closeModel(): void {
        document.getElementById('modal-1')!.style.display = 'none';
        document.body.style.overflow = 'visible';
        document.body.classList.remove('modalOpen');
    }

    public repeatOperation(): void {
        this.closeModel();

    }

    private getTransactionsHistory(): void {
        this._personalHistoryService.getUserHistory()
            .subscribe(
                (elements: ICommonHistory[]) => {
                    this.cardsHistory = elements;
                },
            );
    }
}
