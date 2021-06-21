import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UnitSearchPage } from './unit-search.page';
var routes = [
    {
        path: '',
        component: UnitSearchPage
    }
];
var UnitSearchPageModule = /** @class */ (function () {
    function UnitSearchPageModule() {
    }
    UnitSearchPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UnitSearchPage]
        })
    ], UnitSearchPageModule);
    return UnitSearchPageModule;
}());
export { UnitSearchPageModule };
//# sourceMappingURL=unit-search.module.js.map