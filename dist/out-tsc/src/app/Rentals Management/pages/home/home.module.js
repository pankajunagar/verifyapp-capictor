import * as tslib_1 from "tslib";
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
var routes = [
    {
        path: '',
        component: HomePage
    }
];
var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib_1.__decorate([
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
            declarations: [HomePage]
        })
    ], HomePageModule);
    return HomePageModule;
}());
export { HomePageModule };
//# sourceMappingURL=home.module.js.map