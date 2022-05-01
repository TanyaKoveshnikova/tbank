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
import { componentCanDeactivate } from '../../../../../spa/guards/exit.about.guard';

@Component({
    selector: 'create-saving-acc',
    templateUrl: './personal-main-page-saving-account.component.html',
    styleUrls: ['./personal-main-page-saving-account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalMainPageSavingAccountComponent implements OnInit, componentCanDeactivate {
    public savingsAccForm: FormGroup = new FormGroup({});
    private _saved: boolean | null = false;

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _fondCardsService: FondCardsService,
        private _renderer: Renderer2,
        private _compMain: PersonalMainPageComponent,
    ) {
        this.createForm();
    }

    public ngOnInit(): void {
        //
    }

    public canDeactivate(): boolean | Observable<boolean> {
        if (!this._saved) {
            return confirm('Вы хотите покинуть страницу?');
        } else {
            return true;
        }
    }

    public onSubmit(): void {
        this._fondCardsService.sendOnServerSavingAcc(this.savingsAccForm);
        this._saved = true;
        this._router.navigate(['/personal/' + this._fondCardsService.id + '/personal-main-page']);
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
