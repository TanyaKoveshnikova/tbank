import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PersonalMainPageComponent } from '../personal-main-page/personal-main-page.component';

@Component({
    selector: 'app-advertising',
    templateUrl: './personal-advertising.component.html',
    styleUrls: ['./personal-advertising.component.scss']
})
export class PersonalAdvertisingComponent implements OnInit {
    constructor(private _personalMainPageComponent:PersonalMainPageComponent) {
        //
    }

    public ngOnInit(): void {
        //
    }

    public clearAdvertising(): void{
        this._personalMainPageComponent.onChanged();
    }

}
