import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TicketSubCategorySearchPage } from './ticket-sub-category-search.page';
var routes = [
    {
        path: '',
        component: TicketSubCategorySearchPage
    }
];
var TicketSubCategorySearchPageModule = /** @class */ (function () {
    function TicketSubCategorySearchPageModule() {
    }
    TicketSubCategorySearchPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TicketSubCategorySearchPage]
        })
    ], TicketSubCategorySearchPageModule);
    return TicketSubCategorySearchPageModule;
}());
export { TicketSubCategorySearchPageModule };
//# sourceMappingURL=ticket-sub-category-search.module.js.map