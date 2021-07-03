import * as tslib_1 from "tslib";
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { VerifyitProductInfoPage } from './verifyitProductinfo.page';
import { TellUsifyouBuyitComponent } from '../../modals/tellusifyoubuyit/tellusifyoubuyit.component';
import { CertificateModalComponent } from '../../modals/certificatemodal/certificatemodal.component';
import { Userrole5modalComponent } from '../../modals/userrole5modal/userrole5modal.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { UserroleinfoModalComponent } from '../../modals/userroleinfomodal/userroleinfomodal.component';
import { QuizModalComponent } from 'src/app/quiz-modal/quiz-modal.component';
import { WarrantycardComponent } from '../../modals/warrantycard/warrantycard.component';
var routes = [
    {
        path: '',
        component: VerifyitProductInfoPage
    }
];
var VerifyitProductInfoPageModule = /** @class */ (function () {
    function VerifyitProductInfoPageModule() {
    }
    VerifyitProductInfoPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [CreateNoticeComponent, TellUsifyouBuyitComponent, WarrantycardComponent, CertificateModalComponent, Userrole5modalComponent, UserroleinfoModalComponent, QuizModalComponent],
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
                TellUsifyouBuyitComponent, WarrantycardComponent, CertificateModalComponent, Userrole5modalComponent, UserroleinfoModalComponent
            ],
            declarations: [VerifyitProductInfoPage, TellUsifyouBuyitComponent, WarrantycardComponent, CertificateModalComponent, Userrole5modalComponent, UserroleinfoModalComponent, QuizModalComponent]
        })
    ], VerifyitProductInfoPageModule);
    return VerifyitProductInfoPageModule;
}());
export { VerifyitProductInfoPageModule };
//# sourceMappingURL=verifyitProductinfo.module.js.map