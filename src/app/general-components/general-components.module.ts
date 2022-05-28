import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiddleButtonComponent } from './components/middle-button/middle-button.component';
import { SkeletoneLoadingComponent } from './components/skeletone-loading/skeletone-loading.component';


@NgModule({
    declarations: [
        MiddleButtonComponent,
        SkeletoneLoadingComponent
    ],
    exports: [
        MiddleButtonComponent,
        SkeletoneLoadingComponent
    ],
    imports: [
        CommonModule
    ]
})
export class GeneralComponentsModule {
}
