import * as tslib_1 from "tslib";
import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NailabookingPage } from './nailabooking';
// import { NailabookingPage } from './nailaofferslisting';
var routes = [
    {
        path: '',
        component: NailabookingPage
    }
];
var NailabookingPageModule = /** @class */ (function () {
    function NailabookingPageModule() {
    }
    NailabookingPageModule = tslib_1.__decorate([
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
            declarations: [NailabookingPage]
        })
    ], NailabookingPageModule);
    return NailabookingPageModule;
}());
export { NailabookingPageModule };
//# sourceMappingURL=nailabooking.module.js.map