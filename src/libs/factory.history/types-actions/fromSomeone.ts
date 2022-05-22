import { ICommon } from '../interfaces/ICommon.interface';
import { ICardView } from '../interfaces/ICardView.interface';
import { ICard } from '../../../app/components/spa/interfaces/ICard.interface';

export class FromSomeone implements ICommon {
    public date: Date | number = Date.now();
    public fromWhom: string;

    //На какой счет положили
    public interactionWhichAccount: ICardView;
    public operationName: string;
    public transferAmount: string;
    // eslint-disable-next-line @typescript-eslint/typedef
    public urlMyHistory = 'http://localhost:3000/history';
    public card!: ICard;
    public typeTransaction: string = 'fromSomeone';

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
            'typeTransaction': this.typeTransaction
        };
    }
}
