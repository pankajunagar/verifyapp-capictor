import * as tslib_1 from "tslib";
import { Component, NgZone, ViewChild, ElementRef } from "@angular/core";
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
import jsQR from 'jsqr';
import { Plugins } from "@capacitor/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { SettingsService } from 'src/app/settings.service';
var Browser = Plugins.Browser;
var VerifyitDashboardPage = /** @class */ (function () {
    function VerifyitDashboardPage(iab, nfc, ndef, platform, loading, ngZone, qrScanner, utilservice, router, barcodeScanner, alertService, geolocation, settings, apiSvc) {
        var _this = this;
        this.iab = iab;
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
        this.settings = settings;
        this.apiSvc = apiSvc;
        this.scanActive = false;
        this.scanResult = null;
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
            tagId: "",
            source_token: ""
        };
        this.hideDashboardScreen = true;
        this.res = {};
        this.settings.getActiveTheme().subscribe(function (val) { return _this.selectedTheme = val; });
        this.ionViewDidLoad();
        this.userType = window.localStorage.getItem("userType");
        // this.alertService.presentthis.alertService.presentAlert(''," user info data",window.localStorage.getItem('userType'));
    }
    VerifyitDashboardPage.prototype.toggleAppTheme = function () {
        
        if (this.selectedTheme === 'dark-theme') {
            this.settings.setActiveTheme('light-theme');
        }
        else {
            this.settings.setActiveTheme('dark-theme');
        }
    };
    VerifyitDashboardPage.prototype.ionViewDidEnter = function () {
        this.videoElement = this.video.nativeElement;
        this.canvasElement = this.canvas.nativeElement;
        this.canvasContext = this.canvasElement.getContext('2d');
        console.log(this.videoElement);
    };
    VerifyitDashboardPage.prototype.ngOnInit = function () {
        var _this = this;
        
        // window.localStorage.setItem('product-link',this.router.url)
        if (this.router.url.includes("params") && !this.router.url.includes("source")) {
            this.hideDashboardScreen = false;
            this.gettag((this.router.url).split('=')[1]);
        }
        else if (this.router.url.includes("brand") && !this.router.url.includes("source")) {
            this.hideDashboardScreen = false;
            var brand = ((this.router.url).split('=')[1]);
            this.router.navigate(['/verifyit-product-catalog'], { queryParams: { brand: brand } });
        }
        else if (this.router.url.includes("product_id")) {
            this.hideDashboardScreen = false;
            var product_id = ((this.router.url).split('=')[1]);
            this.router.navigate(['/verifyit-product-catalog'], { queryParams: { product_id: product_id } });
        }
        else if (this.router.url.includes("params") && this.router.url.includes("source")) {
            this.hideDashboardScreen = false;
            this.source_token = ((this.router.url).split('=')[2]);
            window.localStorage.setItem('source_token', this.source_token);
            this.data.source_token = this.source_token;
            this.gettag((this.router.url).split('=')[1].split('&')[0]);
            // this.router.navigateByUrl('/verifyit-product-info')
        }
        this.gettag('4516');
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.geolocation
                .getCurrentPosition()
                .then(function (resp) {
                _this.data.lat = resp.coords.latitude;
                _this.data.long = resp.coords.longitude;
            })
                .catch(function (error) {
                console.log("Error getting location", error);
            });
        });
        this.utilservice.LoadPage.subscribe(function (data) {
           
            // this.alertService.presentAlert('',this.utilservice.userType)
            // this.ionViewWillEnter();
            if (_this.utilservice.menuTitle == 'Write NFC/QR') {
                _this.userType = 2;
            }
            else if (_this.utilservice.menuTitle == 'Read NFC/QR') {
                _this.userType = 1;
            }
        });
    };
    VerifyitDashboardPage.prototype.presentLoading = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            message: data
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
    //**Charu Start */
    VerifyitDashboardPage.prototype.open = function () {
        var url = 'https://ionicframework.com/';
        var option = {
            zoom: 'no',
            hardwareback: 'no',
            closebuttoncaption: 'yes'
        };
        var browser = this.iab.create(url, '_self', option);
        browser.show();
    };
    //**Charu End */
    VerifyitDashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userType = window.localStorage.getItem("userType");
        this.platform.ready().then(function () {
            _this.nfc
                .enabled()
                .then(function (resolve) {
                _this.canNFC = true;
                // this.setStatus("NFC Compatable.");
                // this.tagListenerSuccess();
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
    VerifyitDashboardPage.prototype.tagListenerSuccess = function () {
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
        if (this.platform.is('ios')) {
            this.readAndWriteNFCIos();
        }
        else {
            this.subscriptions.push(this.nfc.addNdefListener().subscribe(function (data) {
                if (_this.readingTag) {
                    var payload = data.tag.ndefMessage[0].payload;
                    var tagId = _this.nfc.bytesToString(payload).substring(3);
                    _this.readingTag = false;
                    // this.presentLoading('');
                    _this.getProductInfo(tagId);
                }
            }, function (err) {
                _this.loading.dismiss();
                _this.alertService.presentAlert("", "Something went wrong!");
            }));
        }
    };
    VerifyitDashboardPage.prototype.readAndWriteNFCIos = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag, payload, tagId, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.nfc.scanNdef({ keepSessionOpen: true })];
                    case 1:
                        tag = _a.sent();
                        payload = tag.ndefMessage[0].payload;
                        tagId = this.nfc.bytesToString(payload).substring(3);
                        // you can read tag data here
                        console.log(tagId);
                        this.loading.dismiss();
                        this.nfc.cancelScan();
                        this.getProductInfo(tagId);
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
    VerifyitDashboardPage.prototype.getProductInfo = function (tagId) {
        var _this = this;
        this.presentLoading('NFC Tag connected successfully.');
        // this.utilservice.storage=tagId;
        window.localStorage.setItem('tagId', tagId);
        this.apiSvc.callGetTag(tagId).subscribe(function (callgettagresult) {
            _this.utilservice.callgettagresult = callgettagresult;
            _this.res = callgettagresult;
            _this.loading.dismiss();
            _this.presentLoading('Processing data from NFC Tag.');
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
    };
    VerifyitDashboardPage.prototype.setStatus = function (message) {
        var _this = this;
        this.alertService.presentAlert("", message);
        this.ngZone.run(function () {
            _this.statusMessage = message;
        });
    };
    VerifyitDashboardPage.prototype.readTag = function () {
        var _this = this;
        if (this.canNFC && this.platform.is('android')) {
            setTimeout(function () {
                _this.alertService.presentAlert("", "Please place your mobile near NFC tag.");
                _this.readingTag = true;
                _this.tagListenerSuccess();
            }, 100);
        }
        else if (this.platform.is('ios')) {
            this.tagListenerSuccess();
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
    VerifyitDashboardPage.prototype.ionViewWillLeave = function () {
        this.hideDashboardScreen = true;
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    VerifyitDashboardPage.prototype.stopScan = function () {
        this.scanActive = false;
        var stream = this.videoElement.srcObject;
        var tracks = stream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        this.videoElement.srcObject = null;
    };
    VerifyitDashboardPage.prototype.scan = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.videoElement.readyState === _this.videoElement.HAVE_ENOUGH_DATA) {
                _this.scanActive = true;
                _this.canvasElement.height = _this.videoElement.videoHeight;
                _this.canvasElement.width = _this.videoElement.videoWidth;
                _this.canvasContext.drawImage(_this.videoElement, 0, 0, _this.canvasElement.width, _this.canvasElement.height);
                var imageData = _this.canvasContext.getImageData(0, 0, _this.canvasElement.width, _this.canvasElement.height);
                var code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert'
                });
                console.log(code);
                //     // logic for existing and new qr code
                _this.tagId = code;
                if (_this.tagId) {
                    var tagId = _this.tagId.data;
                    console.log(tagId);
                    if (tagId.includes("params")) {
                        tagId = tagId.split('=')[1];
                        //  alert(tagId)
                        _this.gettag(tagId);
                        _this.stopScan();
                    }
                    else {
                        _this.gettag(tagId);
                        _this.stopScan();
                    }
                    _this.tagId = (JSON.parse(tagId));
                    _this.productData = _this.strToObj(tagId);
                }
                if (code) {
                    _this.scanActive = false;
                }
                else {
                    if (_this.scanActive) {
                        requestAnimationFrame(_this.scan.bind(_this));
                    }
                }
            }
            else {
                requestAnimationFrame(_this.scan.bind(_this));
            }
        });
    };
    VerifyitDashboardPage.prototype.scanqrcode = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var locationUrl, stream;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        
                        locationUrl = window.location.href;
                        
                        if (!(locationUrl.includes("pwa") || locationUrl.includes("nowverifycap"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                                video: { facingMode: 'environment' }
                            })];
                    case 1:
                        stream = _a.sent();
                        this.videoElement.srcObject = stream;
                        this.videoElement.setAttribute('playsinline', true);
                        this.videoElement.play();
                        requestAnimationFrame(this.scan.bind(this));
                        return [3 /*break*/, 3];
                    case 2:
                        this.scanIOS();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VerifyitDashboardPage.prototype.gettag = function (tagId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        window.localStorage.setItem('tagId', tagId);
                        this.geolocation
                            .getCurrentPosition()
                            .then(function (resp) {
                            _this.data.lat = resp.coords.latitude;
                            _this.data.long = resp.coords.longitude;
                        })
                            .catch(function (error) {
                            console.log("Error getting location", error);
                        });
                        return [4 /*yield*/, this.presentLoading('')];
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
                                console.log(callrecordscanresult);
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
    VerifyitDashboardPage.prototype.strToObj = function (str) {
        var obj = {};
        if (str && typeof str === 'string') {
            var objStr = str.match(/\{(.)+\}/g);
            eval("obj =" + objStr);
        }
       
        return obj;
    };
    VerifyitDashboardPage.prototype.scanIOS = function () {
        var _this = this;
        this.options = {
            prompt: "Scan your barcode "
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            console.log(barcodeData);
            // logic for existing and new qr code
            _this.tagId = (barcodeData.text).toString();
            if (_this.tagId.includes("myparam")) {
                
                _this.tagId = _this.tagId.split('=')[1];
                alert(_this.tagId);
                _this.gettag(_this.tagId);
            }
            else {
                _this.gettag(_this.tagId);
            }
            _this.tagId = (JSON.parse(_this.tagId));
            _this.productData = _this.strToObj(_this.tagId);
            // let variabletype = typeof (this.tagId)
            // if (variabletype == "number") {
          
            //   // alert('number')
            //   this.gettag(this.tagId);
            // } else {
          
            //   this.gettag(this.productData.tagId);
            // alert('string')
            // }
        }, function (err) {
            console.log("Error occured : " + err);
        });
    };
    tslib_1.__decorate([
        ViewChild('video'),
        tslib_1.__metadata("design:type", ElementRef)
    ], VerifyitDashboardPage.prototype, "video", void 0);
    tslib_1.__decorate([
        ViewChild('canvas'),
        tslib_1.__metadata("design:type", ElementRef)
    ], VerifyitDashboardPage.prototype, "canvas", void 0);
    VerifyitDashboardPage = tslib_1.__decorate([
        Component({
            selector: "app-verifyitdashboard",
            templateUrl: "./verifyitdashboard.page.html",
            styleUrls: ["./verifyitdashboard.page.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [InAppBrowser,
            NFC,
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
            SettingsService,
            NailaService])
    ], VerifyitDashboardPage);
    return VerifyitDashboardPage;
}());
export { VerifyitDashboardPage };
//# sourceMappingURL=verifyitdashboard.page.js.map