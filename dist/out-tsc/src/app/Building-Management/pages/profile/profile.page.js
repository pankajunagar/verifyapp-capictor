import * as tslib_1 from "tslib";
import { LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Storage } from '@ionic/storage';
import { BuildingUserService } from '../../services/building-user.service';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(router, userService, alertService, loadingCtrl, transService, storage) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.loadingCtrl = loadingCtrl;
        this.transService = transService;
        this.storage = storage;
        this.user_id = window.localStorage.getItem('user_id');
        this.token = window.localStorage.getItem('token');
        this.data = {};
        this.getProfile(window.localStorage.getItem('user_id'));
    }
    ProfilePage.prototype.ngOnInit = function () {
        console.log(this.user_id);
    };
    ProfilePage.prototype.getProfile = function (id) {
        var _this = this;
        this.userService.getUserById(id).subscribe(function (data) {
            _this.data = data;
            console.log(data);
        }, function (error) {
            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), error.message.message);
        });
    };
    ProfilePage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
                            spinner: 'lines'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfilePage.prototype.logOut = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.presentLoading();
                this.data.businessAppDevice = {};
                this.userService.updateUser(this.data).subscribe(function () {
                    localStorage.clear();
                    _this.storage.clear();
                    _this.loadingCtrl.dismiss();
                    _this.router.navigateByUrl('/login');
                });
                return [2 /*return*/];
            });
        });
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            BuildingUserService,
            AlertServiceService,
            LoadingController,
            TranslateServiceService,
            Storage])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map