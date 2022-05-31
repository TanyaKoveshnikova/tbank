import { Component, OnInit } from '@angular/core';
import { FondCardsService } from '../../../../services/fond-cards.service';
import { BehaviorSubject } from 'rxjs';
import { ICard } from '../../../../../spa/interfaces/ICard.interface';
import { CheckClientCardService } from '../../../../../payments-transfers/services/check-client-card.service';
import { ISavingsAccount } from '../../../../../spa/interfaces/ISavingsAccount.interface';
import { Router } from '@angular/router';
import { AlertifyServiceService } from '../../../../../../services/alertify-service.service';

@Component({
    selector: 'app-personal-main-page-close-sav-account',
    templateUrl: './personal-main-page-close-sav-account.component.html',
    styleUrls: ['./personal-main-page-close-sav-account.component.scss']
})
export class PersonalMainPageCloseSavAccountComponent implements OnInit {
    public idUser?: number;
    public cardUser$: BehaviorSubject<ICard[] | null> = new BehaviorSubject<ICard[] | null>(null);
    //на какую карту добавлять
    public selectedCard!: ICard;
    //КАКУю КАРТУ ЗАКРЫВАЕМ
    private _savingAccount!: ISavingsAccount;

    constructor(
        private _fondCardsService: FondCardsService,
        private _checkClientCardService: CheckClientCardService,
        private _router: Router,
        private _alertifyServiceService: AlertifyServiceService,
    ) {
        if (this._fondCardsService.userService) {
            this.idUser = this._fondCardsService.userService.id;
        }
    }

    public ngOnInit(): void {
        this.cardUser$ = this._fondCardsService.cardUser$;
        this._savingAccount = this._fondCardsService.chosenSavingAccClose;
    }

    public handleClick(event: Event): void {
        event.stopPropagation();
    }


    public sendOnServer(): void {
        if (this.selectedCard.id && this._savingAccount.id) {
            const endMoneyUser: number = this._checkClientCardService.transformMoneyInNumber(this.selectedCard.RUB) + this._checkClientCardService.transformMoneyInNumber(this._savingAccount.doneRUB);
            this._checkClientCardService.patchAmountMoneyOnCardUser(endMoneyUser, this.selectedCard.id);
            this._checkClientCardService.deleteSavingAccount(this._savingAccount.id);
            this._router.navigate(['/personal/' + this.idUser + '/personal-main-page']);
            this._alertifyServiceService.makeNewAlert().next({
                text: 'You have closed your savings account.',
                status: 'success',
            });
        }
    }
}
