import {
    Component, ComponentFactory,
    ComponentFactoryResolver, ComponentRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output, Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { IUser } from '../../../spa/interfaces/IUser';
import { FondCardsService } from '../../services/fond-cards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ISavingsAccount } from '../../../spa/interfaces/ISavingsAccount';
import { PeopleService } from '../../../login/services/people.service';
import { SingletoneService } from '../../../spa/services/singletone.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PersonalAdvertisingComponent } from '../personal-advertising/personal-advertising.component';


@Component({
    selector: 'main-page',
    templateUrl: './personal-main-page.component.html',
    styleUrls: ['./personal-main-page.component.scss']
})
export class PersonalMainPageComponent implements OnInit, OnDestroy {
    public user?: IUser;
    public savCardsObs?: Observable<ISavingsAccount[]>;
    public loading: Observable<boolean>;

    @ViewChild('advertising', { read: ViewContainerRef })
    private _viewRef?: ViewContainerRef;

    private _componentRef?: ComponentRef<PersonalAdvertisingComponent>;

    constructor(
        private _fondCardsService: FondCardsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _peopleService: PeopleService,
        private _singletoneService: SingletoneService,
        private _breadcrumbService: BreadcrumbService,
        private _viewContainerRef: ViewContainerRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
    ) {
        this.loading = this._singletoneService.flag;
        this.user = this._singletoneService.loggedUser;
    }

    public ngOnInit(): void {
        this._breadcrumbService.set('@MainPage', 'Main Page');
        this._peopleService.getLoginUser();
        this._fondCardsService.ngOnInit();
        this.savCardsObs = this._fondCardsService.getSavingsAccount();
        this.user = this._singletoneService.loggedUser;

        setTimeout(() => {
            if (this._viewRef) {
                const componentFactory: ComponentFactory<PersonalAdvertisingComponent> = this._componentFactoryResolver.resolveComponentFactory(PersonalAdvertisingComponent);
                this._componentRef = this._viewRef.createComponent(componentFactory);
            }
        }, 5000);
    }

    public ngOnDestroy(): void {
        this._singletoneService.changeFlag(false);
    }


    public createSavingsAcc(): void {
        this._router.navigate(['../personal-main-page/createSavingsAccount'], { relativeTo: this._route });
        this.savCardsObs = this._fondCardsService.getSavingsAccount();
    }
}

//todo: доделать подгрузку карты при обновлении страницы
