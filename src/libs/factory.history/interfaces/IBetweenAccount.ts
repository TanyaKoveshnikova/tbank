import { ICardView } from './ICardView';
import { ICommon } from './ICommon';

export interface IBetweenAccount extends ICommon{
    'fromWhom': string,
    'whatAccountName': string,
    'transferAmount': string,
    'date': Date | number,
    'interactionWhichAccount': ICardView,
    'operationName': string,
    'id'?: number,
}
