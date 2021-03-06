import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentsBetweenAccountsComponent } from '../payments-between-accounts/payments-between-accounts.component';
import { FondCardsService } from '../../../../personal/services/fond-cards.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckClientCardService } from '../../../services/check-client-card.service';
import { ISavingsAccount } from '../../../../spa/interfaces/ISavingsAccount.interface';
import { FactoryCardHistory } from '../../../../../../libs/factory.history/factory';
import { PeopleService } from '../../../../login/services/people.service';
import { GeneralService } from '../../../../spa/services/general.service';
import { ICard } from '../../../../spa/interfaces/ICard.interface';


@Component({
    selector: 'app-filling-details',
    templateUrl: './payment-between-filling-details.component.html',
    styleUrls: ['./payment-between-filling-details.component.scss']
})
export class PaymentBetweenFillingDetailsComponent implements OnInit, OnDestroy {
    public savingAccounts$?: BehaviorSubject<ISavingsAccount[] | null>;
    public cardUser$?: BehaviorSubject<ICard[] | null>;
    public date: Date | number = Date.now();
    public reactiveForm: FormGroup = new FormGroup({});

    //выбранная карта для перевода на нее денег с основного счета
    public selectedValue?: ISavingsAccount;

    //счет списания(с какой карты списывать)
    public selectedCard!: ICard;



    constructor(
        private _paymBetAccComp: PaymentsBetweenAccountsComponent,
        private _router: Router,
        private _fondCardsService: FondCardsService,
        private _builder: FormBuilder,
        private _fb: FormBuilder,
        private _checkClientCardService: CheckClientCardService,
        private _factoryCardHistory: FactoryCardHistory,
        private _peopleService: PeopleService,
        private _singletonService: GeneralService,
    ) {
        this._paymBetAccComp.toggleClass('filling');
        if(_fondCardsService.savAcc$){
            this.savingAccounts$ = _fondCardsService.savAcc$;
        }
        if(_fondCardsService.cardUser$){
            this.cardUser$ = _fondCardsService.cardUser$;
        }
    }

    public ngOnDestroy(): void {
        this._paymBetAccComp.toggleClass('filling');
    }

    public ngOnInit(): void {
        this.createForm();
    }

    public clickConfirmation(): void {
        const valueMoney: number = this.f['sum'].value;
        if (this.selectedValue?.doneRUB && this.selectedValue.id && this.selectedCard.id) {
            const endMoneyUser: number = this._checkClientCardService.transformMoneyInNumber(this.selectedCard.RUB) - valueMoney;
            this._checkClientCardService.patchAmountMoneyOnCardUser(endMoneyUser, this.selectedCard.id);

            const savAccMoneyNumber: number = this._checkClientCardService.transformMoneyInNumber(this.selectedValue?.doneRUB);
            const endMoneySavAcc: number = savAccMoneyNumber + valueMoney;
            this._checkClientCardService.changeSumSavAccount(endMoneySavAcc, this.selectedValue.id);
            this._checkClientCardService.nameSavAccount = this.selectedValue.name;
            if (this._fondCardsService.userService) {
                this._factoryCardHistory.createCard(
                    'betweenAccounts',
                    this._fondCardsService.userService,
                    valueMoney,
                    this.selectedCard,
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
            },);
    }
}
