import * as tslib_1 from "tslib";
import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NailaAccountPage } from './nailaaccountpage';
import { RefundModalComponent } from '../../modals/refundmodal/refundmodal.component';
import { PrivacyPolicyModalComponent } from '../../modals/privacypolicy/privacypolicy.component';
import { TermsModalComponent } from '../../modals/termsandcondition/termsandcondition.component';
var routes = [
    {
        path: '',
        component: NailaAccountPage
    }
];
var NailaAccountPageModule = /** @class */ (function () {
    function NailaAccountPageModule() {
    }
    NailaAccountPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [CreateNoticeComponent, RefundModalComponent, PrivacyPolicyModalComponent, TermsModalComponent],
            imports: [
                CommonModule,
                FormsModule,
                ApplicationPageModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            providers: [
                // BarcodeScanner,
                RefundModalComponent,
                PrivacyPolicyModalComponent,
                TermsModalComponent
            ],
            declarations: [NailaAccountPage, RefundModalComponent, PrivacyPolicyModalComponent, TermsModalComponent]
        })
    ], NailaAccountPageModule);
    return NailaAccountPageModule;
}());
export { NailaAccountPageModule };
//# sourceMappingURL=nailaaccountpage.module.js.map