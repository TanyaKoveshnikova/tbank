import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentsBetweenAccountsComponent } from '../payments-between-accounts/payments-between-accounts.component';
import { CheckClientCardService } from '../../../check-client-card.service';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

    public nameSavAccount: string | undefined;
    public idUser: number | undefined;

    constructor(private _paymBetAccComp: PaymentsBetweenAccountsComponent, private _checkClientCardService: CheckClientCardService,) {
        this._paymBetAccComp.toggleClass('confirmation');
        this.idUser = _checkClientCardService.user?.id;
    }

    public ngOnInit(): void {
        this.nameSavAccount = this._checkClientCardService.nameSavAccount;
    }

    public ngOnDestroy(): void {
        this._paymBetAccComp.toggleClass('confirmation');
    }

}
