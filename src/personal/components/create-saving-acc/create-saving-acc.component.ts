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
import {FormControl, FormGroup} from "@angular/forms";
import {FondCardsService} from "../../fond-cards.service";
import {MainPageComponent} from "../main-page/main-page.component";

@Component({
    selector: 'create-saving-acc',
    templateUrl: './create-saving-acc.component.html',
    styleUrls: ['./create-saving-acc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSavingAccComponent implements OnInit {
    public savingsAccForm: FormGroup = new FormGroup({});

    @Output() buttonClick = new EventEmitter();

    constructor(private _http: HttpClient, private _router: Router, private _fondCardsService: FondCardsService,
                private _renderer: Renderer2, private _compMain: MainPageComponent, private ngZone: NgZone) {
        this._createForm();
    }

    ngOnInit(): void {

    }

    private _createForm() {
        this.savingsAccForm = new FormGroup({
            name: new FormControl(''),
            endDate: new FormControl(''),
            goalRUB: new FormControl(''),
        })
    }

    public onSubmit() {
        this._fondCardsService.sendOnServerSavingAcc(this.savingsAccForm);
        this._router.navigate(['/personal/home/1/main-page']);
    }
    public onSer(){
        this.buttonClick.emit()
    }
}
