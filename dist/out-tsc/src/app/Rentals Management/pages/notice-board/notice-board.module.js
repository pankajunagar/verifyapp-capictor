import * as tslib_1 from "tslib";
import { CreateNoticeComponent } from './../../modals/create-notice/create-notice.component';
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { IonicModule } from '@ionic/angular';
import { NoticeBoardPage } from './notice-board.page';
var routes = [
    {
        path: '',
        component: NoticeBoardPage
    }
];
var NoticeBoardPageModule = /** @class */ (function () {
    function NoticeBoardPageModule() {
    }
    NoticeBoardPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [CreateNoticeComponent],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                AvatarModule,
                ApplicationPageModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NoticeBoardPage]
        })
    ], NoticeBoardPageModule);
    return NoticeBoardPageModule;
}());
export { NoticeBoardPageModule };
//# sourceMappingURL=notice-board.module.js.map