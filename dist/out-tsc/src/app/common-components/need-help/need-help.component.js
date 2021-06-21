import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/common-services/login.service';
import { CountrycodemodalComponent } from 'src/app/login/countrycodemodal/countrycodemodal.component';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import * as jsonFile from '../../conatants/organization.json';
// import { AlertserviceService } from 'src/app/common-services/alertservice.service';
var NeedHelpComponent = /** @class */ (function () {
    // phoneNumber: 8528041001,
    // countryCode: '+91',
    // email: 'vishwash@thehousemonk.com',
    // comments: 'Test',
    // name: 'vishwash' }
    function NeedHelpComponent(modalCtrl, loginservice, loadingCtrl, alertService) {
        this.modalCtrl = modalCtrl;
        this.loginservice = loginservice;
        this.loadingCtrl = loadingCtrl;
        this.alertService = alertService;
        this.requestData = {
            countryCode: '+91',
            orgName: jsonFile.orgName,
            appName: jsonFile.appName
        };
    }
    NeedHelpComponent.prototype.ngOnInit = function () { };
    NeedHelpComponent.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
                            spinner: 'lines'
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
    NeedHelpComponent.prototype.sendRequest = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                console.log(this.requestData);
                this.presentLoading();
                this.loginservice.needHelp(this.requestData).subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                            case 1:
                                _a.sent();
                                this.modalCtrl.dismiss();
                                this.alertService.presentAlert("", "Thank you for your response, we will get back to you at the earliest");
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                            case 1:
                                _a.sent();
                                this.alertService.presentAlert("", "Something went wrong");
                                return [2 /*return*/];
                        }
                    });
                }); });
                console.log(this.requestData);
                return [2 /*return*/];
            });
        });
    };
    NeedHelpComponent.prototype.countryCodeModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this];
                    case 1:
                        _a.sent(), this.modalCtrl.create({
                            component: CountrycodemodalComponent,
                            cssClass: 'my-custom-modal-css',
                            componentProps: { 'value': this.requestData.countryCode }
                        }).then(function (modal) {
                            modal.present();
                            modal.onDidDismiss().then(function (data) {
                                _this.requestData.countryCode = data.data ? data.data : '+91';
                                console.log(data.data, "Data from country code modal");
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NeedHelpComponent.prototype.close = function () {
        this.modalCtrl.dismiss();
    };
    NeedHelpComponent = tslib_1.__decorate([
        Component({
            selector: 'app-need-help',
            templateUrl: './need-help.component.html',
            styleUrls: ['./need-help.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            LoginService,
            LoadingController,
            AlertServiceService])
    ], NeedHelpComponent);
    return NeedHelpComponent;
}());
export { NeedHelpComponent };
//# sourceMappingURL=need-help.component.js.map