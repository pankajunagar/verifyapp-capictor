import * as tslib_1 from "tslib";
import { Component, NgZone } from "@angular/core";
// import { Plugins } from '@capacitor/core';
import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import { Platform, ModalController, ActionSheetController, ToastController, NavController } from "@ionic/angular";
import { NailaService } from "../../services/naila.service";
import { QRScanner } from "@ionic-native/qr-scanner/ngx";
import { Utils } from "../../services/utils.service";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { Router } from "@angular/router";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { AlertController } from "@ionic/angular";
import { TellUsifyouBuyitComponent } from "../../modals/tellusifyoubuyit/tellusifyoubuyit.component";
import { CertificateModalComponent } from "../../modals/certificatemodal/certificatemodal.component";
import { Plugins } from "@capacitor/core";
import * as WebVPPlugin from "capacitor-video-player";
var CapacitorVideoPlayer = Plugins.CapacitorVideoPlayer, Device = Plugins.Device;
var Browser = Plugins.Browser;
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { DomSanitizer } from "@angular/platform-browser";
import { QuizModalComponent } from "src/app/quiz-modal/quiz-modal.component";
import { Userrole5modalComponent } from "../../modals/userrole5modal/userrole5modal.component";
// import { Plugins } from '@capacitor/core';
var Share = Plugins.Share;
var VerifyitProductCatalogInfoPage = /** @class */ (function () {
    function VerifyitProductCatalogInfoPage(nfc, ndef, navCtrl, platform, iab, ngZone, socialSharing, qrScanner, utilservice, alertService, toastController, router, sanitizer, alertController, apiSvc, modalController, actionSheetController) {
        // this.router.events.subscribe((event: any): void => {
        //   if (event instanceof NavigationStart) {
        //     if (event.navigationTrigger === 'popstate') {
        //       // this.autocloseOverlaysService.trigger();
        //       window.history.forward();
        var _this_1 = this;
        this.nfc = nfc;
        this.ndef = ndef;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.iab = iab;
        this.ngZone = ngZone;
        this.socialSharing = socialSharing;
        this.qrScanner = qrScanner;
        this.utilservice = utilservice;
        this.alertService = alertService;
        this.toastController = toastController;
        this.router = router;
        this.sanitizer = sanitizer;
        this.alertController = alertController;
        this.apiSvc = apiSvc;
        this.modalController = modalController;
        this.actionSheetController = actionSheetController;
        this._first = false;
        this._testApi = true;
        this.cred = {
            tagId: null,
            verified: null,
            product_name: null,
            manufactured: null,
            model_number: null,
            serial_number: null,
            brand: null,
            img: {
                default: {
                    main: null
                }
            },
            product_details: {
                water_resistant: null,
                display_type: null,
                series: null,
                occassion: null,
                strap: null
            },
            how_to_use_it: { english: null, spanish: null, portugues: null }
        };
        this.trackingData = {
            user_id: "",
            tag_id: "",
            product_id: "",
            device_id: "",
            otype: "",
            meta_data: {
                mobile_number: ""
            }
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
        this.jsonToBeUsed = [];
        // trying
        this.callgettagresult = {
            product_name: "",
            brand: "",
            product_id: "",
            model_number: "",
            manufactured: ""
        };
        this.readingTag = false;
        this.writingTag = false;
        this.isWriting = false;
        this.writtenInput = "";
        this.subscriptions = new Array();
        // ionViewDidLoad() {
        //   this.platform.ready().then(() => {
        //     this.nfc.enabled().then((resolve) => {
        //       this.canNFC = true;
        //       this.setStatus('NFC Compatable.');
        //       this.tagListenerSuccess();
        //     }).catch((reject) => {
        //       this.canNFC = false;
        //       this.alertService.presentAlert('',JSON.stringify("NFC is not supported by your Device"));
        //       this.setStatus('NFC Not Compatable.');
        //     });
        //   });
        // }
        this.res = {};
        this.options = {
            hidden: "no",
            // clearcache : 'yes',
            // clearsessioncache : 'yes',
            // zoom : 'yes',//Android only ,shows browser zoom controls
            hardwareback: "yes",
            mediaPlaybackRequiresUserAction: "no",
            shouldPauseOnSuspend: "no",
            closebuttoncaption: "Close",
            // toolbar : 'yes', //iOS only
            // enableViewportScale : 'yes', //iOS only
            allowInlineMediaPlayback: "no",
            // disallowoverscroll : 'no', //iOS only
            presentationstyle: "fullscreen",
            fullscreen: "no",
            hideurlbar: "yes",
            toolbar: "yes",
            location: "no",
            hidenavigationbuttons: "yes",
            zoom: "no"
        };
        this.product_title = this.callgettagresult.product_name;
        this.brand = this.callgettagresult.brand;
        this.product_link = "";
        //     }
        //   }
        // });
        this.hasLogin = window.localStorage.getItem("name");
        // alert('=================='+this.hasLogin)
        // this.ionViewDidLoad()
        this.callgettagresult = this.utilservice.productCatalogInfo;
        this.utilservice.callgettagresult = this.utilservice.productCatalogInfo;
        // this.callgettagresult  =  JSON.parse(this.callgettagresult)
        console.log(this.callgettagresult);
        if (this.utilservice.callgettagresult.meta_data) {
            // this.callgettagresult= this.callgettagresult
            Object.keys(this.utilservice.callgettagresult.meta_data).forEach(function (e) {
                return _this_1.jsonToBeUsed.push({
                    key: e,
                    value: _this_1.utilservice.callgettagresult.meta_data[e]
                });
            });
        }
        else {
        }
        //   for (var type in this.callgettagresult) {
        //    let item = {
        //     key: '',
        //     value: ''
        //    };
        //     item.key = type;
        //     item.value = this.callgettagresult[type];
        //     this.jsonToBeUsed.push(item);
        // }
        console.log(this.jsonToBeUsed);
        this.credKeys.key1 = "Product Name";
        this.credKeys.key2 = "Model Number";
        this.credKeys.key3 = "Serial Number";
        this.credKeys.key4 = "Brand";
        this.credKeys.key5 = "Water Resistant";
        this.credKeys.key6 = "Display Type";
        this.credKeys.key7 = "Series";
        this.credKeys.key8 = "Occassion";
        this.credKeys.key9 = "Strap";
        this.credKeys.key10 = "Manufactured";
        this.credKeys.key11 = "Instructions";
        this.credKeys.key12 = "Wine Information";
        this.credKeys.key13 = "Verified";
        this.jsonToBeUsed.forEach(function (element) {
            if (element.key == "brand_color") {
                _this_1.brand_color = element.value;
            }
        });
    }
    VerifyitProductCatalogInfoPage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var info;
            var _this_1 = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (window.localStorage.getItem('showDeactivate') == '4') {
                            this.showDeactivate = true;
                        }
                        else {
                            this.showDeactivate = false;
                        }
                        this.jsonToBeUsed = [];
                        this.hasLogin = window.localStorage.getItem("name");
                        // alert('=================='+this.hasLogin)
                        // this.ionViewDidLoad()
                        this.callgettagresult = this.utilservice.productCatalogInfo;
                        this.utilservice.callgettagresult = this.utilservice.productCatalogInfo;
                        console.log(this.callgettagresult);
                        if (this.utilservice.callgettagresult.meta_data) {
                            // this.callgettagresult= this.callgettagresult
                            Object.keys(this.utilservice.callgettagresult.meta_data).forEach(function (e) {
                                return _this_1.jsonToBeUsed.push({
                                    key: e,
                                    value: _this_1.utilservice.callgettagresult.meta_data[e]
                                });
                            });
                        }
                        else {
                        }
                        console.log(this.jsonToBeUsed);
                        this.credKeys.key1 = "Product Name";
                        this.credKeys.key2 = "Model Number";
                        this.credKeys.key3 = "Serial Number";
                        this.credKeys.key4 = "Brand";
                        this.credKeys.key5 = "Water Resistant";
                        this.credKeys.key6 = "Display Type";
                        this.credKeys.key7 = "Series";
                        this.credKeys.key8 = "Occassion";
                        this.credKeys.key9 = "Strap";
                        this.credKeys.key10 = "Manufactured";
                        this.credKeys.key11 = "Instructions";
                        this.credKeys.key12 = "Wine Information";
                        this.credKeys.key13 = "Verified";
                        this.jsonToBeUsed.forEach(function (element) {
                            if (element.key == "brand_color") {
                                _this_1.brand_color = element.value;
                            }
                        });
                        return [4 /*yield*/, Device.getInfo()];
                    case 1:
                        info = _a.sent();
                        if (info.platform === "ios" || info.platform === "android") {
                            this._videoPlayer = CapacitorVideoPlayer;
                        }
                        else {
                            this._videoPlayer = WebVPPlugin.CapacitorVideoPlayer;
                        }
                        // define the video url
                        this._url =
                            "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
                        // add listeners to the plugin
                        this._addListenersToPlayerPlugin();
                        return [2 /*return*/];
                }
            });
        });
    };
    VerifyitProductCatalogInfoPage.prototype.showProductVideo = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._videoPlayer.initPlayer({
                            mode: "fullscreen",
                            url: data,
                            playerId: "fullscreen",
                            componentTag: "app-verifyitProductinf"
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // tagListenerSuccess() {
    //   this.subscriptions.push(this.nfc.addNdefListener()
    //     .subscribe(data => {
    //       if (this.readingTag) {
    //         let payload = data.tag.ndefMessage[0].payload;
    //         let tagId = this.nfc.bytesToString(payload).substring(3);
    //         this.readingTag = false;
    //         this.apiSvc.callGetTag(tagId).subscribe((res) => {
    //           this.res = res
    //           this.cred.product_name = this.res.product_name;
    //           this.alertService.presentAlert('',this.cred.product_name)
    //           this.cred.verified = this.res.verified;
    //           this.cred.tagId = tagId;
    //           // this.apiSvc.callRecordScan(tagId).subscribe((res) => {
    //           // });
    //           this.cred.model_number = this.res.model_number;
    //           this.cred.serial_number = this.res.serial_number;
    //           this.cred.brand = this.res.brand;
    //           this.cred.img = this.res.img;
    //           this.cred.product_details = this.res.product_details;
    //           this.cred.how_to_use_it = this.res.how_to_use_it;
    //           this.cred.manufactured = this.res.manufactured;
    //           this.credKeys.key1 = "Product Name";
    //           this.credKeys.key2 = "Model Number";
    //           this.credKeys.key3 = "Serial Number";
    //           this.credKeys.key4 = "Brand";
    //           this.credKeys.key5 = "Water Resistant";
    //           this.credKeys.key6 = "Display Type";
    //           this.credKeys.key7 = "Series";
    //           this.credKeys.key8 = "Occassion";
    //           this.credKeys.key9 = "Strap";
    //           this.credKeys.key10 = "Manufactured";
    //           this.credKeys.key11 = "Instructions";
    //           this.credKeys.key12 = "Wine Information";
    //           this.credKeys.key13 = "Verified";
    //           // this.helperSvc.hideLoading();
    //         });
    //       }
    //     },
    //       err => {
    //       })
    //   );
    // }
    VerifyitProductCatalogInfoPage.prototype.setStatus = function (message) {
        var _this_1 = this;
        this.alertService.presentAlert("", message);
        this.ngZone.run(function () {
            _this_1.statusMessage = message;
        });
    };
    VerifyitProductCatalogInfoPage.prototype.presentAlertBoughtIt = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: "my-custom-class",
                            inputs: [
                                {
                                    name: "Mobile",
                                    type: "tel",
                                    min: -5,
                                    max: 10
                                }
                            ],
                            buttons: [
                                {
                                    text: "Cancel",
                                    role: "cancel",
                                    cssClass: "secondary",
                                    handler: function () {
                                        console.log("Confirm Cancel");
                                    }
                                },
                                {
                                    text: "Ok",
                                    handler: function (alertData) {
                                        //takes the data
                                        console.log(alertData.Mobile);
                                    }
                                }
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
    VerifyitProductCatalogInfoPage.prototype.showCatalog = function (id) {
        this.utilservice.productId = id;
        this.router.navigateByUrl("/verifyit-product-catalog");
    };
    // readTag() {
    //   if (this.canNFC) {
    //     setTimeout(() => {
    //       this.alertService.presentAlert('','Connecting with Server..');
    //       this.readingTag = true;
    //       this.tagListenerSuccess();
    //     }, 100);
    //   } else {
    //     this.alertService.presentAlert('','NFC is not supported by your Device');
    //   }
    // }
    // boughtIt(tagId){
    //       this.apiSvc.callPostBoughtIt(tagId).subscribe((res) => {
    //         this.alertService.presentAlert('',res);
    //         // this.helperSvc.hideLoading();
    //   });
    //   // this.navCtrl.push(ThankyouPage,{})
    //   this.alertService.presentAlert('','thank you')
    // }
    VerifyitProductCatalogInfoPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    VerifyitProductCatalogInfoPage.prototype.ionViewDidLeave = function () {
        // this.navCtrl.pop();
    };
    // scanqrcode() {
    //   var context = this;
    //   // Optionally request the permission early
    //   this.qrScanner.prepare()
    //     .then((status: QRScannerStatus) => {
    //       if (status.authorized) {
    //         // camera permission was granted
    //         this.alertService.presentAlert('',"scanning");
    //         var ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
    //         // start scanning
    //         let scanSub = this.qrScanner.scan().subscribe((scannedAddress: string) => {
    //           this.alertService.presentAlert('',scannedAddress);
    //           // this.friendAddress = scannedAddress;
    //           this.qrScanner.hide(); // hide camera preview
    //           scanSub.unsubscribe(); // stop scanning
    //           ionApp.style.display = "block";
    //           // this.friendAddressInput.setFocus();
    //         });
    //         // show camera preview
    //         ionApp.style.display = "none";
    //         context.qrScanner.show();
    //         // setTimeout(() => {
    //         //   ionApp.style.display = "block";
    //         //   scanSub.unsubscribe(); // stop scanning
    //         //   // context.friendAddressInput.setFocus();
    //         //   context.qrScanner.hide();
    //         // }, 500000);
    //         // wait for user to scan something, then the observable callback will be called
    //       } else if (status.denied) {
    //         this.alertService.presentAlert('',"Denied permission to access camera");
    //       } else {
    //         this.alertService.presentAlert('',"Something else is happening with the camera");
    //       }
    //     })
    //     .catch((e: any) => console.log('Error is', e));
    // }
    VerifyitProductCatalogInfoPage.prototype.boughtIt = function (tagId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return tslib_1.__generator(this, function (_a) {
                this.apiSvc.callPostBoughtIt(tagId).subscribe(function (res) {
                    console.log(res);
                    _this_1.alertService.presentAlert("", "Thank you so much for letting us know about your purchase. We wish you a great buying experience.");
                    _this_1.router.navigateByUrl("/");
                    // this.helperSvc.hideLoading();
                });
                return [2 /*return*/];
            });
        });
    };
    VerifyitProductCatalogInfoPage.prototype.showCertificates = function (data) {
        this.utilservice.certificateData = data;
        // alert(JSON.stringify(data))
        this.presentModal();
    };
    VerifyitProductCatalogInfoPage.prototype.presentModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: CertificateModalComponent
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VerifyitProductCatalogInfoPage.prototype.trackingLinks = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this_1 = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: "Please Enter your mobile number for cash back.",
                            message: 'Once you submit review please take a screenshot of review and share it with <a href="tel:+91-8527934125">+91-8527934125 </a> (customer care number) on WhatsApp. You will receive cash back after verification process.',
                            inputs: [
                                {
                                    name: "mobile_number",
                                    type: "number"
                                }
                            ],
                            buttons: [
                                {
                                    text: "Cancel",
                                    role: "cancel",
                                    cssClass: "secondary",
                                    handler: function () {
                                        console.log("Confirm Cancel");
                                    }
                                },
                                {
                                    text: "Submit",
                                    handler: function (alertData) {
                                        //takes the data
                                        if (alertData.mobile_number.length > 9) {
                                            console.log(alertData.mobile_number);
                                            _this_1.mobile_number = alertData.mobile_number;
                                            // data.push('mobile_number')
                                            _this_1.trackingReview(data);
                                        }
                                        else {
                                            _this_1.presentToast();
                                            return false;
                                        }
                                    }
                                }
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
    VerifyitProductCatalogInfoPage.prototype.presentToast = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Mobile number is not valid.",
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
    VerifyitProductCatalogInfoPage.prototype.presentActionSheet = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var buttons, _this, actionSheet;
            var _this_1 = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buttons = [];
                        _this = this;
                        data.value.forEach(function (element) {
                            var button = {
                                text: element.text,
                                // icon:data.icon,
                                handler: function () {
                                    // console.log('setting icon ' + this.data.icon);
                                    // const browser = this.iab.create(element.link);
                                    if (_this_1.callgettagresult.brand == "RRC" && data.key == "review") {
                                        _this_1.trackingLinks(element);
                                    }
                                    else {
                                        _this_1.trackingOnlinePurchase(element);
                                        _this_1.openInappBrowser(element);
                                    }
                                }
                            };
                            buttons.push(button);
                        });
                        return [4 /*yield*/, this.actionSheetController.create({
                                header: "Useful Links",
                                cssClass: "my-custom-class",
                                buttons: buttons
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VerifyitProductCatalogInfoPage.prototype.thankyouRedirect = function () {
        this.browser.close();
        this.router.navigateByUrl("/verifyit-message");
    };
    VerifyitProductCatalogInfoPage.prototype.openInappBrowser = function (element) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Browser.open({
                            url: element.link,
                            windowName: "_self",
                            toolbarColor: "	#FF0000"
                        })];
                    case 1:
                        _a.sent();
                        Browser.addListener("browserPageLoaded", function () {
                            // ;
                            // alert("hello===========>");
                            // console.log("hello===========>")
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // createButtons(data) {
    //   let buttons = [];
    //   for (var index in data) {
    //     let button = {
    //       text: data.text,
    //       // icon:data.icon,
    //       handler: () => {
    //         // console.log('setting icon ' + this.data.icon);
    //         return true;
    //       }
    //     }
    //     buttons.push(button);
    //   }
    //   return buttons;
    // }
    VerifyitProductCatalogInfoPage.prototype.presentModal2 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: TellUsifyouBuyitComponent
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VerifyitProductCatalogInfoPage.prototype.socialShare = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var shareRet;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.product_title = this.callgettagresult.product_name;
                        this.brand = this.callgettagresult.brand;
                        this.product_link =
                            "https://nowverifycap.web.app?params=" +
                                window.localStorage.getItem("tagId") +
                                "&source=" +
                                window.localStorage.getItem("token").slice(-10);
                        return [4 /*yield*/, Share.share({
                                title: this.product_title,
                                text: "Hey, Checkout" + " from " + this.brand,
                                url: this.product_link
                                // dialogTitle: 'Share with buddies'
                            })];
                    case 1:
                        shareRet = _a.sent();
                        this.shareTracking();
                        return [2 /*return*/];
                }
            });
        });
    };
    VerifyitProductCatalogInfoPage.prototype.navigateTomsgPage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.router.navigateByUrl("/verifyit-message");
                return [2 /*return*/];
            });
        });
    };
    VerifyitProductCatalogInfoPage.prototype._addListenersToPlayerPlugin = function () {
        var _this_1 = this;
        this._handlerPlay = this._videoPlayer.addListener("jeepCapVideoPlayerPlay", function (data) {
            // console.log('Event jeepCapVideoPlayerPlay ', data);
            _this_1.trackingVideoCompletion("VIDEO_LINK_CLICK");
        }, false);
        this._handlerPause = this._videoPlayer.addListener("jeepCapVideoPlayerPause", function (data) {
            console.log("Event jeepCapVideoPlayerPause ", data);
        }, false);
        this._handlerEnded = this._videoPlayer.addListener("jeepCapVideoPlayerEnded", function (data) { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.log("Event jeepCapVideoPlayerEnded ", data);
                this.trackingVideoCompletion("VIDEO_PLAY_COMPLETE");
                return [2 /*return*/];
            });
        }); }, false);
        this._handlerExit = this._videoPlayer.addListener("jeepCapVideoPlayerExit", function (data) { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.log("Event jeepCapVideoPlayerExit ", data);
                return [2 /*return*/];
            });
        }); }, false);
        this._handlerReady = this._videoPlayer.addListener("jeepCapVideoPlayerReady", function (data) { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
            var isPlaying;
            var _this_1 = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Event jeepCapVideoPlayerReady ", data);
                        console.log("testVideoPlayerPlugin testAPI ", this._testApi);
                        console.log("testVideoPlayerPlugin first ", this._first);
                        if (!(this._testApi && this._first)) return [3 /*break*/, 2];
                        // test the API
                        this._first = false;
                        console.log("testVideoPlayerPlugin calling isPlaying ");
                        return [4 /*yield*/, this._videoPlayer.isPlaying({
                                playerId: "fullscreen"
                            })];
                    case 1:
                        isPlaying = _a.sent();
                        console.log("const isPlaying ", isPlaying);
                        this._apiTimer1 = setTimeout(function () { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
                            var pause, isPlaying, currentTime, muted, setMuted, duration, seektime, setCurrentTime, play;
                            var _this_1 = this;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._videoPlayer.pause({
                                            playerId: "fullscreen"
                                        })];
                                    case 1:
                                        pause = _a.sent();
                                        console.log("const pause ", pause);
                                        return [4 /*yield*/, this._videoPlayer.isPlaying({
                                                playerId: "fullscreen"
                                            })];
                                    case 2:
                                        isPlaying = _a.sent();
                                        console.log("const isPlaying after pause ", isPlaying);
                                        return [4 /*yield*/, this._videoPlayer.getCurrentTime({
                                                playerId: "fullscreen"
                                            })];
                                    case 3:
                                        currentTime = _a.sent();
                                        console.log("const currentTime ", currentTime);
                                        return [4 /*yield*/, this._videoPlayer.getMuted({
                                                playerId: "fullscreen"
                                            })];
                                    case 4:
                                        muted = _a.sent();
                                        console.log("initial muted ", muted);
                                        return [4 /*yield*/, this._videoPlayer.setMuted({
                                                playerId: "fullscreen",
                                                muted: !muted.value
                                            })];
                                    case 5:
                                        setMuted = _a.sent();
                                        console.log("setMuted ", setMuted);
                                        return [4 /*yield*/, this._videoPlayer.getMuted({
                                                playerId: "fullscreen"
                                            })];
                                    case 6:
                                        muted = _a.sent();
                                        console.log("const muted ", muted);
                                        return [4 /*yield*/, this._videoPlayer.getDuration({
                                                playerId: "fullscreen"
                                            })];
                                    case 7:
                                        duration = _a.sent();
                                        console.log("duration ", duration);
                                        seektime = currentTime.value + 0.5 * duration.value < duration.value - 25
                                            ? currentTime.value + 0.5 * duration.value
                                            : duration.value - 25;
                                        return [4 /*yield*/, this._videoPlayer.setCurrentTime({
                                                playerId: "fullscreen",
                                                seektime: seektime
                                            })];
                                    case 8:
                                        setCurrentTime = _a.sent();
                                        console.log("const setCurrentTime ", setCurrentTime);
                                        return [4 /*yield*/, this._videoPlayer.play({
                                                playerId: "fullscreen"
                                            })];
                                    case 9:
                                        play = _a.sent();
                                        console.log("play ", play);
                                        this._apiTimer2 = setTimeout(function () { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
                                            var setMuted, setVolume, volume;
                                            var _this_1 = this;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this._videoPlayer.setMuted({
                                                            playerId: "fullscreen",
                                                            muted: false
                                                        })];
                                                    case 1:
                                                        setMuted = _a.sent();
                                                        console.log("setMuted ", setMuted);
                                                        return [4 /*yield*/, this._videoPlayer.setVolume({
                                                                playerId: "fullscreen",
                                                                volume: 0.5
                                                            })];
                                                    case 2:
                                                        setVolume = _a.sent();
                                                        console.log("setVolume ", setVolume);
                                                        return [4 /*yield*/, this._videoPlayer.getVolume({
                                                                playerId: "fullscreen"
                                                            })];
                                                    case 3:
                                                        volume = _a.sent();
                                                        console.log("Volume ", volume);
                                                        this._apiTimer3 = setTimeout(function () { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
                                                            var pause, duration, volume, setCurrentTime, play;
                                                            return tslib_1.__generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4 /*yield*/, this._videoPlayer.pause({
                                                                            playerId: "fullscreen"
                                                                        })];
                                                                    case 1:
                                                                        pause = _a.sent();
                                                                        console.log("const pause ", pause);
                                                                        return [4 /*yield*/, this._videoPlayer.getDuration({
                                                                                playerId: "fullscreen"
                                                                            })];
                                                                    case 2:
                                                                        duration = _a.sent();
                                                                        console.log("duration ", duration);
                                                                        return [4 /*yield*/, this._videoPlayer.setVolume({
                                                                                playerId: "fullscreen",
                                                                                volume: 1.0
                                                                            })];
                                                                    case 3:
                                                                        volume = _a.sent();
                                                                        console.log("Volume ", volume);
                                                                        return [4 /*yield*/, this._videoPlayer.setCurrentTime({
                                                                                playerId: "fullscreen",
                                                                                seektime: duration.value - 3
                                                                            })];
                                                                    case 4:
                                                                        setCurrentTime = _a.sent();
                                                                        console.log("const setCurrentTime ", setCurrentTime);
                                                                        return [4 /*yield*/, this._videoPlayer.play({
                                                                                playerId: "fullscreen"
                                                                            })];
                                                                    case 5:
                                                                        play = _a.sent();
                                                                        console.log("const play ", play);
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); }, 10000);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }, 10000);
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 5000);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }, false);
    };
    // tracking apis
    VerifyitProductCatalogInfoPage.prototype.shareTracking = function () {
        this.shortToken = window.localStorage.getItem("token");
        var lastFourWord = this.shortToken.slice(-10);
        var lastTentoken = lastFourWord;
        this.trackingData.meta_data.mobile_number = this.mobile_number;
        var shareData = {
            user_id: window.localStorage.getItem("userid"),
            tag_id: window.localStorage.getItem("tagId"),
            product_id: this.callgettagresult.product_id,
            device_id: window.localStorage.getItem("device_id"),
            otype: "SOCIAL_SHARE_CLICK",
            source_token: lastTentoken
        };
        this.apiSvc.reviewTracking(shareData).subscribe(function (res) {
            // this.openInappBrowser(data)
            // alert("tracking done");
        }, function (err) {
            alert(JSON.stringify(err));
        });
    };
    VerifyitProductCatalogInfoPage.prototype.trackingReview = function (data) {
        var _this_1 = this;
        var _this = this;
        if (this.callgettagresult.brand == "RRC") {
            // this.trackingLinks(data)
            _this.trackingData.user_id = window.localStorage.getItem("userid");
            _this.trackingData.tag_id = window.localStorage.getItem("tagId");
            _this.trackingData.product_id = this.callgettagresult.product_id;
            (_this.trackingData.device_id = window.localStorage.getItem("device_id")),
                // _this.trackingData.mobile_number = this.mobile_number
                (_this.trackingData.otype = "REVIEW_LINK_CLICK");
            _this.trackingData.meta_data.mobile_number = this.mobile_number;
            this.apiSvc.reviewTracking(_this.trackingData).subscribe(function (res) {
                _this_1.openInappBrowser(data);
            }, function (err) {
                alert(JSON.stringify(err));
            });
        }
    };
    VerifyitProductCatalogInfoPage.prototype.trackingOnlinePurchase = function (element) {
        // this.shortToken= window.localStorage.getItem('token')
        // let lastFourWord =this.shortToken.slice(-10)
        // let lastTentoken= lastFourWord
        // this.trackingData.meta_data.mobile_number = this.mobile_number
        var shareData = {
            user_id: window.localStorage.getItem("userid"),
            tag_id: window.localStorage.getItem("tagId"),
            product_id: this.callgettagresult.product_id,
            device_id: window.localStorage.getItem("device_id"),
            otype: "PURCHASE_LINK_CLICK"
            // source_token:lastTentoken
        };
        this.apiSvc.reviewTracking(shareData).subscribe(function (res) {
            // this.openInappBrowser(data)
            // alert("tracking online done");
        }, function (err) {
            alert(JSON.stringify(err));
        });
    };
    VerifyitProductCatalogInfoPage.prototype.openQuiz = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: QuizModalComponent,
                            cssClass: 'my-quiz-class'
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // otype:LAND_THROUGH_SOCIAL_SHARING
    VerifyitProductCatalogInfoPage.prototype.trackingVideoCompletion = function (data) {
        var shareData = {
            user_id: window.localStorage.getItem("userid"),
            tag_id: window.localStorage.getItem("tagId"),
            product_id: this.callgettagresult.product_id,
            device_id: window.localStorage.getItem("device_id"),
            otype: data
            // source_token:lastTentoken
        };
        this.apiSvc.reviewTracking(shareData).subscribe(function (res) {
            // this.openInappBrowser(data)
            // alert(' online done')
        }, function (err) {
            alert(JSON.stringify(err));
        });
    };
    VerifyitProductCatalogInfoPage.prototype.openUserModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: Userrole5modalComponent,
                            cssClass: "user-modal",
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VerifyitProductCatalogInfoPage = tslib_1.__decorate([
        Component({
            selector: "app-verifyitproductcataloginfo",
            templateUrl: "./verifyitproductcataloginfo.page.html",
            styleUrls: ["./verifyitproductcataloginfo.page.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [NFC,
            Ndef,
            NavController,
            Platform,
            InAppBrowser,
            NgZone,
            SocialSharing,
            QRScanner,
            Utils,
            AlertServiceService,
            ToastController,
            Router,
            DomSanitizer,
            AlertController,
            NailaService,
            ModalController,
            ActionSheetController])
    ], VerifyitProductCatalogInfoPage);
    return VerifyitProductCatalogInfoPage;
}());
export { VerifyitProductCatalogInfoPage };
//# sourceMappingURL=verifyitproductcataloginfo.page.js.map