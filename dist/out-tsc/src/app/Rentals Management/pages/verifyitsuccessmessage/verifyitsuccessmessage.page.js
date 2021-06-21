import * as tslib_1 from "tslib";
import { Component, NgZone } from "@angular/core";
import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import { Platform } from "@ionic/angular";
import { NailaService } from "../../services/naila.service";
import { QRScanner } from "@ionic-native/qr-scanner/ngx";
import { Utils } from "../../services/utils.service";
import { Router } from "@angular/router";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { LoadingController } from "@ionic/angular";
// import { LoadingController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
var VerifyItSuccessMessagePage = /** @class */ (function () {
    function VerifyItSuccessMessagePage(nfc, ndef, platform, loading, ngZone, qrScanner, utilservice, router, barcodeScanner, alertService, geolocation, apiSvc) {
        this.nfc = nfc;
        this.ndef = ndef;
        this.platform = platform;
        this.loading = loading;
        this.ngZone = ngZone;
        this.qrScanner = qrScanner;
        this.utilservice = utilservice;
        this.router = router;
        this.barcodeScanner = barcodeScanner;
        this.alertService = alertService;
        this.geolocation = geolocation;
        this.apiSvc = apiSvc;
        this.cred = {
            tagId: null,
            verified: null,
            product_name: null,
            manufactured: null,
            model_number: null,
            serial_number: null,
            brand: null,
            img: { default: { main: null } },
            product_details: {
                water_resistant: null,
                display_type: null,
                series: null,
                occassion: null,
                strap: null
            },
            how_to_use_it: { english: null, spanish: null, portugues: null }
        };
        this.credKeys = {
            key12: null,
            key1: null,
            key2: null,
            key3: null,
            key4: null,
            key5: null,
            key6: null,
            key7: null,
            key8: null,
            key9: null,
            key10: null,
            key11: null,
            key13: null
        };
        this.canNFC = false;
        // trying
        this.readingTag = false;
        this.writingTag = false;
        this.isWriting = false;
        this.writtenInput = "";
        this.subscriptions = new Array();
        this.data = {
            lat: 0,
            long: 0,
            tagId: ""
        };
        this.res = {};
        this.ionViewDidLoad();
        this.userType = window.localStorage.getItem("userType");
        // this.alertService.presentthis.alertService.presentAlert(''," user info data",window.localStorage.getItem('userType'));
    }
    VerifyItSuccessMessagePage.prototype.ngOnInit = function () {
        // this.geolocation
        //   .getCurrentPosition()
        //   .then(resp => {
        //     this.data.lat = resp.coords.latitude;
        //     this.data.long = resp.coords.longitude;
        //   })
        //   .catch(error => {
        //     console.log("Error getting location", error);
        //   });
        var _this = this;
        this.utilservice.LoadPage.subscribe(function (data) {
            // this.alertService.presentAlert('',this.utilservice.userType)
            // this.ionViewWillEnter();
            if (_this.userType == 1) {
                _this.userType = 2;
            }
            else {
                _this.userType = 1;
            }
        });
    };
    VerifyItSuccessMessagePage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({})];
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
    VerifyItSuccessMessagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        debugger;
        this.userType = window.localStorage.getItem("userType");
        this.platform.ready().then(function () {
            _this.nfc
                .enabled()
                .then(function (resolve) {
                _this.canNFC = true;
                // this.setStatus("NFC Compatable.");
                _this.tagListenerSuccess();
            })
                .catch(function (reject) {
                _this.canNFC = false;
                // this.alertService.presentAlert(
                //   "",
                //   JSON.stringify("NFC is not supported by your Device")
                // );
                // this.setStatus("NFC Not Compatable.");
            });
        });
    };
    VerifyItSuccessMessagePage.prototype.tagListenerSuccess = function () {
        var _this = this;
        this.geolocation
            .getCurrentPosition()
            .then(function (resp) {
            _this.data.lat = resp.coords.latitude;
            _this.data.long = resp.coords.longitude;
        })
            .catch(function (error) {
            console.log("Error getting location", error);
        });
        this.subscriptions.push(this.nfc.addNdefListener().subscribe(function (data) {
            if (_this.readingTag) {
                var payload = data.tag.ndefMessage[0].payload;
                var tagId_1 = _this.nfc.bytesToString(payload).substring(3);
                _this.readingTag = false;
                _this.presentLoading();
                _this.apiSvc.callGetTag(tagId_1).subscribe(function (callgettagresult) {
                    _this.utilservice.callgettagresult = callgettagresult;
                    _this.res = callgettagresult;
                    _this.cred.product_name = _this.res.product_name;
                    // this.alertService.presentAlert('',this.cred.product_name)
                    _this.cred.verified = _this.res.verified;
                    _this.cred.tagId = tagId_1;
                    _this.data.tagId = tagId_1;
                    _this.apiSvc.callRecordScan(_this.data).subscribe(function (callrecordscanresult) {
                        _this.utilservice.callrecordscanresult = callrecordscanresult;
                        _this.loading.dismiss();
                        _this.router.navigateByUrl("/verifyit-product-info");
                        //location
                    }, function (err) {
                        _this.loading.dismiss();
                        _this.alertService.presentAlert("", "call record scan went wrong");
                    });
                    _this.cred.model_number = _this.res.model_number;
                    _this.cred.serial_number = _this.res.serial_number;
                    _this.cred.brand = _this.res.brand;
                    _this.cred.img = _this.res.img;
                    _this.cred.product_details = _this.res.product_details;
                    _this.cred.how_to_use_it = _this.res.how_to_use_it;
                    _this.cred.manufactured = _this.res.manufactured;
                    _this.credKeys.key1 = "Product Name";
                    _this.credKeys.key2 = "Model Number";
                    _this.credKeys.key3 = "Serial Number";
                    _this.credKeys.key4 = "Brand";
                    _this.credKeys.key5 = "Water Resistant";
                    _this.credKeys.key6 = "Display Type";
                    _this.credKeys.key7 = "Series";
                    _this.credKeys.key8 = "Occassion";
                    _this.credKeys.key9 = "Strap";
                    _this.credKeys.key10 = "Manufactured";
                    _this.credKeys.key11 = "Instructions";
                    _this.credKeys.key12 = "Wine Information";
                    _this.credKeys.key13 = "Verified";
                    // this.helperSvc.hideLoading();
                });
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.alertService.presentAlert("", "Something went wrong!");
        }));
    };
    VerifyItSuccessMessagePage.prototype.setStatus = function (message) {
        var _this = this;
        this.alertService.presentAlert("", message);
        this.ngZone.run(function () {
            _this.statusMessage = message;
        });
    };
    VerifyItSuccessMessagePage.prototype.readTag = function () {
        var _this = this;
        if (this.canNFC) {
            setTimeout(function () {
                _this.alertService.presentAlert("", "Please place your mobile near NFC tag.");
                _this.readingTag = true;
                _this.tagListenerSuccess();
            }, 100);
        }
        else {
            this.alertService.presentAlert("", "NFC is not supported by your Device");
        }
    };
    // boughtIt(tagId){
    //       this.apiSvc.callPostBoughtIt(tagId).subscribe((res) => {
    //         this.alertService.presentAlert('',res);
    //         // this.helperSvc.hideLoading();
    //   });
    //   // this.navCtrl.push(ThankyouPage,{})
    //   this.alertService.presentAlert('','thank you')
    // }
    VerifyItSuccessMessagePage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    VerifyItSuccessMessagePage.prototype.scanqrcode = function () {
        var _this = this;
        this.options = {
            prompt: "Scan your barcode "
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            console.log(barcodeData);
            _this.tagId = barcodeData.text;
            _this.gettag(_this.tagId);
        }, function (err) {
            console.log("Error occured : " + err);
        });
    };
    VerifyItSuccessMessagePage.prototype.gettag = function (tagId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.geolocation
                            .getCurrentPosition()
                            .then(function (resp) {
                            _this.data.lat = resp.coords.latitude;
                            _this.data.long = resp.coords.longitude;
                        })
                            .catch(function (error) {
                            console.log("Error getting location", error);
                        });
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.apiSvc.callGetTag(tagId).subscribe(function (callgettagresult) {
                            _this.utilservice.callgettagresult = callgettagresult;
                            _this.res = callgettagresult;
                            _this.cred.product_name = _this.res.product_name;
                            // this.alertService.presentAlert('',this.cred.product_name)
                            _this.cred.verified = _this.res.verified;
                            _this.cred.tagId = tagId;
                            _this.data.tagId = tagId;
                            _this.apiSvc.callRecordScan(_this.data).subscribe(function (callrecordscanresult) {
                                _this.utilservice.callrecordscanresult = callrecordscanresult;
                                _this.loading.dismiss();
                                _this.router.navigateByUrl("/verifyit-product-info");
                                //location
                            }, function (err) {
                                _this.loading.dismiss();
                                _this.alertService.presentAlert("", "call record scan went wrong");
                            });
                            _this.cred.model_number = _this.res.model_number;
                            _this.cred.serial_number = _this.res.serial_number;
                            _this.cred.brand = _this.res.brand;
                            _this.cred.img = _this.res.img;
                            _this.cred.product_details = _this.res.product_details;
                            _this.cred.how_to_use_it = _this.res.how_to_use_it;
                            _this.cred.manufactured = _this.res.manufactured;
                            _this.credKeys.key1 = "Product Name";
                            _this.credKeys.key2 = "Model Number";
                            _this.credKeys.key3 = "Serial Number";
                            _this.credKeys.key4 = "Brand";
                            _this.credKeys.key5 = "Water Resistant";
                            _this.credKeys.key6 = "Display Type";
                            _this.credKeys.key7 = "Series";
                            _this.credKeys.key8 = "Occassion";
                            _this.credKeys.key9 = "Strap";
                            _this.credKeys.key10 = "Manufactured";
                            _this.credKeys.key11 = "Instructions";
                            _this.credKeys.key12 = "Wine Information";
                            _this.credKeys.key13 = "Verified";
                            // this.helperSvc.hideLoading();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    VerifyItSuccessMessagePage = tslib_1.__decorate([
        Component({
            selector: "app-verifyitsuccessmessage",
            templateUrl: "./verifyitsuccessmessage.page.html",
            styleUrls: ["./verifyitsuccessmessage.page.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [NFC,
            Ndef,
            Platform,
            LoadingController,
            NgZone,
            QRScanner,
            Utils,
            Router,
            BarcodeScanner,
            AlertServiceService,
            Geolocation,
            NailaService])
    ], VerifyItSuccessMessagePage);
    return VerifyItSuccessMessagePage;
}());
export { VerifyItSuccessMessagePage };
//# sourceMappingURL=verifyitsuccessmessage.page.js.map