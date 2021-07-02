import * as tslib_1 from "tslib";
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { IonicModule } from '@ionic/angular';
import { TicketDetailsPage } from './ticket-details.page';
var routes = [
    {
        path: '',
        component: TicketDetailsPage
    }
];
var TicketDetailsPageModule = /** @class */ (function () {
    function TicketDetailsPageModule() {
    }
    TicketDetailsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                AvatarModule,
                ApplicationPageModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TicketDetailsPage]
        })
    ], TicketDetailsPageModule);
    return TicketDetailsPageModule;
}());
export { TicketDetailsPageModule };
//# sourceMappingURL=ticket-details.module.js.map