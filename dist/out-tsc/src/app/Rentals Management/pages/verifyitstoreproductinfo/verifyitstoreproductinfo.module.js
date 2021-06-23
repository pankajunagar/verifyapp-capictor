import * as tslib_1 from "tslib";
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { VerifyitStoreProductInfoPage } from './verifyitstoreproductinfo.page';
// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { GeneratedQRcodeModalComponent } from '../../modals/generatedqrcodemodal/generatedqrcodemodal.component';
// import { VerifyitStoreProductInfoPage } from '../verifyitProductinfo/verifyitProductinfo.page';
// import { VerifyitStoreProductInfoPage } from './verifyitProductinfo.page';
var routes = [
    {
        path: '',
        component: VerifyitStoreProductInfoPage
    }
];
var VerifyitStoreProductInfoPageModule = /** @class */ (function () {
    function VerifyitStoreProductInfoPageModule() {
    }
    VerifyitStoreProductInfoPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [CreateNoticeComponent, GeneratedQRcodeModalComponent],
            imports: [
                // NgxQRCodeModule,
                CommonModule,
                FormsModule,
                ApplicationPageModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            providers: [
                // BarcodeScanner
                GeneratedQRcodeModalComponent
            ],
            declarations: [VerifyitStoreProductInfoPage, GeneratedQRcodeModalComponent]
        })
    ], VerifyitStoreProductInfoPageModule);
    return VerifyitStoreProductInfoPageModule;
}());
export { VerifyitStoreProductInfoPageModule };
//# sourceMappingURL=verifyitstoreproductinfo.module.js.map