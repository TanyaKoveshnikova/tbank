import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { amountValidator } from '../../../validators/amountValidator';
import { FondCardsService } from '../../../../personal/services/fond-cards.service';
import { IUser } from '../../../../spa/interfaces/IUser';
import { CheckClientCardService } from '../../../services/check-client-card.service';
import { checkRepeatEmail, confirmedValidator } from '../../../../spa/utils/CustomValidators';
import { ICard } from '../../../../spa/interfaces/ICard';
import { FactoryCardHistory } from '../../../../../../libs/factory.history/factory';
import { PeopleService } from '../../../../login/services/people.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'payments-another-client-sum',
    templateUrl: './payments-another-client-sum.component.html',
    styleUrls: ['./payments-another-client-sum.component.scss']
})
export class PaymentsAnotherClientSumComponent implements OnInit {
    public activeCardMoney!: number;
    public form: FormGroup = new FormGroup({});
    public clientCard: string | undefined;
    public findClient: IUser | undefined;
    public cardsUser$!: BehaviorSubject<ICard[] | null>;
    public iUser!: IUser | undefined;

    //счет списания(с какой карты списывать)
    public selectedCardUser!: ICard;

    constructor(
        private _fondCardsService: FondCardsService,
        private _fb: FormBuilder,
        private _checkClientCardService: CheckClientCardService,
        private _factoryCardHistory: FactoryCardHistory,
        private _peopleService: PeopleService,
    ) {
        this.iUser = _fondCardsService.userService;
        if (_fondCardsService.cardUser$) {
            this.cardsUser$ = _fondCardsService.cardUser$;
        }
        this.clientCard = this._checkClientCardService.clientCardNumber;
        this.findClient = this._checkClientCardService.client;
    }

    public ngOnInit(): void {
        this.createForm();
    }

    public onClickCard(card: any): void {
        this.activeCardMoney = this._checkClientCardService.transformMoneyInNumber(card.target.value);
    }

    public sendMoney(): void {
        const sumTransfer: number = this.form.controls['transferAmount'].value;
        this._checkClientCardService.transferAmount = sumTransfer;
        const cardClient: ICard | undefined = this._checkClientCardService.findCardClientForTransitions;
        if (cardClient && this.findClient && cardClient.id && this.selectedCardUser.id && this.iUser) {
            const moneyOnCardUser: number = parseInt(this.selectedCardUser.RUB.replace(' ', ''));
            const moneyOnCard: number = parseInt(cardClient.RUB.replace(' ', ''));
            const sumTransferDone: number = moneyOnCard + sumTransfer;
            const moneyMinusSum: number = moneyOnCardUser - sumTransfer;
            this._checkClientCardService.patchAmountMoneyOnCardUser(sumTransferDone, cardClient?.id);
            this._factoryCardHistory.createCard('fromSomeone', this.iUser, sumTransfer, this.selectedCardUser, this.findClient);
            this._factoryCardHistory.createCard('withdrawal', this.iUser, sumTransfer, this.selectedCardUser,this.findClient);
            this._checkClientCardService.patchAmountMoneyOnCardUser(moneyMinusSum, this.selectedCardUser.id );
        }
    }

    public get f(): { [p: string]: AbstractControl } {
        return this.form.controls;
    }

    private createForm(): void {
        this.form = this._fb.group(
            {
                transferAmount: new FormControl('', [Validators.required])
            },
            {
                validators: amountValidator('transferAmount', this.activeCardMoney),
            });
    }
}
