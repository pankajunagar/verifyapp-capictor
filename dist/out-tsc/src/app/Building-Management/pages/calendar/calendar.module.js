import * as tslib_1 from "tslib";
import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CalendarPage } from './calendar.page';
var routes = [
    {
        path: '',
        component: CalendarPage
    }
];
var CalendarPageModule = /** @class */ (function () {
    function CalendarPageModule() {
    }
    CalendarPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                ApplicationPageModule,
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CalendarPage]
        })
    ], CalendarPageModule);
    return CalendarPageModule;
}());
export { CalendarPageModule };
//# sourceMappingURL=calendar.module.js.map