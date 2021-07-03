import * as tslib_1 from "tslib";
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Utils } from '../../services/utils.service';
var RewardmodalfirstComponent = /** @class */ (function () {
    function RewardmodalfirstComponent(modalController, utils, loadingCtrl, noticeService, router, alertCtrl, alertService, route, webView, transService, actionSheet) {
        this.modalController = modalController;
        this.utils = utils;
        this.loadingCtrl = loadingCtrl;
        this.noticeService = noticeService;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.alertService = alertService;
        this.route = route;
        this.webView = webView;
        this.transService = transService;
        this.actionSheet = actionSheet;
        this.notice = {
            discussionBelongsTo: 'Project',
            discussionType: 'Notice',
            raisedByEmployee: true,
        };
        this.flag = false;
        this.images = [];
        this.hasLogin = false;
    }
    RewardmodalfirstComponent.prototype.ngOnInit = function () {
        this.royaltyData = this.utils.royaltyData;
        if (window.localStorage.getItem('name')) {
            this.hasLogin = true;
        }
    };
    RewardmodalfirstComponent.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.loadingCtrl.create({
                    spinner: "lines"
                }).then(function (loading) {
                    loading.present();
                });
                return [2 /*return*/];
            });
        });
    };
    RewardmodalfirstComponent.prototype.closeModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RewardmodalfirstComponent.prototype.redeemNow = function () {
        // alert('Coming soon.')
        this.presentAlertConfirm();
        // this.alertService.presentAlert('Coming soon','Login to secure your loyalty point.')
    };
    RewardmodalfirstComponent.prototype.presentAlertConfirm = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            cssClass: 'my-custom-class',
                            // header: 'Confirm!',
                            message: 'Coming soon.',
                            buttons: [
                                {
                                    text: 'Skip',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        _this.modalController.dismiss();
                                    }
                                },
                                {
                                    text: 'Login to secure points.',
                                    // cssClass: 'secondary',
                                    handler: function (blah) {
                                        _this.router.navigateByUrl('/login');
                                        _this.modalController.dismiss();
                                    }
                                },
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RewardmodalfirstComponent.prototype.LoginNow = function () {
        this.modalController.dismiss();
        this.router.navigateByUrl('/login');
    };
    RewardmodalfirstComponent = tslib_1.__decorate([
        Component({
            selector: 'app-rewardmodalfirst',
            templateUrl: './rewardmodalfirst.component.html',
            styleUrls: ['./rewardmodalfirst.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            Utils,
            LoadingController,
            NoticeService,
            Router,
            AlertController,
            AlertServiceService,
            ActivatedRoute,
            WebView,
            TranslateServiceService,
            ActionSheetController])
    ], RewardmodalfirstComponent);
    return RewardmodalfirstComponent;
}());
export { RewardmodalfirstComponent };
//# sourceMappingURL=rewardmodalfirst.component.js.map