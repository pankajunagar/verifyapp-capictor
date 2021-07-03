import * as tslib_1 from "tslib";
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Utils } from '../../services/utils.service';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { NailaService } from '../../services/naila.service';
// import { Platform } from 'ionic-angular';
var TellUsifyouBuyitComponent = /** @class */ (function () {
    function TellUsifyouBuyitComponent(modalController, loadingCtrl, noticeService, router, alertService, route, webView, utils, transService, actionSheet, screenshot, apiSvc) {
        // this.ionViewDidLoad()
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.noticeService = noticeService;
        this.router = router;
        this.alertService = alertService;
        this.route = route;
        this.webView = webView;
        this.utils = utils;
        this.transService = transService;
        this.actionSheet = actionSheet;
        this.screenshot = screenshot;
        this.apiSvc = apiSvc;
        this.title = 'Nowverifyit';
        this.hidebutton = true;
        this.canNFC = false;
        this.elementType = 'elementType';
        this.value = 'QR code not generated successfully';
        this.flag = false;
        this.images = [];
        this.hasLoading = false;
        this.hidenfc = true;
        this.mobileOTP = '';
        this.showOTP = true;
        // this.ionViewDidLoad()
    }
    TellUsifyouBuyitComponent.prototype.ngOnInit = function () {
        // this.value = this.utils.storage
        // this.takescreenshot()
        //     this.utils.LoadPage.subscribe(data=>{
        // // this.ionViewDidLoad()
        //      })
        if (window.localStorage.getItem('mobile')) {
            this.usercontactNumber = window.localStorage.getItem('mobile');
        }
        else {
            this.usercontactNumber = '';
        }
    };
    TellUsifyouBuyitComponent.prototype.ionViewWillEnter = function () {
        // this.alertService.presentAlert("",'dgdsgd'+)
        if (this.utils.NFCsuccessmsg) {
            this.hidenfc = false;
        }
        else {
            this.hidenfc = true;
        }
    };
    TellUsifyouBuyitComponent.prototype.presentLoading = function () {
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
    TellUsifyouBuyitComponent.prototype.closeModal = function () {
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
    TellUsifyouBuyitComponent.prototype.takescreenshot = function () {
        var _this = this;
        this.hidebutton = false;
        setTimeout(function () {
            _this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(function (onSuccess) {
                _this.hidebutton = true;
                _this.alertService.presentAlert("", 'Screenshot done successfully');
            }, function (onError) {
                _this.alertService.presentAlert("", 'error');
            });
        }, 900);
    };
    TellUsifyouBuyitComponent.prototype.generateOTP = function () {
        this.showOTP = false;
        this.apiSvc.genetateOTP(this.usercontactNumber).subscribe(function (res) {
            // this.showOTP = true
        }, function (err) {
        });
    };
    TellUsifyouBuyitComponent.prototype.submitOTP = function () {
        var _this = this;
        var otpData = {
            otp: Number(this.mobileOTP),
            tagId: window.localStorage.getItem('tagId'),
            mobile: this.usercontactNumber
        };
        this.apiSvc.submitOTP(otpData).subscribe(function (res) {
            if (res.error == 1) {
                _this.alertService.presentAlert('', res.description);
            }
            else {
                // this.showOTP = false;
                _this.alertService.presentAlert('', 'Thank you so much for letting us know about your purchase. We wish you a great buying experience.');
                _this.modalController.dismiss();
                _this.router.navigateByUrl('/');
            }
        });
    };
    TellUsifyouBuyitComponent = tslib_1.__decorate([
        Component({
            selector: 'app-tellusifyoubuyit',
            templateUrl: './tellusifyoubuyit.component.html',
            styleUrls: ['./tellusifyoubuyit.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            LoadingController,
            NoticeService,
            Router,
            AlertServiceService,
            ActivatedRoute,
            WebView,
            Utils,
            TranslateServiceService,
            ActionSheetController,
            Screenshot,
            NailaService])
    ], TellUsifyouBuyitComponent);
    return TellUsifyouBuyitComponent;
}());
export { TellUsifyouBuyitComponent };
//# sourceMappingURL=tellusifyoubuyit.component.js.map