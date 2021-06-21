import * as tslib_1 from "tslib";
import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { NailaAccountPage } from './nailaaccountpage';
import { RefundModalComponent } from '../../modals/refundmodal/refundmodal.component';
import { PrivacyPolicyModalComponent } from '../../modals/privacypolicy/privacypolicy.component';
import { TermsModalComponent } from '../../modals/termsandcondition/termsandcondition.component';
import { VerifyitAccountsPage } from './verifyitaccountspage';
var routes = [
    {
        path: '',
        component: VerifyitAccountsPage
    }
];
var VerifyitAccountsPageModule = /** @class */ (function () {
    function VerifyitAccountsPageModule() {
    }
    VerifyitAccountsPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [],
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
            declarations: [VerifyitAccountsPage,]
        })
    ], VerifyitAccountsPageModule);
    return VerifyitAccountsPageModule;
}());
export { VerifyitAccountsPageModule };
//# sourceMappingURL=verifyitaccountspage.module.js.map