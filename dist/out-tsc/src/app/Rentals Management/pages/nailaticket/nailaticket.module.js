import * as tslib_1 from "tslib";
import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NailaticketPage } from './nailaticket';
// import { NailaticketPage } from './nailabooking';
// import { NailaticketPage } from './nailaofferslisting';
var routes = [
    {
        path: '',
        component: NailaticketPage
    }
];
var NailaticketPageModule = /** @class */ (function () {
    function NailaticketPageModule() {
    }
    NailaticketPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [CreateNoticeComponent],
            imports: [
                CommonModule,
                FormsModule,
                ApplicationPageModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            providers: [
            // BarcodeScanner
            ],
            declarations: [NailaticketPage]
        })
    ], NailaticketPageModule);
    return NailaticketPageModule;
}());
export { NailaticketPageModule };
//# sourceMappingURL=nailaticket.module.js.map