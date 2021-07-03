import * as tslib_1 from "tslib";
import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { NailasearchPage } from './nailasearchpage';
// import { verifyitOffer } from './verifyitOffer';
// import {  } from '../../modals/rewardmodalfirst/rewardmodalfirst.component';
import { ScratchmodalComponent } from '../../modals/scratchmodal/scratchmodal.component';
import { verifyitOffer } from './verifyitoffer';
var routes = [
    {
        path: '',
        component: verifyitOffer
    }
];
var VerifyitOfferModule = /** @class */ (function () {
    function VerifyitOfferModule() {
    }
    VerifyitOfferModule = tslib_1.__decorate([
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
                // BarcodeScanner,
        
            ],
            declarations: [verifyitOffer]
        })
    ], VerifyitOfferModule);
    return VerifyitOfferModule;
}());
export { VerifyitOfferModule };
//# sourceMappingURL=verifyitoffer.module.js.map