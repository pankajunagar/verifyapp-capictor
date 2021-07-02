import * as tslib_1 from "tslib";
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { IonicModule } from '@ionic/angular';
import { NoticeDetailsPage } from './notice-details.page';
var routes = [
    {
        path: '',
        component: NoticeDetailsPage
    }
];
var NoticeDetailsPageModule = /** @class */ (function () {
    function NoticeDetailsPageModule() {
    }
    NoticeDetailsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ApplicationPageModule,
                RouterModule.forChild(routes),
                AvatarModule
            ],
            declarations: [NoticeDetailsPage]
        })
    ], NoticeDetailsPageModule);
    return NoticeDetailsPageModule;
}());
export { NoticeDetailsPageModule };
//# sourceMappingURL=notice-details.module.js.map