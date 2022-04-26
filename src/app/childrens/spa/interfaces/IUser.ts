import { ICard } from './ICard';

export interface IUser {
    mail: string;
    password: string;
    name: string,
    surname: string,
    id: number,
    cards: ICard[];
}

