import * as tslib_1 from "tslib";
import { ApplicationPageModule } from "./../../ApplicationPageModule";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
// import { HomePage } from './home.page';
import { CreateNoticeComponent } from "../../modals/create-notice/create-notice.component";
import { VerifyItSuccessMessagePage } from "./verifyitsuccessmessage.page";
// import { VerifyitDashboardPage } from './verifyitdashboard.page';
// import { VerifyitDashboardPage } from './VerifyitDashboardPage.page';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// my comments
var routes = [
    {
        path: "",
        component: VerifyItSuccessMessagePage,
    },
];
var VerifyItSuccessMessageModule = /** @class */ (function () {
    function VerifyItSuccessMessageModule() {
    }
    VerifyItSuccessMessageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [CreateNoticeComponent],
            imports: [
                CommonModule,
                FormsModule,
                ApplicationPageModule,
                IonicModule,
                RouterModule.forChild(routes),
            ],
            providers: [
            // BarcodeScanner
            ],
            declarations: [VerifyItSuccessMessagePage],
        })
    ], VerifyItSuccessMessageModule);
    return VerifyItSuccessMessageModule;
}());
export { VerifyItSuccessMessageModule };
//# sourceMappingURL=verifyitsuccessmessage.module.js.map