import * as tslib_1 from "tslib";
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserApprovalPage } from './user-approval.page';
import { ApprovalpopupComponent } from '../../modals/approvalpopup/approvalpopup.component';
var routes = [
    {
        path: '',
        component: UserApprovalPage
    }
];
var UserApprovalPageModule = /** @class */ (function () {
    function UserApprovalPageModule() {
    }
    UserApprovalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ApplicationPageModule,
                IonicModule,
                RouterModule.forChild(routes)
            ], entryComponents: [
                ApprovalpopupComponent
            ],
            declarations: [UserApprovalPage, ApprovalpopupComponent]
        })
    ], UserApprovalPageModule);
    return UserApprovalPageModule;
}());
export { UserApprovalPageModule };
//# sourceMappingURL=user-approval.module.js.map