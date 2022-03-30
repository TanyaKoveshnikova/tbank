import {Component, EventEmitter, OnInit, Output, Renderer2} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PeopleService} from "../../../login/people.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FondCardsService} from "../../fond-cards.service";

@Component({
    selector: 'create-saving-acc',
    templateUrl: './create-saving-acc.component.html',
    styleUrls: ['./create-saving-acc.component.scss']
})
export class CreateSavingAccComponent implements OnInit {
    public savingsAccForm: FormGroup = new FormGroup({});
    @Output() buttonClick = new EventEmitter();

    constructor(private _http: HttpClient, private _router: Router, private _fondCardsService: FondCardsService,
                private _renderer: Renderer2) {
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
        this.buttonClick.emit()
        this._fondCardsService.sendOnServerSavingAcc('F', this.savingsAccForm.value.endDate, 4,this.savingsAccForm);
        this._router.navigate(['/personal/home/1/main-page']);
    }
}
