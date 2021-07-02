import * as tslib_1 from "tslib";
import { Component, NgZone, HostListener } from "@angular/core";
// import { Device } from "@ionic-native/device/ngx";
import { Platform, NavController, LoadingController, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, NavigationStart } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { StorageService } from "./common-services/storage-service.service";
import { Storage } from "@ionic/storage";
import { RentalsUserService } from "./Rentals Management/services/rentals-user.service";
import { AlertServiceService } from "./common-services/alert-service.service";
import { BuildingUserService } from "./Building-Management/services/building-user.service";
import { Utils } from "./Rentals Management/services/utils.service";
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NailaService } from './Rentals Management/services/naila.service';
import { SettingsService } from "./settings.service";
import { Plugins } from '@capacitor/core';
var Device = Plugins.Device;
import { AutocloseOverlaysService } from "./Rentals Management/services/autoclose.service";
var PushNotifications = Plugins.PushNotifications;
var AppComponent = /** @class */ (function () {
    // options: PushOptions = {
    //   android: {},
    //   ios: {
    //   },
    // }
    // pushObject: PushObject = this.push.init(this.options);
    function AppComponent(zone, deeplinks, nfc, ndef, platform, splashScreen, statusBar, 
    // private device:Device,
    router, navCtrl, translate, storageService, storage, loadingCtrl, rentalsUserService, alertService, buildingUserService, autocloseOverlaysService, utils, verifyitservice, settings, alertCtrl) {
        var _this = this;
        this.zone = zone;
        this.deeplinks = deeplinks;
        this.nfc = nfc;
        this.ndef = ndef;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.router = router;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.storageService = storageService;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.rentalsUserService = rentalsUserService;
        this.alertService = alertService;
        this.buildingUserService = buildingUserService;
        this.autocloseOverlaysService = autocloseOverlaysService;
        this.utils = utils;
        this.verifyitservice = verifyitservice;
        this.settings = settings;
        this.alertCtrl = alertCtrl;
        this.selectedTheme = 'red-theme';
        this.appPages = {
            name: "",
            phoneNumber: localStorage.getItem("phoneNumber"),
            pages: [
                //     {
                //   title: "Home",
                //   url: `verifyit-dashboard`,
                //   src: "/assets/imgs/home.svg",
                //   userrole: 'default'
                // },
                {
                    title: "Read NFC/QR",
                    url: "verifyit-dashboard",
                    src: "/assets/imgs/whitenfc.png",
                    userrole: 'default'
                },
                {
                    title: "Write NFC/QR",
                    url: "verifyit-dashboard",
                    src: "/assets/imgs/whitenfc.png",
                    userrole: '2'
                },
                // {
                //   title: "Read QR",
                //   url: `verifyit-dashboard`,
                //   src: "/assets/imgs/whiteqrcode.jpg",
                //   userrole: window.localStorage.getItem("userType")
                // },
                // {
                //   title: "Write QR",
                //   url: `verifyit-dashboard`,
                //   src: "/assets/imgs/whiteqrcode.jpg",
                //   userrole: window.localStorage.getItem("userType")
                // },
                {
                    title: "Account",
                    url: "verifyit-account",
                    src: "assets/imgs/profile1.svg",
                    userrole: "default"
                },
                // {
                //   title: 'Tickets',
                // url: `rentals-naila-ticket-page`,
                //   src: '/assets/imgs/business.svg'
                // },
                // {
                //   title: 'app-component.contact-us',
                // url: `-contact-us`,
                //   src: '/assets/icon/phone.png'
                // },
                // {
                //   title: 'Project ',
                // url: `-my-data-project`,
                //   src: '/assets/icon/phone.png'
                // },
                // {
                //   title: 'Bookings',
                //   url: `rentals-naila-beaut-booking-page`,
                //   src: '/assets/imgs/bookings.svg',
                //   userrole:'Beautician'
                // },
                // {
                //   title: 'Attendance',
                //   url: `rentals-naila-beaut-attendance-page`,
                //   src: '/assets/imgs/business.svg',
                //   userrole:'Beautician'
                {
                    title: 'Rewards',
                    url: "verifyit-rewards",
                    src: '/assets/imgs/offers.svg',
                    userrole: 'default'
                },
                {
                    title: 'Offers',
                    url: "verifyit-offer",
                    src: '/assets/imgs/commerce-and-shopping.svg',
                    userrole: 'default'
                },
            ]
        };
        this.appPages2 = {
            name: "",
            phoneNumber: localStorage.getItem("phoneNumber"),
            pages: [
                //     {
                //   title: "Home",
                //   url: `verifyit-dashboard`,
                //   src: "/assets/imgs/home.svg",
                //   userrole: 'default'
                // },
                {
                    title: "Read QR",
                    url: "verifyit-dashboard",
                    src: "/assets/imgs/whiteqrcode.png",
                    userrole: 'default'
                },
                {
                    title: "Write QR",
                    url: "verifyit-dashboard",
                    src: "/assets/imgs/whiteqrcode.png",
                    userrole: '2'
                },
                // {
                //   title: "Read QR",
                //   url: `verifyit-dashboard`,
                //   src: "/assets/imgs/whiteqrcode.jpg",
                //   userrole: window.localStorage.getItem("userType")
                // },
                // {
                //   title: "Write QR",
                //   url: `verifyit-dashboard`,
                //   src: "/assets/imgs/whiteqrcode.jpg",
                //   userrole: window.localStorage.getItem("userType")
                // },
                {
                    title: "Account",
                    url: "verifyit-account",
                    src: "assets/imgs/profile1.svg",
                    userrole: "default"
                },
                {
                    title: 'Rewards',
                    url: "verifyit-rewards",
                    src: '/assets/imgs/dollar.svg',
                    userrole: 'default'
                },
                {
                    title: 'Offers',
                    url: "verifyit-offer",
                    src: '/assets/imgs/commerce-and-shopping.svg',
                    userrole: 'default'
                },
            ]
        };
        this.username = '';
        this.showButton = false;
        // async presentAlertConfirm() {
        //   const alert = await this.alertCtrl.create({
        //     cssClass: 'my-custom-class',
        //     header: 'Add to home Screen',
        //     // message: 'Message <strong>text</strong>!!!',
        //     buttons: [
        //       {
        //         text: 'Cancel',
        //         role: 'cancel',
        //         cssClass: 'secondary',
        //         handler: (blah) => {
        //           console.log('Confirm Cancel: blah');
        //         }
        //       }, {
        //         text: 'Add',
        //         handler: () => {
        //           console.log('Confirm Okay');
        //           localStorage.setItem('addtohomescreen', '1');
        //           this.addToHomeScreen();
        //         }
        //       }
        //     ]
        //   });
        //   await alert.present();
        // }
        // ionViewWillEnter(){
        //   this.toggleRole('');
        // }
        this.populatemenu = true;
        this.p = {
            userrole: ""
        };
        this.canNFC = false;
        this.settings.getActiveTheme().subscribe(function (val) { return _this.selectedTheme = val; });
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                if (event.navigationTrigger === 'popstate') {
                    _this.autocloseOverlaysService.trigger();
                }
            }
        });
    }
    AppComponent.prototype.onbeforeinstallprompt = function (e) {
        console.log(e);
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e;
        this.showButton = true;
    };
    AppComponent.prototype.addToHomeScreen = function () {
        var _this = this;
        // hide our user interface that shows our A2HS button
        this.showButton = false;
        // Show the prompt
        this.deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice
            .then(function (choiceResult) {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            }
            else {
                console.log('User dismissed the A2HS prompt');
            }
            _this.deferredPrompt = null;
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // if (localStorage.getItem('addtohomescreen') !== '1') {
        //   setTimeout(() => {
        //     this.presentAlertConfirm();
        //   }, 5000)
        // }
        this.utils.LoadPage.subscribe(function (data) {
            if (window.localStorage.getItem("userType")) {
                _this.userrole = window.localStorage.getItem("userType");
                _this.username = window.localStorage.getItem("name");
                _this.showMenulist = true;
                _this.ionViewDidLoad();
            }
            else {
                _this.showMenulist = false;
                _this.ionViewDidLoad();
            }
        });
        if (!window.localStorage.getItem("userType")) {
            this.userrole = window.localStorage.setItem("userType", "1");
        }
        this.username = window.localStorage.getItem("name");
        this.userrole = window.localStorage.getItem("userType");
        this.initializeApp();
    };
    AppComponent.prototype.toggleRole = function (role, title) {
        // this.populatemenu=!this.populatemenu
        if (role == "2") {
            this.p.userrole = "1";
        }
        else if (role == "1") {
            this.p.userrole = "2";
        }
        // if (title != "Account") {
        //   this.utils.LoadPageOnrouteChange();
        // }else
        if (title == 'Read NFC/QR') {
            // debugger
            this.utils.menuTitle = 'Read NFC/QR';
            this.utils.LoadPageOnrouteChange();
        }
        else if (title == 'Write NFC/QR') {
            this.utils.menuTitle = 'Write NFC/QR';
            this.utils.LoadPageOnrouteChange();
        }
        else if (title == 'Write QR') {
            this.utils.menuTitle = 'Write NFC/QR';
            this.utils.LoadPageOnrouteChange();
        }
        else if (title == 'Read QR') {
            // debugger
            this.utils.menuTitle = 'Read NFC/QR';
            this.utils.LoadPageOnrouteChange();
        }
    };
    AppComponent.prototype.ionViewDidLoad = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.platform.ready().then(function () {
                    _this.nfc
                        .enabled()
                        .then(function (resolve) {
                        _this.canNFC = true;
                    })
                        .catch(function (reject) {
                        _this.canNFC = false;
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl
                            .create({
                            spinner: "lines"
                        })
                            .then(function (loading) {
                            loading.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.routeForword = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storageService.getDatafromIonicStorage("appSrc").then(function (val) {
                            _this.appSrc = val;
                            console.log("-----------------", val);
                            _this.router.navigateByUrl("" + url);
                            // this.router.navigateByUrl(`${this.appSrc}${url}`)
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.initializeApp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var device, isLoggedIn;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Device.getInfo()];
                    case 1:
                        device = _a.sent();
                        window.localStorage.setItem('device_id', device.uuid);
                        // alert(device.uuid)
                        console.log("device id=================>" + device.uuid);
                        if (!window.localStorage.getItem('token')) {
                            window.localStorage.setItem('token', '');
                            this.storageService.storeDataToIonicStorage('token', '');
                        }
                        return [4 /*yield*/, this.ionViewDidLoad()];
                    case 2:
                        _a.sent();
                        this.platform.ready().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                this.setupDeeplinks();
                                this.generateToken();
                                // this.setupDeeplinks();
                                // if (this.platform.is('ios')) {
                                //   console.log('trueeeeeeeeeeeeeee====================================')
                                //   wkWebView.injectCookie('http://www.nowverifyit.com/');
                                //   console.log('trueeeeeeeeeeeeeee====================================')
                                // }
                                this.statusBar.styleLightContent();
                                this.statusBar.backgroundColorByHexString("#ffffff");
                                this._initTranslate();
                                this.splashScreen.hide();
                                this.statusBar.styleDefault();
                                this.redirectToHomeOrLogin(isLoggedIn);
                                return [2 /*return*/];
                            });
                        }); });
                        this.pushNotificationInit();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.redirectToHomeOrLogin = function (isLoggedIn) {
        window.localStorage.getItem("uid");
        var registereduser = window.localStorage.getItem("registereduser");
        if (window.localStorage.getItem("user_type") == "Beautician") {
            registereduser == "true"
                ? this.navCtrl.navigateRoot("/rentals-naila-beaut-booking-page")
                : this.navCtrl.navigateRoot("/login");
        }
        else if (window.localStorage.getItem("user_type") == "Customer") {
            registereduser == "true"
                ? this.navCtrl.navigateRoot("/rentals-naila-search-page")
                : this.navCtrl.navigateRoot("/login");
        }
        if (window.localStorage.getItem("cartitem") &&
            window.localStorage.getItem("cartitemcount")) {
            this.utils.cartitem = JSON.parse(window.localStorage.getItem("cartitem"));
            this.utils.cartdata = window.localStorage.getItem("cartitemcount");
        }
    };
    // logout() {
    //   window.localStorage.clear()
    //   this.storage.clear()
    //   this.router.navigateByUrl('/login')
    // }
    AppComponent.prototype.logOut = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        window.localStorage.clear();
                        this.router.navigateByUrl("/login");
                        return [4 /*yield*/, this.loadingCtrl.dismiss()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.updateUser = function (val, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (val == "rentals") {
                    this.rentalsUserService.updateUser(data).subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                case 1:
                                    _a.sent();
                                    window.localStorage.clear();
                                    return [4 /*yield*/, this.storage.clear()];
                                case 2:
                                    _a.sent();
                                    this.navCtrl.navigateRoot("/login");
                                    return [2 /*return*/];
                            }
                        });
                    }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                case 1:
                                    _a.sent();
                                    this.alertService.presentAlert("", "Error while logging out");
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                else if (val == "building-management") {
                    this.buildingUserService.updateUser(data).subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                case 1:
                                    _a.sent();
                                    window.localStorage.clear();
                                    return [4 /*yield*/, this.storage.clear()];
                                case 2:
                                    _a.sent();
                                    this.navCtrl.navigateRoot("/login");
                                    return [2 /*return*/];
                            }
                        });
                    }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                case 1:
                                    _a.sent();
                                    this.alertService.presentAlert("", "Error while logging out");
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype._initTranslate = function () {
        this.translate.setDefaultLang("en");
        this.translate.use("en"); // Set your language here
    };
    AppComponent.prototype.navigatetologinpage = function () {
        this.router.navigateByUrl("/login");
    };
    AppComponent.prototype.setupDeeplinks = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.deeplinks.route('/').subscribe(function (match) {
                    console.log('Successfully matched route', JSON.stringify(match));
                    console.log("=======================>");
                    console.log(match.$args);
                    console.log("=======================>");
                    // Create our internal Router path by hand
                    var internalPath = "/" + match.$route + "/" + match.$args['slug'];
                    // Run the navigation in the Angular zone
                    _this.zone.run(function () {
                        _this.router.navigateByUrl(internalPath);
                    });
                }, function (nomatch) {
                    // nomatch.$link - the full link data
                    console.error("Got a deeplink that didn't match", JSON.stringify(nomatch));
                });
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.platform.ready().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); });
    };
    // private async initDeepLinking(): Promise<void> {
    //   if (this.platform.is('cordova')) {
    //     await this.initDeepLinkingBranchio();
    //   } else {
    //     await this.initDeepLinkingWeb();
    //   }
    // }
    // private async initDeepLinkingWeb(): Promise<void> {
    //   const myparam: string =
    //     this.platform.getQueryParam('$myparam') ||
    //     this.platform.getQueryParam('myparam') ||
    //     this.platform.getQueryParam('%24myparam');
    //   console.log('Parameter', myparam);
    // }
    // private async initDeepLinkingBranchio(): Promise<void> {
    //   try {
    //     const branchIo = window['Branch'];
    //     if (branchIo) {
    //       const data: DeeplinkMatch =
    //         await branchIo.initSession();
    //       if (data.$myparam !== undefined) {
    //         console.log('Parameter', data.$myparam);
    //         this.router.navigateByUrl('/verifyit-account')
    //       }
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    AppComponent.prototype.generateToken = function () {
        var _this = this;
        var token = (window.localStorage.getItem('token'));
        if (!token.length) {
            this.verifyitservice.genToken().subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    //debugger
                    window.localStorage.setItem('token', data.data.token);
                    return [2 /*return*/];
                });
            }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                        case 1:
                            _a.sent();
                            this.alertService.presentAlert("", "Error while logging out");
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    AppComponent.prototype.pushNotificationInit = function () {
        var _this = this;
        PushNotifications.requestPermission().then(function (result) {
            if (result.granted) {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            }
            else {
                _this.alertService.presentAlert("", 'Something went wrong in push notification registration');
            }
        });
        PushNotifications.addListener('registration', function (token) {
            // alert('Push registration success, token: ' + token.value);
            console.log('=====================>');
            console.log('Push registration success, token: ' + token.value);
            console.log('=====================>');
        });
        PushNotifications.addListener('registrationError', function (error) {
            alert('Error on registration: ' + JSON.stringify(error));
        });
        PushNotifications.addListener('pushNotificationReceived', function (notification) {
            _this.router.navigateByUrl('/verifyit-rewards');
            alert('Push received: ' + JSON.stringify(notification));
        });
        PushNotifications.addListener('pushNotificationActionPerformed', function (notification) {
            _this.router.navigateByUrl('/verifyit-rewards');
            // alert('Push action performed: ' + JSON.stringify(notification));
        });
    };
    tslib_1.__decorate([
        HostListener('window:beforeinstallprompt', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onbeforeinstallprompt", null);
    AppComponent = tslib_1.__decorate([
        Component({
            selector: "app-root",
            templateUrl: "app.component.html"
        }),
        tslib_1.__metadata("design:paramtypes", [NgZone,
            Deeplinks,
            NFC,
            Ndef,
            Platform,
            SplashScreen,
            StatusBar,
            Router,
            NavController,
            TranslateService,
            StorageService,
            Storage,
            LoadingController,
            RentalsUserService,
            AlertServiceService,
            BuildingUserService,
            AutocloseOverlaysService,
            Utils,
            NailaService,
            SettingsService,
            AlertController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map