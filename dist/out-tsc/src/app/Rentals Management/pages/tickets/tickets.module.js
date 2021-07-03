import * as tslib_1 from "tslib";
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TicketsPage } from './tickets.page';
import { TicketComponent } from '../../components/ticket/ticket.component';
var routes = [
    {
        path: '',
        component: TicketsPage
    }
];
var TicketsPageModule = /** @class */ (function () {
    function TicketsPageModule() {
    }
    TicketsPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [TicketComponent],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ApplicationPageModule,
                RouterModule.forChild(routes),
            ],
            declarations: [TicketsPage, TicketComponent]
        })
    ], TicketsPageModule);
    return TicketsPageModule;
}());
export { TicketsPageModule };
//# sourceMappingURL=tickets.module.js.map