import {
    Component, ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef,

} from '@angular/core';
import { IUser } from '../../../spa/interfaces/IUser.interface';
import { FondCardsService } from '../../services/fond-cards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ISavingsAccount } from '../../../spa/interfaces/ISavingsAccount.interface';
import { PeopleService } from '../../../login/services/people.service';
import { GeneralService } from '../../../spa/services/general.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PersonalAdvertisingComponent } from '../personal-advertising/personal-advertising.component';
import { ICard } from '../../../spa/interfaces/ICard.interface';
import { CheckClientCardService } from '../../../payments-transfers/services/check-client-card.service';


@Component({
    selector: 'main-page',
    templateUrl: './personal-main-page.component.html',
    styleUrls: ['./personal-main-page.component.scss']
})
export class PersonalMainPageComponent implements OnInit {
    public user?: IUser;
    public savCardsObs$?: BehaviorSubject<ISavingsAccount[] | null>;
    public cardsUser$?: BehaviorSubject<ICard[] | null>;
    public loaded: boolean = <boolean> false;

    @ViewChild('advertising', { read: ViewContainerRef })
    private _viewRef?: ViewContainerRef;
    private _componentRef?: ComponentRef<PersonalAdvertisingComponent>;

    constructor(
        public fondCardsService: FondCardsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _peopleService: PeopleService,
        private _singletoneService: GeneralService,
        private _breadcrumbService: BreadcrumbService,
        private _checkClientCardService: CheckClientCardService,
    ) {
    }

    public ngOnInit(): void {
        this._singletoneService.loggedUser
            .subscribe({
                next: (user: IUser) => this.user = user,
                complete: () => this.loaded = true,
            });
        this._breadcrumbService.set('@MainPage', 'Main Page');
        this.fondCardsService.getSavingsAccount()
            .subscribe({
                next: (acc: ISavingsAccount[]) => {
                    this.fondCardsService.savAcc$.next(acc);
                    this.savCardsObs$ = this.fondCardsService.savAcc$;
                }
            });

        this.fondCardsService.getCardsUser()
            .subscribe({
                next: (cards: ICard[]) => {
                    this.fondCardsService.cardUser$.next(cards);
                    this.cardsUser$ = this.fondCardsService.cardUser$;
                }
            });


        this.user = this.fondCardsService.userService;

        setTimeout(() => {
            if (this._viewRef) {
                this._componentRef = this._viewRef.createComponent(PersonalAdvertisingComponent);
            }
        }, 3000);
    }

    public closeModelBackground(): void {
        this._router.navigate(['../personal-main-page'], { relativeTo: this._route });
    }

    public createSavingsAcc(event: Event): void {
        event.stopPropagation();
        this._router.navigate(['./createSavingsAccount'], { relativeTo: this._route });
    }

    public createCard(event: Event): void {
        event.stopPropagation();
        this._router.navigate(['./createNewCard'], { relativeTo: this._route });
    }

    public closeCard(event: Event, card: ISavingsAccount): void{
        this.fondCardsService.chosenSavingAccClose = card;
        event.stopPropagation();
        this._router.navigate(['./closeCard'], { relativeTo: this._route });
    }

    public onChanged(): void {
        this._viewRef?.clear();
        setTimeout(() => {
            if (this._viewRef) {
                this._componentRef = this._viewRef.createComponent(PersonalAdvertisingComponent);
            }
        }, 3000);
    }

    public doNumber(str: string): number{
        return this._checkClientCardService.transformMoneyInNumber(str);
    }
}

//todo: доделать подгрузку карты при обновлении страницы
