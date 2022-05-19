import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-personal-main-page-new-card',
    templateUrl: './personal-main-page-new-card.component.html',
    styleUrls: ['./personal-main-page-new-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalMainPageNewCardComponent implements OnInit {
    public newCardForm: FormGroup = new FormGroup({});
    public idUser?: number;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
