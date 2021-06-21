import * as tslib_1 from "tslib";
import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { VerifyitProductCatalogPage } from './verifyitproductcatalog';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { NailasearchPage } from './nailasearchpage';
// import { VerifyitProductCatalogPage } from './VerifyitProductCatalogPage';
var routes = [
    {
        path: '',
        component: VerifyitProductCatalogPage
    }
];
var VerifyitProductCatalogPageModule = /** @class */ (function () {
    function VerifyitProductCatalogPageModule() {
    }
    VerifyitProductCatalogPageModule = tslib_1.__decorate([
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
            declarations: [VerifyitProductCatalogPage]
        })
    ], VerifyitProductCatalogPageModule);
    return VerifyitProductCatalogPageModule;
}());
export { VerifyitProductCatalogPageModule };
//# sourceMappingURL=verifyitproductcatalog.module.js.map