import { Component, OnInit, Input } from '@angular/core';

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

    public getMyStyles(): any {
        const myStyles: any = {
            'width': this.width !== '1rem' ? this.width : '',
            'height': this.height !== '1rem' ? this.height : '',
            'border-radius': this.circle ? '50%' : ''
        };

        return myStyles;
    }
}


