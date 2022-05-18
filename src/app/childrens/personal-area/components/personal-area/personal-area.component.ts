import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'personal-area',
    templateUrl: './personal-area.component.html',
    styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {

    constructor( private _breadcrumbService: BreadcrumbService,) {
        //
    }

    public ngOnInit(): void {
        this._breadcrumbService.set('@myArea', 'Personal Area');
    }

}
