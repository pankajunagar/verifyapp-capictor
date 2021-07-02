import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    {
        path: '',
        redirectTo: 'verifyit-dashboard',
        pathMatch: 'full'
    },
    // { path: 'building-management', loadChildren: '../app/Building-Management/building-management.module#BuildingManagementModule' },
    { path: 'login', loadChildren: '../app/login/login.module#LoginPageModule' },
    // { path: 'posts', loadChildren: '../app/login/login.module#LoginPageModule' },
    // { path: 'posts/:slug', loadChildren: '../app/login/login.module#LoginPageModule' },
    { path: 'verifyit-dashboard', loadChildren: '../app/Rentals Management/pages/verifyitdashboard/verifyitdashboard.module#VerifyitDashboardPageModule' },
    { path: 'rentals', loadChildren: '../app/Rentals Management/rental-management.module#RentalsManagementModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map