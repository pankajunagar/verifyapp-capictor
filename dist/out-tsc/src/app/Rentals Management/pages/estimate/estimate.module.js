import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EstimatePage } from './estimate.page';
var routes = [
    {
        path: '',
        component: EstimatePage
    }
];
var EstimatePageModule = /** @class */ (function () {
    function EstimatePageModule() {
    }
    EstimatePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EstimatePage]
        })
    ], EstimatePageModule);
    return EstimatePageModule;
}());
export { EstimatePageModule };
//# sourceMappingURL=estimate.module.js.map