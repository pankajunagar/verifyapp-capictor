import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateTicketPage } from './create-ticket.page';
var routes = [
    {
        path: '',
        component: CreateTicketPage
    }
];
var CreateTicketPageModule = /** @class */ (function () {
    function CreateTicketPageModule() {
    }
    CreateTicketPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CreateTicketPage]
        })
    ], CreateTicketPageModule);
    return CreateTicketPageModule;
}());
export { CreateTicketPageModule };
//# sourceMappingURL=create-ticket.module.js.map