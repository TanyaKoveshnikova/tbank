import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Router } from '@angular/router';
import { PaymentsBetweenAccountsComponent } from '../payments-between-accounts/payments-between-accounts.component';
import { FondCardsService } from '../../../../personal/services/fond-cards.service';
import { Observable, tap } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { amountValidator } from '../../../validators/amountValidator';
import { CheckClientCardService } from '../../../services/check-client-card.service';
import { ICard } from '../../../../spa/interfaces/ICard';
import { ISavingsAccount } from '../../../../spa/interfaces/ISavingsAccount';
import { FactoryCardHistory } from '../../../../../../libs/factory.history/factory';
import { IUser } from '../../../../spa/interfaces/IUser';
import { PeopleService } from '../../../../login/services/people.service';
import { SingletonService } from '../../../../spa/services/singleton.service';


@Component({
    selector: 'app-filling-details',
    templateUrl: './payment-between-filling-details.component.html',
    styleUrls: ['./payment-between-filling-details.component.scss']
})
export class PaymentBetweenFillingDetailsComponent implements OnInit, OnDestroy {
    public savingAccounts$?: Observable<ISavingsAccount[]>;
    public date: Date | number = Date.now();
    public userCard?: ICard;
    public reactiveForm: FormGroup = new FormGroup({});

    //выбранная карта для перевода на нее денег с основного счета
    public selectedValue?: ISavingsAccount;

    private _rubNumberUser!: number;


    constructor(
        private _paymBetAccComp: PaymentsBetweenAccountsComponent,
        private _router: Router,
        private _fondCardsService: FondCardsService,
        private _builder: FormBuilder,
        private _fb: FormBuilder,
        private _checkClientCardService: CheckClientCardService,
        private _factoryCardHistory: FactoryCardHistory,
        private _peopleService: PeopleService,
        private _singletonService: SingletonService,
    ) {
        this._paymBetAccComp.toggleClass('filling');
        this.savingAccounts$ = _fondCardsService.getSavingsAccount();
        this.userCard = _fondCardsService.getFirstCardUser();
    }

    public ngOnDestroy(): void {
        this._paymBetAccComp.toggleClass('filling');
    }

    public ngOnInit(): void {
        this.createForm();
        if (this.userCard?.RUB) {
            this._rubNumberUser = this._checkClientCardService.transformMoneyInNumber(this.userCard?.RUB);
        }
    }

    public clickConfirmation(): void {
        const valueMoney: number = this.f['sum'].value;
        if (this._rubNumberUser && this.selectedValue?.doneRUB && this.selectedValue.id) {
            const endMoneyUser: number = this._rubNumberUser - valueMoney;
            this._checkClientCardService.patchMinusSumUser(endMoneyUser);

            const savAccMoneyNumber: number = this._checkClientCardService.transformMoneyInNumber(this.selectedValue?.doneRUB);
            const endMoneySavAcc: number = savAccMoneyNumber + valueMoney;
            this._checkClientCardService.changeSumSavAccount(endMoneySavAcc, this.selectedValue.id);
            this._checkClientCardService.nameSavAccount = this.selectedValue.name;
            if (this._fondCardsService.userService) {
                this._factoryCardHistory.createCard(
                    'betweenAccounts',
                    this._fondCardsService.userService,
                    valueMoney,
                    undefined,
                    this.selectedValue.name);
            }
        }
    }

    public get f(): { [p: string]: AbstractControl } {
        return this.reactiveForm.controls;
    }

    private createForm(): void {
        this.reactiveForm = this._fb.group(
            {
                sum: new FormControl('', [Validators.required])
            },
            {
                validators: amountValidator('sum', this._rubNumberUser),
            });
    }
}
