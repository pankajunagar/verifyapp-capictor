import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AgoFilter } from './pipes/agofilter';
import { CreateNoticeComponent } from './modals/create-notice/create-notice.component';
var ApplicationPageModule = /** @class */ (function () {
    function ApplicationPageModule() {
    }
    ApplicationPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule
            ],
            declarations: [
                AgoFilter,
                CreateNoticeComponent
            ],
            entryComponents: [],
            exports: [
                AgoFilter,
                CreateNoticeComponent
            ]
        })
    ], ApplicationPageModule);
    return ApplicationPageModule;
}());
export { ApplicationPageModule };
//# sourceMappingURL=ApplicationPageModule.js.map