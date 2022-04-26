import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletoneLoadingComponent } from './skeletone-loading/skeletone-loading.component';


@NgModule({
    declarations: [SkeletoneLoadingComponent],
    exports: [
        SkeletoneLoadingComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SkeletoneLoadingModule {
}
