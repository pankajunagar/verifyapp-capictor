import * as tslib_1 from "tslib";
import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NailaCartPage } from './nailabooking';
// import { NailaCartPage } from './nailabooking';
// import { NailaCartPage } from './nailaofferslisting';
// import { ApprovalpopupComponent } from '../../modals/approvalpopup/approvalpopup.component';
var routes = [
    {
        path: '',
        component: NailaCartPage
    }
];
var NailaCartPageModule = /** @class */ (function () {
    function NailaCartPageModule() {
    }
    NailaCartPageModule = tslib_1.__decorate([
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
            declarations: [NailaCartPage]
        })
    ], NailaCartPageModule);
    return NailaCartPageModule;
}());
export { NailaCartPageModule };
//# sourceMappingURL=nailacart.module.js.map