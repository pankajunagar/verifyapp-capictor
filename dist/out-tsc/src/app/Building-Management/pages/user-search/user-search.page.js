import * as tslib_1 from "tslib";
import { AlertServiceService } from '../../../common-services/alert-service.service';
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { BuildingUserService } from '../../services/building-user.service';
var UserSearchPage = /** @class */ (function () {
    function UserSearchPage(
    // private loading: LoadingController,
    userService, modalController, navParams, alertService, transService) {
        this.userService = userService;
        this.modalController = modalController;
        this.navParams = navParams;
        this.alertService = alertService;
        this.transService = transService;
        this.users = [];
        this.loading = false;
        this.selectedUser = {};
        this.disableInfiniteScroll = false;
        if (this.navParams.get('id')) {
            this.selectedUser.id = this.navParams.get('id');
            this.selectedUser.name = this.navParams.get('name');
        }
        this.searchUsers();
    }
    UserSearchPage.prototype.ngOnInit = function () {
    };
    // async presentLoading() {
    //   const loading = await this.loading.create({
    //   });
    //   await loading.present();
    // }
    UserSearchPage.prototype.selectUser = function (user) {
        this.selectedUser.name = '';
        if (user.firstName) {
            this.selectedUser.name = user.firstName;
        }
        if (user.lastName) {
            this.selectedUser.name = this.selectedUser.name + ' ' + user.lastName;
        }
        this.selectedUser.id = user._id;
        this.closeModal(true);
    };
    UserSearchPage.prototype.searchUsers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.loading = true;
                this.userService.getUsers()
                    .subscribe(function (data) {
                    _this.loading = false;
                    _this.users = data;
                }, function (err) {
                    _this.loading = false;
                    _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                });
                return [2 /*return*/];
            });
        });
    };
    UserSearchPage.prototype.closeModal = function (sendData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sendData) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.modalController.dismiss(this.selectedUser)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.modalController.dismiss()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserSearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-user-search',
            templateUrl: './user-search.page.html',
            styleUrls: ['./user-search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [BuildingUserService,
            ModalController,
            NavParams,
            AlertServiceService,
            TranslateServiceService])
    ], UserSearchPage);
    return UserSearchPage;
}());
export { UserSearchPage };
//# sourceMappingURL=user-search.page.js.map