import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../../login/services/people.service';
import { PersonalHistoryService } from '../../services/personal-history.service';
import { ICommonHistory } from '../../interfaces/ICommonHistory';

@Component({
    selector: 'history',
    templateUrl: './personal-history.page.component.html',
    styleUrls: ['./personal-history.page.component.scss']
})
export class PersonalHistoryPageComponent implements OnInit {
    public cardsHistory!: ICommonHistory[];

    constructor(private _personalHistoryService: PersonalHistoryService) {
        this.getTransactionsHistory();
    }

    public ngOnInit(): void {
        //
    }

    public clickCard(card: any): void{
        console.log(card);
        document.getElementById('modal-1')!.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modalOpen');
    }

    public closeModel(): void {
        document.getElementById('modal-1')!.style.display = 'none';
        document.body.style.overflow = 'visible';
        document.body.classList.remove('modalOpen');
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
