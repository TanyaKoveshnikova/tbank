import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentsBetweenAccountsComponent } from '../payments-between-accounts/payments-between-accounts.component';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

    constructor(private _paymBetAccComp: PaymentsBetweenAccountsComponent) {
        this._paymBetAccComp.toggleClass('confirmation');
    }

    public ngOnInit(): void {
        //
    }

    public ngOnDestroy(): void {
        this._paymBetAccComp.toggleClass('confirmation');
    }

}
