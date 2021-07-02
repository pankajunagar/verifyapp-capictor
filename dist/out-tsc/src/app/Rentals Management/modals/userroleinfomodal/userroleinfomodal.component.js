import * as tslib_1 from "tslib";
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from '../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Utils } from '../../services/utils.service';
// import { PopoverComponent } from '../../component/popover/popover.component';
// import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'
// import { userrole5modalComponent } from '../../modals/userrole5modal/userrole5modal.component';
var Port = /** @class */ (function () {
    function Port() {
    }
    return Port;
}());
var UserroleinfoModalComponent = /** @class */ (function () {
    function UserroleinfoModalComponent(modalController, utils, toast, loadingCtrl, popoverController, noticeService, router, alertCtrl, alertService, route, webView, transService, actionSheet) {
        this.modalController = modalController;
        this.utils = utils;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        this.popoverController = popoverController;
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
        this.dealer = {
            name: window.localStorage.getItem('dealerName')
        };
        if (window.localStorage.getItem('dealerName')) {
            this.port1 = {
                id: window.localStorage.getItem('dealerId'),
                name: window.localStorage.getItem('dealerName'),
            };
        }
        else {
            this.port1 = {
                id: 1,
                name: "Sandeep"
            };
        }
        this.hasLogin = false;
        this.ports = [
            { id: 1, name: 'Sandeep' },
            { id: 2, name: 'Smit' },
            { id: 3, name: 'Seikh Jarah' },
            { id: 4, name: 'Hamas' },
            { id: 5, name: 'Navjot' },
            { id: 6, name: 'Israel' },
        ];
    }
    UserroleinfoModalComponent.prototype.ngOnInit = function () {
        // this.createNewScratchCard()
        this.royaltyData = this.utils.royaltyData;
        if (window.localStorage.getItem('name')) {
            this.hasLogin = true;
        }
    };
    UserroleinfoModalComponent.prototype.presentLoading = function () {
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
    UserroleinfoModalComponent.prototype.closeModal = function () {
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
    UserroleinfoModalComponent.prototype.redeemNow = function () {
        // alert('Coming soon.')
        // this.presentAlertConfirm();
        // this.alertService.presentAlert('Coming soon','Login to secure your loyalty point.')
    };
    UserroleinfoModalComponent.prototype.presentAlertConfirm = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            cssClass: 'my-custom-class',
                            // header: 'Confirm!',
                            message: 'Are you sure you want to deactivate the coupon?',
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
                                    text: 'Deactivate',
                                    // cssClass: 'secondary',
                                    handler: function (blah) {
                                        _this.presentToast();
                                        _this.router.navigateByUrl('/verifyit-dashboard');
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
    UserroleinfoModalComponent.prototype.LoginNow = function () {
        this.modalController.dismiss();
        this.router.navigateByUrl('/login');
    };
    // createNewScratchCard() {
    //   const scContainer = document.getElementById('js--sc--container')
    //   const sc = new ScratchCard('#js--sc--container', {
    //     scratchType: SCRATCH_TYPE.CIRCLE,
    //     // containerWidth: 200,//scContainer.offsetWidth,
    //     // containerHeight: 200,
    //     imageForwardSrc: 'assets/scratch.png',
    //     //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
    //     htmlBackground: '<div class="cardamountcss"><div class="won-amnt">30</div><div class="won-text">Points<br>Won!</div></div>',
    //     clearZoneRadius: 40,
    //     nPoints: 30,
    //     pointSize: 4,
    //     callback: () => {
    //       console.log('Now the window will reload!')
    //     }
    //   })
    //   // Init
    //   sc.init();
    // }
    UserroleinfoModalComponent.prototype.portChange = function (event) {
        console.log('port:', event.value);
        window.localStorage.setItem('dealerName', event.value.name);
        window.localStorage.setItem('dealerId', event.value.id);
    };
    UserroleinfoModalComponent.prototype.presentToast = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toast.create({
                            message: 'Your coupon has been deactivated.',
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserroleinfoModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-userroleinfomodal',
            templateUrl: './userroleinfomodal.component.html',
            styleUrls: ['./userroleinfomodal.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            Utils,
            ToastController,
            LoadingController,
            PopoverController,
            NoticeService,
            Router,
            AlertController,
            AlertServiceService,
            ActivatedRoute,
            WebView,
            TranslateServiceService,
            ActionSheetController])
    ], UserroleinfoModalComponent);
    return UserroleinfoModalComponent;
}());
export { UserroleinfoModalComponent };
//# sourceMappingURL=userroleinfomodal.component.js.map