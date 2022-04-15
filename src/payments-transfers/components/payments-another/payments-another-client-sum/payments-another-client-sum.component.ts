import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { amountValidator } from '../../../validators/amountValidator';
import { FondCardsService } from '../../../../personal/fond-cards.service';
import { cards, IUser } from '../../../../spa/interfaces';

@Component({
    selector: 'payments-another-client-sum',
    templateUrl: './payments-another-client-sum.component.html',
    styleUrls: ['./payments-another-client-sum.component.scss']
})
export class PaymentsAnotherClientSumComponent implements OnInit {
    public iUser!: IUser | undefined;
    public activeCardMoney!: number;
    public form: FormGroup;

    constructor(private _fondCardsService: FondCardsService) {
        this.iUser = _fondCardsService.userService;
        this.form = new FormGroup({
            //нужно вложить числовое значение карты, которая выбрана сейчас
            transferAmount: new FormControl('', [Validators.required, amountValidator(this.activeCardMoney)])
        });
    }

    public ngOnInit(): void {
        //
    }
    //
    // public get activeCardMoney(): any {
    //     // const countryId: any = this.form.controls['transferAmount'].value;
    //     // const strRUB: number = parseInt(countryId.RUB.replace(' ', ''));
    //     // // this.activeCardMoney = strRUB;
    //     // console.log(this.activeCardMoney);
    //     //
    //     // return strRUB;
    // }

    public onClickCard(card: any): void {
        const strRUB: string = card.target.value.replace(' ', '');
        console.log(strRUB);
        this.activeCardMoney = parseInt(strRUB);
        console.log(this.activeCardMoney);
    }
}
