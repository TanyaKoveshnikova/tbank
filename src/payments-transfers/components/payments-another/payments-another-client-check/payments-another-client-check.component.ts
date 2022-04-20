import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../spa/interfaces';
import { FondCardsService } from '../../../../personal/fond-cards.service';
import { CheckClientCardService } from '../../../check-client-card.service';
import { Observable } from 'rxjs';
import { set } from '@angular/fire/database';

@Component({
    selector: 'payments-another-client-check',
    templateUrl: './payments-another-client-check.component.html',
    styleUrls: ['./payments-another-client-check.component.scss']
})
export class PaymentsAnotherClientCheckComponent implements OnInit {
    public findClient!: IUser;
    public isString: any = true;
    public clientCard: string | undefined;
    // eslint-disable-next-line @typescript-eslint/typedef
    public loaded = false;

    constructor(private _checkClientCardService: CheckClientCardService) {
        //
    }

    public ngOnInit(): void {
        this.findNeedClient();
    }

    private findNeedClient(): void {
        this._checkClientCardService.findClient().subscribe((user: IUser) => {
            if (user.name === undefined) {
                this.isString = true;
            } else {
                this._checkClientCardService.client = user;
                this.findClient = this._checkClientCardService.client;
                this.clientCard = this._checkClientCardService.clientCardNumber;
                this.isString = false;
                this.loaded = true;
            }
        });
    }
}
