import * as tslib_1 from "tslib";
import { Component, NgZone } from "@angular/core";
import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import { Platform, ModalController, LoadingController } from "@ionic/angular";
import { NailaService } from "../../services/naila.service";
import { Utils } from "../../services/utils.service";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { Router } from "@angular/router";
import { GeneratedQRcodeModalComponent } from "../../modals/generatedqrcodemodal/generatedqrcodemodal.component";
var VerifyitStoreProductInfoPage = /** @class */ (function () {
    function VerifyitStoreProductInfoPage(utilservice, alertservice, router, platform, modalController, apiSvc, nfc, ndef, ngZone, loading) {
        this.utilservice = utilservice;
        this.alertservice = alertservice;
        this.router = router;
        this.platform = platform;
        this.modalController = modalController;
        this.apiSvc = apiSvc;
        this.nfc = nfc;
        this.ndef = ndef;
        this.ngZone = ngZone;
        this.loading = loading;
        this.canNFC = false;
        this.disableButton = true;
        this.subscriptions = new Array();
        this.res = {};
        this.productdetail = {};
        // this.openGeneratedQRcodeModal()
    }
    VerifyitStoreProductInfoPage.prototype.ngOnInit = function () { };
    VerifyitStoreProductInfoPage.prototype.presentLoading = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            message: message,
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VerifyitStoreProductInfoPage.prototype.openGeneratedQRcodeModal = function (role) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.utilservice.LoadPageOnrouteChange();
                if (role == "qr") {
                    this.utilservice.hidenfc = true;
                    this.generateqrcode(role);
                }
                else {
                    this.generateqrcode(role);
                    this.utilservice.hidenfc = false;
                }
                return [2 /*return*/];
            });
        });
    };
    VerifyitStoreProductInfoPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
        this.NFCListener.unsubscribe();
    };
    VerifyitStoreProductInfoPage.prototype.generateqrcode = function (role) {
        var _this = this;
        this.disableButton = false;
        this.presentLoading('Place your NFC Tag on the top of your mobile phone.');
        this.apiSvc.writeNFCQRcodedata(this.productdetail).subscribe(function (res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(res, '======================');
                        this.loading.dismiss();
                        this.disableButton = true;
                        if (!(role == "qr")) return [3 /*break*/, 3];
                        // this.presentLoading();
                        this.utilservice.NFCsuccessmsg = false;
                        // this.value = JSON.stringify(res.id)
                        this.utilservice.storage = JSON.stringify(res.id);
                        return [4 /*yield*/, this.modalController.create({
                                component: GeneratedQRcodeModalComponent
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: 
                    // this.loading.dismiss();
                    return [2 /*return*/, _a.sent()];
                    case 3:
                        // this.loading.dismiss();
                        // this.writingNFC(JSON.stringify(res.id));
                        this.tagListenerSuccess(JSON.stringify(res.id));
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); }, function (err) {
            _this.disableButton = true;
            _this.loading.dismiss();
            _this.loading.dismiss();
            // alert("write record scan went wrong");
            _this.alertservice.presentAlert("", "write record scan went wrong");
        });
    };
    // setStatus(message) {
    //   this.alertservice.presentAlert("", message);
    //   this.ngZone.run(() => {
    //     this.statusMessage = message;
    //   });
    // }
    VerifyitStoreProductInfoPage.prototype.readTag = function () {
        var _this = this;
        if (this.canNFC) {
            setTimeout(function () {
                // alert("Please place your mobile near NFC tag.");
                _this.alertservice.presentAlert("", "Please place your mobile near NFC tag.");
                // this.readingTag = true;
                // this.tagListenerSuccess();
            }, 100);
        }
        else {
            this.alertservice.presentAlert("NFC is not supported by your Device", "");
        }
    };
    VerifyitStoreProductInfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.nfc.enabled().then(function (resolve) {
                _this.canNFC = true;
                _this.setStatus('NFC Compatable.');
            }).catch(function (reject) {
                _this.canNFC = false;
                // this.helperSvc.showResponseAlert(JSON.stringify("NFC is not supported by your Device"));
                _this.setStatus('NFC Not Compatable.');
            });
        });
    };
    // writingNFC(productData) {
    //   // this.presentLoading()
    //   this.nfc
    //     .enabled()
    //     .then(resolve => {
    //       this.canNFC = true;
    //       this.readTag();
    //       // this.setStatus("NFC Compatable.");
    //       // this.tagListenerSuccess();
    //     })
    //     .catch(reject => {
    //       this.canNFC = false;
    //       // this.loading.dismiss()
    //       // this.alertservice.presentAlert("", JSON.stringify("NFC is not supported by your Device"));
    //       // this.setStatus("NFC Not Compatable.");
    //     });
    //   // this.NFCListener =
    //     this.nfc.addNdefListener(
    //       () => {
    //         // this.alertservice.presentAlert("", "Successfully attached NDEF listener.");
    //       },
    //       (err: any) => {
    //         this.loading.dismiss()
    //         this.alertservice.presentAlert("", "error attaching ndef listener.");
    //       }
    //     )
    //       .subscribe(event => {
    //         // this.alertservice.presentAlert("", "received NDF message.");
    //         if (this.canNFC) {
    //           const a = this.ndef.textRecord(productData);
    //           this.nfc
    //             .write([a])
    //             .then(() => {
    //               this.loading.dismiss()
    //               this.router.navigateByUrl('/verifyit-message')
    //               // this.alertservice.presentAlert("", "We wrote to the tag successfully.");
    //               // this.utilservice.NFCsuccessmsg = true
    //             })
    //             .catch((err: any) => {
    //               this.loading.dismiss()
    //               this.alertservice.presentAlert("", "We could not write to the tag.something went wrong");
    //               // this.NFCsuccessmsg =
    //               //   "Product info not written successfully on NFC tag.";
    //             });
    //         }
    //       });
    // }
    VerifyitStoreProductInfoPage.prototype.tagListenerSuccess = function (data) {
        var _this = this;
        if (this.platform.is('android')) {
            this.subscriptions.push(this.nfc.addNdefListener()
                .subscribe(function (tagEvent) {
                // if (this.writingTag) {
                // if (!this.isWriting) {
                // this.isWriting = true;
                var a = _this.ndef.textRecord(data);
                _this.nfc.write([a])
                    .then(function () {
                    // this.cred.name = '';
                    // this.cred.place = '';
                    setTimeout(function () {
                        // this.helperSvc.showResponseAlert(JSON.stringify('NFC Updated'));
                        // this.helperSvc.hideLoading();
                        // console.log("written");
                        // this.writingTag = false;
                        _this.router.navigateByUrl('/verifyit-message');
                        // this.isWriting = false;
                    }, 100);
                })
                    .catch(function (err) {
                    // this.writingTag = false;
                    // this.isWriting = false;
                    // this.cred.name = '';
                    // this.cred.place = '';
                    alert('NFC not Connected.');
                    // this.helperSvc.hideLoading();
                });
                // }
            }, function (err) {
            }));
        }
        else {
            this.readAndWriteNFCIos(data);
        }
    };
    VerifyitStoreProductInfoPage.prototype.setStatus = function (message) {
        var _this = this;
        console.log(message);
        this.ngZone.run(function () {
            _this.statusMessage = message;
        });
    };
    // writeTag(writeText: string) {
    //   if (this.canNFC) {
    //     this.tagListenerSuccess();
    //     if (this.cred.name && this.cred.place) {
    //       // this.helperSvc.showLoading('Processing. Plese wait.');
    //       this.apiSvc.callPostTag(this.cred.name, this.cred.place).subscribe((res) => {
    //         console.log(res);
    //         // this.helperSvc.hideLoading();
    //         setTimeout(() => {
    //           this.helperSvc.showLoading('Place NFC Tag Near device to write.');
    //           this.writingTag = true;
    //           this.ndefMsg = this.ndef.textRecord(res.id);
    //         }, 100);
    //       });
    //     } else {
    //       // this.helperSvc.showErrorAlert('Name and Place is Required.');
    //     }
    //   } else {
    //     // this.helperSvc.showErrorAlert('NFC is not supported by your Device');
    //   }
    // }
    VerifyitStoreProductInfoPage.prototype.readAndWriteNFCIos = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag, a, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.nfc.scanNdef({ keepSessionOpen: true })];
                    case 1:
                        tag = _a.sent();
                        a = this.ndef.textRecord(data);
                        this.nfc.write([a])
                            .then(function () {
                            // this.cred.name = '';
                            // this.cred.place = '';
                            setTimeout(function () {
                                // this.helperSvc.showResponseAlert(JSON.stringify('NFC Updated'));
                                // this.helperSvc.hideLoading();
                                // console.log("written");
                                // this.writingTag = false;
                                _this.router.navigateByUrl('/verifyit-message');
                                // this.isWriting = false;
                            }, 100);
                        })
                            .catch(function (err) {
                            // this.writingTag = false;
                            // this.isWriting = false;
                            // this.cred.name = '';
                            // this.cred.place = '';
                            alert('NFC not Connected.');
                            // this.helperSvc.hideLoading();
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VerifyitStoreProductInfoPage.prototype.presentModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: GeneratedQRcodeModalComponent
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VerifyitStoreProductInfoPage = tslib_1.__decorate([
        Component({
            selector: "app-verifyitstoreproductinfo",
            templateUrl: "./verifyitstoreproductinfo.page.html",
            styleUrls: ["./verifyitstoreproductinfo.page.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [Utils,
            AlertServiceService,
            Router,
            Platform,
            ModalController,
            NailaService,
            NFC,
            Ndef,
            NgZone,
            LoadingController])
    ], VerifyitStoreProductInfoPage);
    return VerifyitStoreProductInfoPage;
}());
export { VerifyitStoreProductInfoPage };
//# sourceMappingURL=verifyitstoreproductinfo.page.js.map