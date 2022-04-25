import { ICommon } from './interfaces/ICommon';
import { ICardView } from './interfaces/ICardView';
import { ICard } from '../../spa/interfaces/ICard';
import { SendCardHistory } from './data/sendCardHistory';
import { IUser } from '../../spa/interfaces/IUser';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class FactoryCardHistory {
    private static formattingMoney(needFormatNumber: number): string {
        return new Intl.NumberFormat('ru-RU').format(needFormatNumber);
    }

    constructor(private _sendCardHistory: SendCardHistory) {
    }

    public createCard(type: string, user: IUser, transferAmount: number, client: IUser): void {
        if (type === 'fromSomeone') {
            const senderName: string = user.name + ' ' + user.surname;
            const moneyTransfer: string  = FactoryCardHistory.formattingMoney(transferAmount);
            const createdClass: any = new FromSomeone(senderName, moneyTransfer, client.cards[0], client.id);
            const bodyRequest: any = createdClass.createForm();
            this._sendCardHistory.postFromSomeone(createdClass.urlMyHistory, bodyRequest);
        }
    }
}

class FromSomeone implements ICommon {
    public date: Date | number = Date.now();
    public fromWhom: string;

    //На какой счет положили
    public interactionWhichAccount: ICardView;
    public operationName: string;
    public transferAmount: string;
    // eslint-disable-next-line @typescript-eslint/typedef
    public urlMyHistory = 'http://localhost:3000/history';
    public card!: ICard;

    constructor(
        fromWhom: string,
        transferAmount: string,
        card: ICard,
        myId: number,
    ) {

        this.fromWhom = fromWhom;
        this.transferAmount = transferAmount;
        this.card = card;
        this.operationName = 'Refill';
        this.urlMyHistory = this.urlMyHistory + myId;
        this.interactionWhichAccount =
            {
                'card': this.card,
                'textOperation': 'To the card account',
            };
    }


    public createForm(): ICommon {
        return {
            'fromWhom': this.fromWhom,
            'operationName': this.operationName,
            'transferAmount': this.transferAmount,
            'date': this.date,
            'interactionWhichAccount': this.interactionWhichAccount,
        };
    }
}
