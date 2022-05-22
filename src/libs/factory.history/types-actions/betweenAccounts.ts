import { ICommon } from '../interfaces/ICommon.interface';
import { ICardView } from '../interfaces/ICardView.interface';
import { IBetweenAccount } from '../interfaces/IBetweenAccount.interface';
import { ICard } from '../../../app/components/spa/interfaces/ICard.interface';

export class BetweenAccounts implements ICommon {
    public date: Date | number = Date.now();
    public fromWhom: string = 'between accounts';

    public whatAccountName!: string;

    //Скакой списали
    public interactionWhichAccount: ICardView;
    public operationName: string = 'Translations';
    public transferAmount: string;
    public urlMyHistory: string = 'http://localhost:3000/history';
    public card!: ICard;
    public typeTransaction: string = 'betweenAccounts';

    constructor(
        whatAccountName: string,
        transferAmount: string,
        card: ICard,
        myId: number,
    ) {

        this.whatAccountName = whatAccountName;
        this.transferAmount = transferAmount;
        this.card = card;
        this.urlMyHistory = this.urlMyHistory + myId;
        this.interactionWhichAccount =
            {
                'card': this.card,
                'textOperation': 'From card account',
            };
    }


    public createForm(): IBetweenAccount {
        return {
            'fromWhom': this.fromWhom,
            'whatAccountName': this.whatAccountName,
            'operationName': this.operationName,
            'transferAmount': this.transferAmount,
            'date': this.date,
            'interactionWhichAccount': this.interactionWhichAccount,
            'typeTransaction': this.typeTransaction
        };
    }
}

//todo: здесь в разметке нцжно будет сделать возможность повтора операции
