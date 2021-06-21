import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RazorPage } from './razor.page';
var RazorPageModule = /** @class */ (function () {
    function RazorPageModule() {
    }
    RazorPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild([
                    {
                        path: '',
                        component: RazorPage
                    }
                ])
            ],
            declarations: [RazorPage]
        })
    ], RazorPageModule);
    return RazorPageModule;
}());
export { RazorPageModule };
//# sourceMappingURL=razor.module.js.map