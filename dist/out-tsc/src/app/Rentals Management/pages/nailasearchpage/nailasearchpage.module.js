import * as tslib_1 from "tslib";
import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NailasearchPage } from './nailasearchpage';
import { NailaService } from '../../services/naila.service';
var routes = [
    {
        path: '',
        component: NailasearchPage
    }
];
var NailasearchPageModule = /** @class */ (function () {
    function NailasearchPageModule() {
    }
    NailasearchPageModule = tslib_1.__decorate([
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
                NailaService
            ],
            declarations: [NailasearchPage]
        })
    ], NailasearchPageModule);
    return NailasearchPageModule;
}());
export { NailasearchPageModule };
//# sourceMappingURL=nailasearchpage.module.js.map