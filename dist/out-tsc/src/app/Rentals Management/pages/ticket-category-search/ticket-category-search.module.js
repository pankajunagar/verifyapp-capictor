import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TicketCategorySearchPage } from './ticket-category-search.page';
var routes = [
    {
        path: '',
        component: TicketCategorySearchPage
    }
];
var TicketCategorySearchPageModule = /** @class */ (function () {
    function TicketCategorySearchPageModule() {
    }
    TicketCategorySearchPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TicketCategorySearchPage]
        })
    ], TicketCategorySearchPageModule);
    return TicketCategorySearchPageModule;
}());
export { TicketCategorySearchPageModule };
//# sourceMappingURL=ticket-category-search.module.js.map