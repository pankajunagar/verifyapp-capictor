import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TicketFilterPage } from './ticket-filter.page';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
var routes = [
    {
        path: '',
        component: TicketFilterPage
    }
];
var TicketFilterPageModule = /** @class */ (function () {
    function TicketFilterPageModule() {
    }
    TicketFilterPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            providers: [
            // BarcodeScanner
            ],
            declarations: [TicketFilterPage]
        })
    ], TicketFilterPageModule);
    return TicketFilterPageModule;
}());
export { TicketFilterPageModule };
//# sourceMappingURL=ticket-filter.module.js.map