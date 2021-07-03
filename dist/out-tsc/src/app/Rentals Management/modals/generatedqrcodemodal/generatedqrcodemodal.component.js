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
var GeneratedQRcodeModalComponent = /** @class */ (function () {
    function GeneratedQRcodeModalComponent(modalController, loadingCtrl, noticeService, router, alertService, route, webView, utils, transService, actionSheet, screenshot, nviservice) {
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
        this.nviservice = nviservice;
        this.title = 'Nowverifyit';
        this.hidebutton = true;
        this.canNFC = false;
        this.elementType = 'elementType';
        this.value = 'QR code not generated successfully';
        this.flag = false;
        this.images = [];
        this.hasLoading = false;
        this.hidenfc = true;
        // this.ionViewDidLoad()
    }
    GeneratedQRcodeModalComponent.prototype.ngOnInit = function () {
        this.value = this.utils.storage;
        // this.takescreenshot()
        //     this.utils.LoadPage.subscribe(data=>{
        // // this.ionViewDidLoad()
        //      })
    };
    GeneratedQRcodeModalComponent.prototype.ionViewWillEnter = function () {
        // this.alertService.presentAlert("",'dgdsgd'+)
        if (this.utils.NFCsuccessmsg) {
            this.hidenfc = false;
        }
        else {
            this.hidenfc = true;
        }
    };
    GeneratedQRcodeModalComponent.prototype.presentLoading = function () {
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
    GeneratedQRcodeModalComponent.prototype.closeModal = function () {
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
    GeneratedQRcodeModalComponent.prototype.takescreenshot = function () {
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
    GeneratedQRcodeModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-generatedqrcodemodal',
            templateUrl: './generatedqrcodemodal.component.html',
            styleUrls: ['./generatedqrcodemodal.component.scss'],
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
    ], GeneratedQRcodeModalComponent);
    return GeneratedQRcodeModalComponent;
}());
export { GeneratedQRcodeModalComponent };
//# sourceMappingURL=generatedqrcodemodal.component.js.map