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

    private getTransactionsHistory(): void {
        this._personalHistoryService.getUserHistory()
            .subscribe(
                (elements: ICommonHistory[]) => {
                    this.cardsHistory = elements;
                    console.log('i get history');
                },
            );
    }

}
