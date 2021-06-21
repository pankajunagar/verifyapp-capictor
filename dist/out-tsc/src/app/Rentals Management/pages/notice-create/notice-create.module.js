import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NoticeCreatePage } from './notice-create.page';
var routes = [
    {
        path: '',
        component: NoticeCreatePage
    }
];
var NoticeCreatePageModule = /** @class */ (function () {
    function NoticeCreatePageModule() {
    }
    NoticeCreatePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NoticeCreatePage]
        })
    ], NoticeCreatePageModule);
    return NoticeCreatePageModule;
}());
export { NoticeCreatePageModule };
//# sourceMappingURL=notice-create.module.js.map