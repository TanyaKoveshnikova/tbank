export interface IUser {
    mail: string;
    password: string;
    name: string,
    surname: string,
    id: number,
    cards: Array<cards>;
}

export interface cards {
    cardName: string,
    RUB: string,
    cardNumber: string
}


