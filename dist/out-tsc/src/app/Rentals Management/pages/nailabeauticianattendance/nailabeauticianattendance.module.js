import * as tslib_1 from "tslib";
import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// // import { NailabeauticianAttendance } from './NailabeauticianAttendance';
// import { RefundModalComponent } from '../../modals/refundmodal/refundmodal.component';
// import { PrivacyPolicyModalComponent } from '../../modals/privacypolicy/privacypolicy.component';
// import { TermsModalComponent } from '../../modals/termsandcondition/termsandcondition.component';
import { NailabeauticianAttendance } from './nailabeauticianattendance';
var routes = [
    {
        path: '',
        component: NailabeauticianAttendance
    }
];
var NailabeauticianAttendanceModule = /** @class */ (function () {
    function NailabeauticianAttendanceModule() {
    }
    NailabeauticianAttendanceModule = tslib_1.__decorate([
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
            // RefundModalComponent,
            // PrivacyPolicyModalComponent,
            // TermsModalComponent
            ],
            declarations: [NailabeauticianAttendance]
        })
    ], NailabeauticianAttendanceModule);
    return NailabeauticianAttendanceModule;
}());
export { NailabeauticianAttendanceModule };
//# sourceMappingURL=nailabeauticianattendance.module.js.map