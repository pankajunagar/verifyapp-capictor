import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MaterialSearchPage } from './material-search.page';
var routes = [
    {
        path: '',
        component: MaterialSearchPage
    }
];
var MaterialSearchPageModule = /** @class */ (function () {
    function MaterialSearchPageModule() {
    }
    MaterialSearchPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MaterialSearchPage]
        })
    ], MaterialSearchPageModule);
    return MaterialSearchPageModule;
}());
export { MaterialSearchPageModule };
//# sourceMappingURL=material-search.module.js.map