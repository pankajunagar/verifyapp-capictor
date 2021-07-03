import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ContactUsPage } from './contact-us.page';
var routes = [
    {
        path: '',
        component: ContactUsPage
    }
];
var ContactUsPageModule = /** @class */ (function () {
    function ContactUsPageModule() {
    }
    ContactUsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ContactUsPage]
        })
    ], ContactUsPageModule);
    return ContactUsPageModule;
}());
export { ContactUsPageModule };
//# sourceMappingURL=contact-us.module.js.map