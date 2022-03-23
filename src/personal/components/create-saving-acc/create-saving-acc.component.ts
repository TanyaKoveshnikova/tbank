import {Component, OnInit, Renderer2} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PeopleService} from "../../../login/people.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'create-saving-acc',
    templateUrl: './create-saving-acc.component.html',
    styleUrls: ['./create-saving-acc.component.scss']
})
export class CreateSavingAccComponent implements OnInit {
    public savingsAcc: FormGroup = new FormGroup({});

    constructor(private _http: HttpClient, private _router: Router, private _peopleService: PeopleService,
                private _renderer: Renderer2) {
        this._createForm();
    }

    ngOnInit(): void {
    }

    private _createForm() {
        this.savingsAcc = new FormGroup({
            name: new FormControl(''),
            endDate: new FormControl(''),
            goalRUB: new FormControl(''),
        })
    }

    public onSubmit() {
        console.log('отправлена форма из create-saving.comp');

    }

}
