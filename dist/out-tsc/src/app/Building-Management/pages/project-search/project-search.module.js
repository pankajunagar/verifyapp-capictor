import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProjectSearchPage } from './project-search.page';
var routes = [
    {
        path: '',
        component: ProjectSearchPage
    }
];
var ProjectSearchPageModule = /** @class */ (function () {
    function ProjectSearchPageModule() {
    }
    ProjectSearchPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ProjectSearchPage]
        })
    ], ProjectSearchPageModule);
    return ProjectSearchPageModule;
}());
export { ProjectSearchPageModule };
//# sourceMappingURL=project-search.module.js.map