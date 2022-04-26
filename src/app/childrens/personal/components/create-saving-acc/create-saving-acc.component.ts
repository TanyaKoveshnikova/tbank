import {
    ApplicationRef,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    NgZone,
    OnInit,
    Output,
    Renderer2
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FondCardsService } from '../../services/fond-cards.service';
import { MainPageComponent } from '../main-page/main-page.component';
import { Observable } from 'rxjs';
import { componentCanDeactivate } from '../../../spa/guards/exit.about.guard';

@Component({
    selector: 'create-saving-acc',
    templateUrl: './create-saving-acc.component.html',
    styleUrls: ['./create-saving-acc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSavingAccComponent implements OnInit, componentCanDeactivate {
    public savingsAccForm: FormGroup = new FormGroup({});
    private _saved: boolean | null = false;

    constructor(private _http: HttpClient, private _router: Router, private _fondCardsService: FondCardsService,
        private _renderer: Renderer2, private _compMain: MainPageComponent) {
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
        this._router.navigate(['/personal/' + this._fondCardsService.id + '/main-page']);
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
