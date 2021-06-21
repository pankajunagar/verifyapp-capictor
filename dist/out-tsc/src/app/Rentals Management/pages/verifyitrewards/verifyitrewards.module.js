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
import { Verifyitrewards } from './verifyitrewards';
import { RewardmodalfirstComponent } from '../../modals/rewardmodalfirst/rewardmodalfirst.component';
// import { ScratchmodalComponent } from '../../modals/scratchmodal/scratchmodal.component';
var routes = [
    {
        path: '',
        component: Verifyitrewards
    }
];
var VerifyitRewardsModule = /** @class */ (function () {
    function VerifyitRewardsModule() {
    }
    VerifyitRewardsModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [CreateNoticeComponent, RewardmodalfirstComponent],
            imports: [
                CommonModule,
                FormsModule,
                ApplicationPageModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            providers: [
                // BarcodeScanner,
                RewardmodalfirstComponent
            ],
            declarations: [Verifyitrewards, RewardmodalfirstComponent]
        })
    ], VerifyitRewardsModule);
    return VerifyitRewardsModule;
}());
export { VerifyitRewardsModule };
//# sourceMappingURL=verifyitrewards.module.js.map