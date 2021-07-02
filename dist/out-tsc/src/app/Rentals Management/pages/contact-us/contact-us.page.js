import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ContactUsService } from '../../services/contact-us.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var ContactUsPage = /** @class */ (function () {
    function ContactUsPage(loadingCtrl, modalController, contactUsService, router, route, alertService, transService) {
        this.loadingCtrl = loadingCtrl;
        this.modalController = modalController;
        this.contactUsService = contactUsService;
        this.router = router;
        this.route = route;
        this.alertService = alertService;
        this.transService = transService;
        this.contactUsData = {
            user: {
            // _id: window.localStorage.getItem('user_id'),
            // countryCode: window.localStorage.getItem('countryCode'),
            // phoneNumber: window.localStorage.getItem('phoneNumber'),
            // firstName: window.localStorage.getItem('firstName'),
            // lastName: window.localStorage.getItem('lastName'),
            },
            // 'roles' : JSON.parse(window.localStorage.getItem('roles')),
            createdAt: new Date(),
            source: 'Business App'
        };
    }
    ContactUsPage.prototype.presentLoading = function () {
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
    ContactUsPage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertService.getDataFromLoaclStorage('user_id').then(function (val) {
                            _this.contactUsData.user._id = val;
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.alertService.getDataFromLoaclStorage('countryCode').then(function (val) {
                                _this.contactUsData.user.countryCode = val;
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.alertService.getDataFromLoaclStorage('phoneNumber').then(function (val) {
                                _this.contactUsData.user.phoneNumber = val;
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.alertService.getDataFromLoaclStorage('firstName').then(function (val) {
                                _this.contactUsData.user.firstName = val;
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.alertService.getDataFromLoaclStorage('lastName').then(function (val) {
                                _this.contactUsData.user.lastName = val;
                            })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactUsPage.prototype.sendContactUsRequest = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.contactUsService.createContactUs(this.contactUsData)
                            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.loadingCtrl.dismiss();
                                        return [4 /*yield*/, this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('contact-us.message'))];
                                    case 1:
                                        _a.sent();
                                        this.router.navigateByUrl('/rentals-home');
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) {
                            _this.loadingCtrl.dismiss();
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactUsPage = tslib_1.__decorate([
        Component({
            selector: 'app-contact-us',
            templateUrl: './contact-us.page.html',
            styleUrls: ['./contact-us.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [LoadingController,
            ModalController,
            ContactUsService,
            Router,
            ActivatedRoute,
            AlertServiceService,
            TranslateServiceService])
    ], ContactUsPage);
    return ContactUsPage;
}());
export { ContactUsPage };
//# sourceMappingURL=contact-us.page.js.map