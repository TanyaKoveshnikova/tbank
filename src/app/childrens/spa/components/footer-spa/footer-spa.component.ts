import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'footer-spa',
    templateUrl: './footer-spa.component.html',
    styleUrls: ['./footer-spa.component.scss']
})
export class FooterSpaComponent implements OnInit {
    public title: string | null = 'Preparation for the tbank';
    public date: Date | number = Date.now();

    constructor() {
        //
    }

    public ngOnInit(): void {
        //
    }

}
