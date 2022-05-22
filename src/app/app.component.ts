import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AlertifyServiceService } from './services/alertify-service.service';
import { PeopleService } from './components/login/services/people.service';
import { GeneralService } from './components/spa/services/general.service';
import { IUser } from './components/spa/interfaces/IUser.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title: string | null = 'tbank';

    constructor(
        private _peopleService: PeopleService,
        private _singletonService: GeneralService,
    ) {
        this._singletonService.loggedUser = this._peopleService.getLoginUser();
        this._singletonService.loggedUser
            .subscribe();
    }

    public ngOnInit(): void {
        //
    }


}
