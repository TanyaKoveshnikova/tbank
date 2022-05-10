import {
    Component, ComponentFactory,
    ComponentFactoryResolver, ComponentRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output, Type,
    ViewChild,
    ViewContainerRef,
    Input,
    HostListener
} from '@angular/core';
import { IUser } from '../../../spa/interfaces/IUser';
import { FondCardsService } from '../../services/fond-cards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ISavingsAccount } from '../../../spa/interfaces/ISavingsAccount';
import { PeopleService } from '../../../login/services/people.service';
import { SingletonService } from '../../../spa/services/singleton.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PersonalAdvertisingComponent } from '../personal-advertising/personal-advertising.component';


@Component({
    selector: 'main-page',
    templateUrl: './personal-main-page.component.html',
    styleUrls: ['./personal-main-page.component.scss']
})
export class PersonalMainPageComponent implements OnInit {
    public user?: IUser;
    public savCardsObs?: Observable<ISavingsAccount[]>;
    // public loading: Observable<boolean>;

    @ViewChild('advertising', { read: ViewContainerRef })
    private _viewRef?: ViewContainerRef;
    private _componentRef?: ComponentRef<PersonalAdvertisingComponent>;

    constructor(
        public fondCardsService: FondCardsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _peopleService: PeopleService,
        private _singletoneService: SingletonService,
        private _breadcrumbService: BreadcrumbService,
    ) {
        this._singletoneService.loggedUser
            .subscribe((user: IUser) => this.user = user);
    }

    public ngOnInit(): void {
        this._breadcrumbService.set('@MainPage', 'Main Page');
        this.fondCardsService.ngOnInit();
        this.savCardsObs = this.fondCardsService.getSavingsAccount();
        this.user = this.fondCardsService.userService;

        setTimeout(() => {
            if (this._viewRef) {
                this._componentRef = this._viewRef.createComponent(PersonalAdvertisingComponent);
            }
        }, 3000);
    }

    public createSavingsAcc(): void {
        this._router.navigate(['../personal-main-page/createSavingsAccount'], { relativeTo: this._route });
        this.savCardsObs = this.fondCardsService.getSavingsAccount();
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
