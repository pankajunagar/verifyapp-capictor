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
import { NailaservicePage } from './nailaservicepage';
var routes = [
    {
        path: '',
        component: NailaservicePage
    }
];
var NailaservicePageModule = /** @class */ (function () {
    function NailaservicePageModule() {
    }
    NailaservicePageModule = tslib_1.__decorate([
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
            declarations: [NailaservicePage]
        })
    ], NailaservicePageModule);
    return NailaservicePageModule;
}());
export { NailaservicePageModule };
//# sourceMappingURL=nailaservicepage.module.js.map