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


@Component({
    selector: 'main-page',
    templateUrl: './personal-main-page.component.html',
    styleUrls: ['./personal-main-page.component.scss']
})
export class PersonalMainPageComponent implements OnInit {
    public user?: IUser;
    public savCardsObs$?: BehaviorSubject<ISavingsAccount[] | null>;
    public cardsUser$?: BehaviorSubject<ICard[] | null>;
    public loading: boolean = true;

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
    ) {
        this._singletoneService.loggedUser
            .subscribe({
                next: (user: IUser) => this.user = user,
                complete: () => this.loading = false,
            });
    }

    public ngOnInit(): void {
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

    public createSavingsAcc(): void {
        this._router.navigate(['./createSavingsAccount'], { relativeTo: this._route });
    }

    public createCard(): void {
        this._router.navigate(['./createNewCard'], { relativeTo: this._route });
    }

    public onChanged(): void {
        this._viewRef?.clear();
        setTimeout(() => {
            if (this._viewRef) {
                this._componentRef = this._viewRef.createComponent(PersonalAdvertisingComponent);
            }
        }, 3000);
    }
}

//todo: доделать подгрузку карты при обновлении страницы
