import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Renderer2
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FondCardsService } from '../../../../services/fond-cards.service';
import { PersonalMainPageComponent } from '../../personal-main-page.component';
import { Observable } from 'rxjs';
import { componentCanDeactivate, ExitAboutGuard } from '../../../../../spa/guards/exit.about.guard';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'create-saving-acc',
    templateUrl: './personal-main-page-saving-account.component.html',
    styleUrls: ['./personal-main-page-saving-account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalMainPageSavingAccountComponent implements OnInit, ExitAboutGuard {
    public savingsAccForm: FormGroup = new FormGroup({});
    public idUser?: number;

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _fondCardsService: FondCardsService,
        private _renderer: Renderer2,
        private _compMain: PersonalMainPageComponent,
        private _breadcrumbService: BreadcrumbService,
    ) {
        this.createForm();
        if (this._fondCardsService.userService) {
            this.idUser = this._fondCardsService.userService.id;
        }
    }

    public ngOnInit(): void {
        this._breadcrumbService.set('@CreateSavingsAccount', 'Create Savings Account');
    }

    public canDeactivate(): boolean | Observable<boolean> {
        if (this.savingsAccForm.dirty && this.savingsAccForm.invalid) {
            return confirm('Вы хотите покинуть страницу?');
        } else {
            return true;
        }
    }

    public onSubmit(): void {
        this._fondCardsService.sendOnServerSavingAcc(this.savingsAccForm);
        this._router.navigate(['/personal/' + this.idUser + '/personal-main-page']);
    }

    public onSer(): void {
        setTimeout(() => {
            this._compMain.ngOnInit();
        }, 1);
    }

    private createForm(): void {
        this.savingsAccForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required]),
            goalRUB: new FormControl('', [Validators.required]),
        });
    }
}
