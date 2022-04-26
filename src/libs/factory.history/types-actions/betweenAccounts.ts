import { ICommon } from '../interfaces/ICommon';
import { ICardView } from '../interfaces/ICardView';
import { ICard } from '../../../app/childrens/spa/interfaces/ICard';
import { IBetweenAccount } from '../interfaces/IBetweenAccount';

export class BetweenAccounts implements ICommon {
    public date: Date | number = Date.now();
    // eslint-disable-next-line @typescript-eslint/typedef
    public fromWhom = 'between accounts';

    public whatAccountName!: string;

    //Скакой списали
    public interactionWhichAccount: ICardView;
    // eslint-disable-next-line @typescript-eslint/typedef
    public operationName = 'Translations';
    public transferAmount: string;
    // eslint-disable-next-line @typescript-eslint/typedef
    public urlMyHistory = 'http://localhost:3000/history';
    public card!: ICard;

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
        };
    }
}

//todo: здесь в разметке нцжно будет сделать возможность повтора операции
