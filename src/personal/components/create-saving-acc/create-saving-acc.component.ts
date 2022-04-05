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
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FondCardsService} from "../../fond-cards.service";
import {MainPageComponent} from "../main-page/main-page.component";
import {Observable} from "rxjs";
import {ComponentCanDeactivate} from "../../../spa/providers/exit.about.guard";

@Component({
    selector: 'create-saving-acc',
    templateUrl: './create-saving-acc.component.html',
    styleUrls: ['./create-saving-acc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSavingAccComponent implements OnInit, ComponentCanDeactivate {
    private _saved: boolean = false;
    public savingsAccForm: FormGroup = new FormGroup({});

    constructor(private _http: HttpClient, private _router: Router, private _fondCardsService: FondCardsService,
                private _renderer: Renderer2, private _compMain: MainPageComponent, private ngZone: NgZone) {
        this._createForm();
    }

    ngOnInit(): void {
    }

    canDeactivate(): boolean | Observable<boolean> {
        if(!this._saved){
            return confirm("Вы хотите покинуть страницу?");
        }
        else{
            return true;
        }
    }

    private _createForm() {
        this.savingsAccForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required]),
            goalRUB: new FormControl('', [Validators.required]),
        })
    }

    public onSubmit() {
        this._fondCardsService.sendOnServerSavingAcc(this.savingsAccForm);
        this._saved = true;
        this._router.navigate(['/personal/' + this._fondCardsService.id + '/main-page']);
    }

    public onSer() {
        setTimeout(() => {
            this._compMain.savCardsObs = this._fondCardsService._getSavingsAccount()
        }, 1)
    }
}
