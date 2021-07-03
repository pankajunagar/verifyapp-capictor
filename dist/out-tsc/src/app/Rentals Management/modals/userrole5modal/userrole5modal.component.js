import * as tslib_1 from "tslib";
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from '../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Utils } from '../../services/utils.service';
import { UserroleinfoModalComponent } from '../userroleinfomodal/userroleinfomodal.component';
// import { PopoverComponent } from '../../component/popover/popover.component';
// import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'
// import { userrole5modalComponent } from '../../modals/userrole5modal/userrole5modal.component';
var Port = /** @class */ (function () {
    function Port() {
    }
    return Port;
}());
var Userrole5modalComponent = /** @class */ (function () {
    function Userrole5modalComponent(modalController, utils, toast, loadingCtrl, popoverController, noticeService, router, alertCtrl, alertService, route, webView, transService, actionSheet) {
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
    Userrole5modalComponent.prototype.ngOnInit = function () {
        // this.createNewScratchCard()
        this.royaltyData = this.utils.royaltyData;
        if (window.localStorage.getItem('name')) {
            this.hasLogin = true;
        }
    };
    Userrole5modalComponent.prototype.presentLoading = function () {
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
    Userrole5modalComponent.prototype.closeModal = function () {
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
    Userrole5modalComponent.prototype.redeemNow = function () {
        // alert('Coming soon.')
        // this.presentAlertConfirm();
        // this.alertService.presentAlert('Coming soon','Login to secure your loyalty point.')
    };
    Userrole5modalComponent.prototype.presentAlertConfirm = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.presentToast();
                this.modalController.dismiss();
                this.router.navigateByUrl('/verifyit-dashboard');
                return [2 /*return*/];
            });
        });
    };
    Userrole5modalComponent.prototype.LoginNow = function () {
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
    Userrole5modalComponent.prototype.portChange = function (event) {
        console.log('port:', event.value);
        window.localStorage.setItem('dealerName', event.value.name);
        window.localStorage.setItem('dealerId', event.value.id);
    };
    Userrole5modalComponent.prototype.presentToast = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toast.create({
                            message: 'Coupon successfully deactivated for dealer named ' + window.localStorage.getItem('dealerName'),
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
    Userrole5modalComponent.prototype.presentPopover = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover, role;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: UserroleinfoModalComponent,
                            cssClass: 'my-custom-class',
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, popover.onDidDismiss()];
                    case 3:
                        role = (_a.sent()).role;
                        console.log('onDidDismiss resolved with role', role);
                        return [2 /*return*/];
                }
            });
        });
    };
    Userrole5modalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-userrole5modal',
            templateUrl: './userrole5modal.component.html',
            styleUrls: ['./userrole5modal.component.scss'],
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
    ], Userrole5modalComponent);
    return Userrole5modalComponent;
}());
export { Userrole5modalComponent };
//# sourceMappingURL=userrole5modal.component.js.map