import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { ApprovalpopupComponent } from '../../modals/approvalpopup/approvalpopup.component';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { RentalsUserService } from '../../services/rentals-user.service';
import { Router } from '@angular/router';
var UserApprovalPage = /** @class */ (function () {
    function UserApprovalPage(loadingCtrl, userService, modalController, alertService, popOver, transService, router) {
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.modalController = modalController;
        this.alertService = alertService;
        this.popOver = popOver;
        this.transService = transService;
        this.router = router;
        this.getUserApprovals();
    }
    UserApprovalPage.prototype.ngOnInit = function () {
    };
    UserApprovalPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
                            spinner: "lines"
                        }).then(function (loading) {
                            loading.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApprovalPage.prototype.getUserApprovals = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.userService.getUserApprovals()
                            .subscribe(function (data) {
                            _this.loadingCtrl.dismiss();
                            _this.approvals = data.data.data;
                            console.log(_this.approvals);
                        }, function (err) {
                            _this.loadingCtrl.dismiss();
                            if (err.error.message == "You don't have permission for this operation!") {
                                _this.alertService.presentAlert('', "You don't have permission for this operation!");
                                _this.router.navigateByUrl('rentals-naila-search-page');
                            }
                            else {
                                _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApprovalPage.prototype.approvalUser = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.userService.approve(id).subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('user-approval.approval-success'));
                                        this.getUserApprovals();
                                        console.log('==================DATA==================');
                                        console.log(data);
                                        console.log('==================DATA==================');
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('error-alert'));
                                        console.log('==================ERROR==================');
                                        console.log(err);
                                        console.log('==================ERROR==================');
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApprovalPage.prototype.rejectUser = function (id, notes) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.userService.reject(id, notes).subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('user-approval.reject-user'));
                                        this.getUserApprovals();
                                        console.log('==================DATA==================');
                                        console.log(data);
                                        console.log('==================DATA==================');
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('error-alert'));
                                        console.log('==================ERROR==================');
                                        console.log(err);
                                        console.log('==================ERROR==================');
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApprovalPage.prototype.presentPopover = function (val, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popOver;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popOver.create({
                            component: ApprovalpopupComponent,
                            backdropDismiss: false,
                            componentProps: {
                                val: val
                            }
                        })];
                    case 1:
                        popOver = _a.sent();
                        popOver.onDidDismiss().then(function (data) {
                            if (data.data) {
                                if (data.data.val == 'approve') {
                                    _this.approvalUser(id);
                                }
                                else if (data.data.val == 'reject') {
                                    _this.rejectUser(id, data.data.notes);
                                }
                            }
                        });
                        return [4 /*yield*/, popOver.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApprovalPage.prototype.call = function (number) {
        if (number) {
            window.location.href = 'tel:' + number;
        }
        else {
            this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('call-alert'));
        }
    };
    UserApprovalPage = tslib_1.__decorate([
        Component({
            selector: 'app-user-approval',
            templateUrl: './user-approval.page.html',
            styleUrls: ['./user-approval.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [LoadingController,
            RentalsUserService,
            ModalController,
            AlertServiceService,
            PopoverController,
            TranslateServiceService,
            Router])
    ], UserApprovalPage);
    return UserApprovalPage;
}());
export { UserApprovalPage };
//# sourceMappingURL=user-approval.page.js.map