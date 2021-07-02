import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserSearchPage } from './user-search.page';
import { PointOfContact } from '../../pipes/pointOfContectFilter';
var routes = [
    {
        path: '',
        component: UserSearchPage
    }
];
var UserSearchPageModule = /** @class */ (function () {
    function UserSearchPageModule() {
    }
    UserSearchPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UserSearchPage, PointOfContact]
        })
    ], UserSearchPageModule);
    return UserSearchPageModule;
}());
export { UserSearchPageModule };
//# sourceMappingURL=user-search.module.js.map