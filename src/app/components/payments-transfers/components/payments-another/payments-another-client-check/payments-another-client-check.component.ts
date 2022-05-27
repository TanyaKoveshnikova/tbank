import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../spa/interfaces/IUser.interface';
import { FondCardsService } from '../../../../personal/services/fond-cards.service';
import { CheckClientCardService } from '../../../services/check-client-card.service';
import { Observable } from 'rxjs';
import { set } from '@angular/fire/database';

@Component({
    selector: 'payments-another-client-check',
    templateUrl: './payments-another-client-check.component.html',
    styleUrls: ['./payments-another-client-check.component.scss']
})
export class PaymentsAnotherClientCheckComponent implements OnInit {
    public findClient!: IUser;
    public isString: boolean = true;
    public clientCard: string | undefined;
    public loaded: boolean = false;

    constructor(private _checkClientCardService: CheckClientCardService) {
        //
    }

    public ngOnInit(): void {
        this.findNeedClient();
    }

    public voidFunctions(): void {
        //
    }

    private findNeedClient(): void {
        this._checkClientCardService.findClient()
            .subscribe({
                next: (value: any) => {
                    if (value === undefined) {
                        this.isString = true;
                        this.loaded = true;
                    } else {
                        value
                            .subscribe((user: IUser) => {
                                this._checkClientCardService.client = user;
                                this.findClient = this._checkClientCardService.client;
                                this.clientCard = this._checkClientCardService.clientCardNumber;
                                this.isString = false;
                                this.loaded = true;
                            });
                    }
                }
            });
    }
}
