import { ChangeDetectionStrategy, Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GetDataService } from '../../../../services/get-data.service';
import { Observable, Subscription } from 'rxjs';
import { IInformationNewCard } from '../../../../interfaces/IInformationNewCard.interface';
import { FondCardsService } from '../../../../services/fond-cards.service';
import { Router } from '@angular/router';
import { AlertifyServiceService } from '../../../../../../services/alertify-service.service';

@Component({
    selector: 'app-personal-main-page-new-card',
    templateUrl: './personal-main-page-new-card.component.html',
    styleUrls: ['./personal-main-page-new-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalMainPageNewCardComponent implements OnInit {
    public arrayNumberImg: number[] = [];
    public informationNewCard$: Observable<IInformationNewCard[]> = new Observable<IInformationNewCard[]>();
    private _idUser?: number;
    private _fixLength: number = 0;
    private _lengthCards: number = 0;
    private _numberActiveCard: number = 0;

    @ViewChild('slide')
    public slide: ElementRef | undefined;

    constructor(
        private _renderer: Renderer2,
        private _getDataService: GetDataService,
        private _fondCardsService: FondCardsService,
        private _router: Router,
        private _alertifyServiceService: AlertifyServiceService,
    ) {
        if (this._fondCardsService.userService) {
            this._idUser = this._fondCardsService.userService.id;
        }
    }

    public ngOnInit(): void {
        this.informationNewCard$ = this._getDataService.getInformationNewCard();

        this._getDataService.getInformationNewCard()
            .subscribe({
                next: (cards: IInformationNewCard[]) => {
                    this._lengthCards = cards.length - 1;
                    this._fixLength = this._lengthCards;
                    let i: number = 0;
                    while (i < cards.length) {
                        this.arrayNumberImg.push(this.randomNumber());
                        i++;
                    }
                }
            });
    }

    public randomNumber(): number {
        return Math.floor(Math.random() * (123 - 1 + 1)) + 1;
    }

    public prevCard(): void {
        if (this._lengthCards !== 0) {
            this._lengthCards--;
            this._numberActiveCard = this._numberActiveCard - 100;
            if (this.slide) {
                this.slide.nativeElement.style.top = this._numberActiveCard + '%';
            }
        }
    }

    public nextCard(): void {
        if (this._lengthCards !== this._fixLength) {
            this._lengthCards++;
            this._numberActiveCard = this._numberActiveCard + 100;
            if (this.slide) {
                this.slide.nativeElement.style.top = this._numberActiveCard + '%';
            }
        }
    }

    public createNewCard(card: any): void {
        this._router.navigate(['personal',this._idUser, 'personal-main-page']);
        this._getDataService.sendOnServerNewCard(card.nameCard, this._fondCardsService.userService.id);
        this._alertifyServiceService.statusAlert = 'success';
        this._alertifyServiceService.subject$.next({
            text: 'You have created a new map.',
            status: 'success',
        });
    }
}
