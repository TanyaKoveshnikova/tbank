import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'skeletone-loading',
    templateUrl: './skeletone-loading.component.html',
    styleUrls: ['./skeletone-loading.component.scss']
})
export class SkeletoneLoadingComponent implements OnInit {
    @Input()
    public width: string = <string>'1rem';
    @Input()
    public height: string = <string>'1rem';
    @Input()
    public circle: boolean = <boolean>false;

    constructor() {
        //
    }

    public ngOnInit(): void {
    }

    public getMyStyles(): IStyles {
        return {
            'width': this.width !== '1rem' ? this.width : '',
            'height': this.height !== '1rem' ? this.height : '',
            'borderRadius': this.circle ? '50%' : ''
        };
    }
}

interface IStyles {
    'width': string,
    'height': string,
    'borderRadius': string,
}


