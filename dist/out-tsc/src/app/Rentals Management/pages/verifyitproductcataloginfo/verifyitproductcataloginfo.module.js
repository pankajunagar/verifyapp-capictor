import * as tslib_1 from "tslib";
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { VerifyitProductCatalogInfoPage } from './verifyitProductinfo.page';
//  import { } from '../../modals/tellusifyoubuyit/tellusifyoubuyit.component';
// import { VerifyitProductCatalogInfoPage } from './verifyitproductcataloginfo.page';
import { IonicSelectableModule } from 'ionic-selectable';
// import { CertificateModalComponent } from '../../modals/certificatemodal/certificatemodal.component';
// import { Userrole5modalComponent } from '../../modals/userrole5modal/userrole5modal.component';
// import { UserroleinfoModalComponent } from '../../modals/userroleinfomodal/userroleinfomodal.component';
// import { QuizModalComponent } from 'src/app/quiz-modal/quiz-modal.component';
import { VerifyitProductCatalogInfoPage } from './verifyitproductcataloginfo.page';
// import { VerifyitProductCatalogInfoPage } from '../verifyitProductinfo/verifyitProductinfo.page';
// import { VerifyitProductCatalogInfoPage } from './verifyitproductcatalog.page';
var routes = [
    {
        path: '',
        component: VerifyitProductCatalogInfoPage
    }
];
var VerifyitProductCatalogInfoPageModule = /** @class */ (function () {
    function VerifyitProductCatalogInfoPageModule() {
    }
    VerifyitProductCatalogInfoPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [CreateNoticeComponent],
            imports: [
                CommonModule,
                IonicSelectableModule,
                FormsModule,
                ApplicationPageModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            providers: [
            // BarcodeScanner
            ],
            declarations: [VerifyitProductCatalogInfoPage]
        })
    ], VerifyitProductCatalogInfoPageModule);
    return VerifyitProductCatalogInfoPageModule;
}());
export { VerifyitProductCatalogInfoPageModule };
//# sourceMappingURL=verifyitproductcataloginfo.module.js.map