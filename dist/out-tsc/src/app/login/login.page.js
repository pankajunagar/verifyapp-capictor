import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController, MenuController, PopoverController, } from '@ionic/angular';
import * as _ from 'lodash';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
import { CountrycodemodalComponent } from './countrycodemodal/countrycodemodal.component';
import { LoginService } from '../common-services/login.service';
import { AlertServiceService } from '../common-services/alert-service.service';
// import { translateService } from '../common-services/translate /translate-service.service';
import { StorageService } from '../common-services/storage-service.service';
import { Router } from '@angular/router';
import { SelectOrganizationComponent } from '../common-components/select-organization/select-organization.component';
import { AddUserComponent } from '../common-components/add-user/add-user.component';
import { NeedHelpComponent } from '../common-components/need-help/need-help.component';
import { HTTP } from '@ionic-native/http/ngx';
import { Utils } from '../Rentals Management/services/utils.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
var LoginPage = /** @class */ (function () {
    function LoginPage(loginService, loading, router, alertService, modalCtrl, http, utils, appSetting, alertController, navCtrl, 
    // private mixpanel: Mixpanel,
    // private smsRetriever: SmsRetriever,
    MenuController, popover, storageService) {
        this.loginService = loginService;
        this.loading = loading;
        this.router = router;
        this.alertService = alertService;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.utils = utils;
        this.appSetting = appSetting;
        this.alertController = alertController;
        this.navCtrl = navCtrl;
        this.MenuController = MenuController;
        this.popover = popover;
        this.storageService = storageService;
        // To store the form data
        this.loginData = {
            countryCode: '+91',
            loginType: 'login'
        };
        // To display error message when both the password is not correct while setting password
        this.passwordMismatch = false;
        this.showOtpCounter = false;
        this.timeLeft = 60;
        /* This variable will decide which input block is visible on screen
        values are ['phoneInput', 'passwordInput', 'otpInput', 'passwordSetInput', 'sendOtpInput']
        */
        this.visibleBlock = 'phoneInput';
        // Only these user types are allowd to use this app
        this.allowedUsers = ['employee', 'admin', 'technician', 'housekeeper'];
        this.route = true;
        this.forgetpassword = true;
        this.passwordType = 'password';
        this.passwordIcon = 'eye-off';
        MenuController.enable(false);
        this.sendotpinput = true;
        this.registereduser = false;
        this.enterpassword = true;
        this.enterotp = true;
        this.newpassword = true;
        // this.mixpanel.init('1350cf4808c3adbdd9ef79625d091dc7').then(success => {
        // }).catch(err => {
        // })
    }
    LoginPage.prototype.ionViewDidLeave = function () {
        this.MenuController.enable(true);
    };
    LoginPage.prototype.ngOnInit = function () {
        // this.mixpanel.track('User entered on login screen');
        // this.presentAddUserModal();
        // this.showProductSelectionPopup()
    };
    LoginPage.prototype.setVisibleBlock = function (type) {
        this.visibleBlock = type;
        if (type === 'sendOtpInput') {
            this.loginData.action = 'resetPassword';
        }
        else {
            this.loginData.action = 'login';
        }
        console.log(this.visibleBlock);
    };
    // This function will display loading screen
    LoginPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            spinner: 'lines'
                        }).then(function (loading) {
                            loading.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // This function will check for user's platform based on his phone number
    LoginPage.prototype.checkPlatform = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loginData.accessCode = '';
                        this.loginData.accessCode1 = '';
                        this.loginData.accessCode2 = '';
                        this.loginData.accessCode3 = '';
                        this.loginData.accessCode4 = '';
                        window.localStorage.removeItem('platform');
                        return [4 /*yield*/, this.storageService.removeItem('platform')];
                    case 1:
                        _a.sent();
                        this.appSetting.platform = '';
                        if (!this.verifyPhone()) {
                            this.alertService.presentAlert("", 'Please enter a valid phone number');
                        }
                        else {
                            localStorage.setItem('phoneNumber', this.loginData.phoneNumber);
                            this.storageService.storeDataToIonicStorage("phoneNumber", this.loginData.phoneNumber);
                            localStorage.setItem('countryCode', this.loginData.countryCode);
                            this.storageService.storeDataToIonicStorage("countryCode", this.loginData.countryCode);
                            this.presentLoading();
                            if (this.appSetting.ORG == "Both") {
                                this.loginService.checkPlatform(this.loginData)
                                    .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.loading.dismiss()];
                                            case 1:
                                                _a.sent();
                                                console.log(data);
                                                if (data.type === 'multi') {
                                                    this.showProductSelectionPopup(data);
                                                }
                                                else if (data.type === 'bm') {
                                                    this.handleUser(data, 'bm');
                                                }
                                                else if (data.type === 'rm') {
                                                    this.handleUser(data, 'rm');
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.loading.dismiss()];
                                            case 1:
                                                _a.sent();
                                                // this.mixpanel.track(' checkplatform service error', {
                                                //   "userdata": this.loginData
                                                // })
                                                this.visibleBlock = 'onboardUser';
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                            else {
                                this.verifyPhoneService();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // If user is found on multiple platforms this function will display a popup to select between platforms
    LoginPage.prototype.showProductSelectionPopup = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.popover.create({
                    component: SelectOrganizationComponent,
                    mode: 'md',
                    componentProps: { data: data },
                    cssClass: 'select-org-popover'
                }).then(function (d) {
                    d.present();
                    d.onDidDismiss().then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!data) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.handleUser(data.data, data.role, true)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                return [2 /*return*/];
            });
        });
    };
    // Check id user is allowed to use this app
    LoginPage.prototype.handleUser = function (data, type, hidethisotp) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("--------******-----------");
                        console.log(data);
                        console.log(type);
                        this.loginData.action = data[type].action;
                        this.loginData.loginType = data[type].action;
                        console.log(this.loginData);
                        console.log("--------******-----------");
                        return [4 /*yield*/, this.appSetting.setPlatformAfterLogin(JSON.stringify(type))];
                    case 1:
                        _a.sent();
                        window.localStorage.setItem('platform', type);
                        return [4 /*yield*/, this.alertService.saveToLocalStorage('platform', type)];
                    case 2:
                        _a.sent();
                        window.localStorage.setItem('types', data[type].types);
                        this.alertService.saveToLocalStorage('types', data[type].types);
                        if (type === 'bm') {
                            window.localStorage.setItem('appSrc', 'building-management');
                            this.alertService.saveToLocalStorage('appSrc', 'building-management');
                        }
                        else {
                            window.localStorage.setItem('appSrc', 'rentals');
                            this.alertService.saveToLocalStorage('appSrc', 'rentals');
                        }
                        if (this.isUserAllowed(data[type].types)) {
                            // if (data[type].action === 'login') {
                            //   this.visibleBlock = 'passwordInput';
                            // } else {
                            if (hidethisotp == true || data[type].action === 'login') {
                                this.verifyPhoneService(true);
                            }
                            else {
                                this.visibleBlock = 'otpInput';
                            }
                            // }
                        }
                        else {
                            this.alertService.presentAlert("", 'You are not allowed to use this app');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // thios method will check if user is alloued to use this app or not 
    LoginPage.prototype.isUserAllowed = function (types) {
        // this.alertService.presentAlert ('Alert',(_.intersection(this.allowedUsers, types).length > 0 ? true : false));
        return (_.intersection(this.allowedUsers, types).length > 0 ? true : false);
    };
    // Common function to set values to localstorage
    LoginPage.prototype.saveToLocalStorage = function (key, value) {
        localStorage.setItem(key, value);
    };
    LoginPage.prototype.saveToIonicStorage = function (key, value) {
        this.storageService.storeDataToIonicStorage(key, value);
    };
    LoginPage.prototype.keyup = function (val, next, prev, current) {
        // this.checkFocus(current,val)
        // console.log("------------------------")
        // console.log("val"+val);
        if (val == "") {
            // console.log("ionChange prev");
            if (this.route == true) {
                prev.setFocus();
            }
        }
        else {
            // console.log("ionChange text");
            if (val !== "") {
                next.setFocus();
            }
        }
        //       // }
        //       // console.log('prev');
        //     } else if (event.key !== 'Backspace') {
        //       this.checkFocus(current)
        //       next.setFocus()
        //     }
    };
    LoginPage.prototype.checkFocus = function (val) {
        // console.log("ionFocus" + val);
        if (val == "") {
            this.route = true;
        }
        else {
            this.route = false;
        }
    };
    LoginPage.prototype.next = function (el, prev, value) {
        this.eventCopy = event;
        // console.log("------------------")
        // console.log(typeof(value))
        // console.log(value)
        // console.log("-------------------")
        // console.log(el)
        // console.log(prev)
        // console.log(this.eventCopy)
        // console.log("------------------")
        if (value) {
            console.log("contains");
        }
        else {
            console.log("empty");
        }
        if (this.eventCopy.key == 'Backspace' && !value) {
            if (prev) {
                prev.setFocus();
            }
        }
        else if (this.eventCopy.key == 'Backspace' && value) {
            // DO nothing
        }
        else {
            el.setFocus();
        }
    };
    // }
    // onchange(val) { }
    // {
    //   if (current.value == '') {
    //     this.route = true
    //   } else {
    //     this.route = false
    //   }
    // }
    LoginPage.prototype.validatePassword = function () {
        console.log(this.loginData);
        if (this.loginData.password
            && this.loginData.passwordCheck
            && String(this.loginData.password) === String(this.loginData.passwordCheck)) {
            this.passwordMismatch = false;
        }
        else {
            this.passwordMismatch = true;
        }
    };
    LoginPage.prototype.validetPhoneNumber = function () {
        var phoneno = /^[6-9]\d{9}$/;
        if (this.loginData.phoneNumber) {
            // localStorage.setItem('phoneNumber', this.loginData.phoneNumber);
            // localStorage.setItem('countryCode', this.loginData.countryCode);
            if (this.loginData.countryCode === '+91') {
                return this.loginData.phoneNumber.match(phoneno) ? true : false;
            }
            else {
                return this.loginData.phoneNumber.length > 4 ? true : false;
            }
        }
        else {
            return false;
        }
    };
    LoginPage.prototype.setValues = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storageService.getDatafromIonicStorage('appSrc').then(function (data) {
                            _this.appSrc = data;
                        })];
                    case 1:
                        _a.sent();
                        window.localStorage.setItem('isLoggedIn', 'true');
                        this.storageService.storeDataToIonicStorage('isLoggedIn', 'true');
                        window.localStorage.setItem('user_id', data.uid);
                        this.storageService.storeDataToIonicStorage('user_id', data.uid);
                        window.localStorage.setItem('token', data.token);
                        this.storageService.storeDataToIonicStorage('token', data.token);
                        this.appSetting.setTokenAferLogin(data.token);
                        // window.localStorage.setItem('ids', JSON.stringify(data.ids));
                        // this.storageService.storeDataToIonicStorage('ids', JSON.stringify(data.ids))
                        window.localStorage.setItem('currencyCode', data.currencyCode);
                        this.storageService.storeDataToIonicStorage('currencyCode', data.currencyCode);
                        // window.localStorage.setItem('homeId', data.ids[0].mId);
                        // this.storageService.storeDataToIonicStorage('homeId', data.ids[0].mId);
                        // window.localStorage.setItem('projectId', data.ids[0].prId);
                        // this.storageService.storeDataToIonicStorage('projectId', data.ids[0].prId);
                        // window.localStorage.setItem('type', data.type);
                        // this.storageService.storeDataToIonicStorage('type', data.type);
                        // window.localStorage.setItem('optedForDiscussion', data.ids[0].config.optedForDiscussion);
                        // this.storageService.storeDataToIonicStorage('optedForDiscussion', data.ids[0].config.optedForDiscussion);
                        // this.navCtrl.navigateRoot(`/${this.appSrc}-home`);
                        this.navCtrl.navigateRoot("/rentals-naila-search-page");
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        // if (this.loginData.accessCode1 && this.loginData.accessCode2 && this.loginData.accessCode3 && this.loginData.accessCode4) {
                        //   this.loginData.accessCode = this.loginData.accessCode1 + "" + this.loginData.accessCode2 + "" + this.loginData.accessCode3 + "" + this.loginData.accessCode4
                        // }
                        this.loginService.login(this.loginData)
                            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.setValues(data);
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.alertService.presentAlert("", err.error.error);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.verifyOtp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        if (this.loginData.accessCode1 && this.loginData.accessCode2 && this.loginData.accessCode3 && this.loginData.accessCode4) {
                            this.loginData.accessCode = this.loginData.accessCode1 + "" + this.loginData.accessCode2 + "" + this.loginData.accessCode3 + "" + this.loginData.accessCode4;
                        }
                        this.loginService.verifyOtp(this.loginData)
                            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.showOtpCounter = false;
                                        this.visibleBlock = 'passwordSetInput';
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        // this.mixpanel.track('verify otp service error', {
                                        //   "userdata": this.loginData,
                                        //   "error": err
                                        // });
                                        this.alertService.presentAlert("", err.error.errors[0]);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.presentAddUserModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: AddUserComponent
                        }).then(function (modal) {
                            modal.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.sendOtp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.validetPhoneNumber()) return [3 /*break*/, 1];
                        this.alertService.presentAlert("", 'Please enter a valid phone number');
                        return [3 /*break*/, 3];
                    case 1:
                        localStorage.setItem('phoneNumber', this.loginData.phoneNumber);
                        localStorage.setItem('countryCode', this.loginData.countryCode);
                        return [4 /*yield*/, this.presentLoading()];
                    case 2:
                        _a.sent();
                        this.loginService.sendOtp(this.loginData)
                            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        // this.smsRetriever.startWatching()
                                        //   .then((res: any) => {
                                        //     // console.log(res)
                                        //     this.retrieveOtp(res.Message, 'verify')
                                        //   })
                                        //   .catch((error: any) => console.error(error));
                                        this.visibleBlock = 'verifyOtpInput';
                                        this.startTimer();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.alertService.presentAlert("", err.error.error);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.resetPassword = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.loginService.reserPassword(this.loginData)
                            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.setValues(data);
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        // this.mixpanel.track('password reset service error', {
                                        //   "userdata": this.loginData,
                                        //   error: err
                                        // });
                                        this.alertService.presentAlert("", err.error.error);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.signIn = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.loginService.signIn(this.loginData)
                            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.setValues(data);
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        // this.mixpanel.track('password reset service error', {
                                        //   "userdata": this.loginData,
                                        //   error: err
                                        // });
                                        this.alertService.presentAlert("", err.error.error);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    // This function will user based on his phone number
    LoginPage.prototype.verifyPhoneService = function (showlaoding) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.verifyPhone()) return [3 /*break*/, 3];
                        if (!(showlaoding == true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.loginService.verifyPhone(this.loginData)
                            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        console.log("Sending otp");
                                        // this.smsRetriever.startWatching()
                                        //   .then((res: any) => {
                                        //     // console.log(res)
                                        //     this.retrieveOtp(res.Message, 'login')
                                        //   })
                                        //   .catch((error: any) => console.error(error));
                                        console.log("-------------------------");
                                        console.log(data.action);
                                        console.log("-------------------------");
                                        if (this.isUserAllowed(data.types)) {
                                            if (data.action == 'login') {
                                                window.localStorage.setItem("types", data.types);
                                                this.alertService.saveToLocalStorage("types", data.types);
                                                this.loginData.loginType = 'login';
                                                this.visibleBlock = 'passwordInput';
                                            }
                                            else {
                                                window.localStorage.setItem("types", data.types);
                                                this.alertService.saveToLocalStorage("types", data.types);
                                                this.loginData.loginType = 'register';
                                                this.visibleBlock = 'otpInput';
                                                this.startTimer();
                                            }
                                        }
                                        // else if (data.types.indexOf('owner') > -1) {
                                        //   this.alertService.presentAlert ('Alert','Owner login is coming soon');
                                        // }
                                        else {
                                            this.alertService.presentAlert("", 'You must be a resident to use this app');
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        if (err.error.error == "User not found") {
                                            this.visibleBlock = 'onboardUser';
                                            // this.showProductSelectionPopup()
                                            // this.alertService.presentAlert("", "It seems you are not in our system")
                                        }
                                        else {
                                            this.alertService.presentAlert("", "Something went wrong");
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 3:
                        this.alertService.presentAlert("", 'Please enter a valid phone number');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //  This function will validate phone number on the basis of ragex phone number
    LoginPage.prototype.verifyPhone = function () {
        var phoneno = /^[6-9]\d{9}$/;
        if (this.loginData.phoneNumber) {
            // this._storage.set("phoneNumber", this.loginData.phoneNumber)
            // this._storage.set("countryCode", this.loginData.countryCode)
            if (this.loginData.countryCode === "+91") {
                return this.loginData.phoneNumber.match(phoneno) ? true : false;
            }
            else {
                return this.loginData.phoneNumber.length > 4 ? true : false;
            }
        }
        else {
            return false;
        }
    };
    LoginPage.prototype.showCountryCodeModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: CountrycodemodalComponent,
                            cssClass: 'my-custom-modal-css',
                            componentProps: { 'value': this.loginData.countryCode }
                        }).then(function (modal) {
                            modal.present();
                            modal.onDidDismiss().then(function (data) {
                                _this.loginData.countryCode = data.data ? data.data : '+91';
                                // console.log(data.data, "Data from country code modal");
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.startTimer = function () {
        var _this = this;
        this.timeLeft = 60;
        this.showOtpCounter = true;
        this.interval = setInterval(function () {
            if (_this.timeLeft == 0) {
                _this.showOtpCounter = false;
                clearInterval(_this.interval);
            }
            else {
                _this.timeLeft--;
            }
        }, 1000);
    };
    LoginPage.prototype.retrieveOtp = function (string, action) {
        // console.log(string);
        var _this = this;
        var pattern = /\d{4}/;
        var messageData = string;
        try {
            var otp = (messageData.match(pattern)[0]);
            if (otp) {
                this.loginData.accessCode = otp;
            }
            otp = otp.split("");
            otp.forEach(function (element, index) {
                _this.loginData["accessCode" + (index + 1)] = element;
                // console.log(element, index);
                // console.log(this.loginData)
            });
            if (action == 'login') {
                this.login();
            }
            else {
                this.verifyOtp();
            }
        }
        catch (err) {
            // console.log(err);
        }
    };
    LoginPage.prototype.needHelp = function () {
        this.modalCtrl.create({
            component: NeedHelpComponent,
        }).then(function (modal) {
            modal.present();
        });
    };
    LoginPage.prototype.userSignup = function () {
        var _this = this;
        this.sendOtpInput = false;
        this.enterotp = true;
        var data = {
            mobile: "+91" + this.loginData.phoneNumber
        };
        this.loginService.userSignup(data).subscribe(function (data) {
            if (data) {
                _this.enterotp = false;
                _this.sendotpinput = true;
            }
        }, function (err) {
            _this.alertService.presentAlert("", err.error.errors[0]);
        });
    };
    LoginPage.prototype.toggleSignup = function () {
        this.sendotpinput = true;
        this.registereduser = true;
        this.enterotp = true;
        this.newpassword = false;
    };
    LoginPage.prototype.confirmOtp = function () {
        var _this = this;
        var data = {
            mobile: "+91" + this.loginData.phoneNumber,
            otp: this.loginData.accessCode1 +
                this.loginData.accessCode2 +
                this.loginData.accessCode3 +
                this.loginData.accessCode4
        };
        this.loginService.confirmOtp(data).subscribe(function (data) {
            if (data) {
                _this.enterotp = true;
                _this.sendotpinput = true;
                _this.newpassword = false;
            }
        });
    };
    LoginPage.prototype.registerUser = function () {
        var _this = this;
        var data = {
            "fullname": this.loginData.name,
            "email": this.loginData.phoneNumber,
            "password": this.loginData.password,
            "repassword": this.loginData.passwordCheck,
            "gender": this.loginData.gender,
            "signup-as": 'user',
            "mobile": this.loginData.mobile,
        };
        // http://www.nowverifyit.com/index.php/register?email=sandeep25@vernacular.ai&signup-as=user&fullname=Sandeep Parihar&mobile=9910223580&password=123&repassword=123&gender=M
        this.loginService.registerUser(data).subscribe(function (data) {
            var myCookie = Cookie.get('Cookies');
            console.log("===============>" + myCookie);
            if (data) {
                _this.enterotp = true;
                _this.sendotpinput = true;
                _this.newpassword = true;
                _this.registereduser = false;
            }
        }, function (err) {
            _this.alertService.presentAlert("", err.error.errors[0]);
        });
    };
    LoginPage.prototype.registeredUser = function () {
        var _this = this;
        var data = {
            "email": this.loginData.phoneNumber,
            "password": this.loginData.password
        };
        this.loginService.registeredUser(data).subscribe(function (data) {
            console.log("============>>" + JSON.stringify(data.headers));
            // let headers = data.headers;
            // let myCookie = Cookie.get('Set-Cookie')
            // alert(JSON.stringify(headers))
            // console.log("===============>" + myCookie)
            window.localStorage.setItem('name', data.data.name);
            window.localStorage.setItem('email', data.data.email);
            window.localStorage.setItem('mobile', data.data.mobile);
            window.localStorage.setItem('userid', data.data.id);
            window.localStorage.setItem('token', data.data.token);
            if (window.localStorage.getItem('name')) {
                if (data.data.userType == 4) {
                  
                    window.localStorage.setItem('showDeactivate', '4');
                    data.data.userType = 2;
                    window.localStorage.setItem('userType', data.data.userType);
                }
                else {
                    window.localStorage.setItem('userType', data.data.userType);
                }
                _this.utils.userType = window.localStorage.getItem('userType');
                window.localStorage.setItem('userType', data.data.userType);
                _this.router.navigateByUrl('/verifyit-dashboard');
            }
            _this.utils.LoadPageOnrouteChange();
            if (data.description.length) {
                _this.loginService.loginUserInfo().subscribe(function (data) {
                    // alert('helloooooo1')
                    console.log('fhgfhgfghfghfhgfhgfhg========================');
                    console.log(data);
                    console.log('fhgfhgfghfghfhgfhgfhg========================');
                    // this.alertService.presentAlert(" user info data", this.utils.userType=window.localStorage.getItem('userType'));
                    // this.router.navigateByUrl('/verifyit-dashboard')
                }, function (err) {
                    // alert('helloooooo2')
                    console.log('errorrrrrr===========================>>>>>>>>>>>>>>>>>>>>', err);
                    console.log(err);
                    console.log('errorrrrrr===========================>>>>>>>>>>>>>>>>>>>>', err);
                  
                    // this.alertService.presentAlert(" userinfo data error", err.error.errors[0]);
                });
            }
            // if (data.role.name=='Customer') {
            //   window.localStorage.setItem('uid', data.uid);
            //   window.localStorage.setItem('registereduser', 'true');
            //   window.localStorage.setItem('user_id', data.id);
            //   window.localStorage.setItem('user_type', data.role.name);
            //   window.localStorage.setItem('firstName', data.name);
            //   this.firstname=window.localStorage.getItem('firstName')
            //   this.firstname=this.firstname.split(" ")[0];
            //   this.userrole = window.localStorage.getItem('user_type')
            //   this.utils.userrole=this.userrole
            //   this.enterotp = true;
            //   this.sendotpinput = true;
            //   this.newpassword=true;
            //   this.registereduser = false;
            //   this.enterpassword=true;
            // }
            // else{
            //   window.localStorage.setItem('role_id', data.role_id);
            //   window.localStorage.setItem('registereduser', 'true');
            //   window.localStorage.setItem('beautician_id', data.id);
            //   window.localStorage.setItem('user_type', data.role.name);
            //   window.localStorage.setItem('firstName', data.name);
            //   this.firstname=window.localStorage.getItem('firstName')
            //   this.firstname=this.firstname.split(" ")[0];
            //   this.userrole = window.localStorage.getItem('user_type')
            //   this.utils.userrole=this.userrole
            //   this.enterotp = true;
            //   this.sendotpinput = true;
            //   this.newpassword=true;
            //   this.registereduser = false;
            //   this.enterpassword=true;
            //   this.router.navigateByUrl('/rentals-naila-beaut-booking-page')
            // }
        }, function (err) {
            // alert('hello login'+ err.error.errors)
            _this.alertService.presentAlert("", err.error.errors[0]);
        });
    };
    LoginPage.prototype.editNumber = function () {
        this.enterotp = true;
        this.sendotpinput = true;
        this.newpassword = true;
        this.registereduser = false;
        this.enterpassword = true;
        this.forgetpassword = true;
    };
    LoginPage.prototype.togglesubmitpassword = function () {
        this.enterotp = true;
        this.sendotpinput = true;
        this.newpassword = true;
        this.registereduser = true;
        this.enterpassword = false;
        this.forgetpassword = true;
    };
    LoginPage.prototype.toggelLoginClicked = function () {
        this.enterotp = true;
        this.sendotpinput = true;
        this.newpassword = true;
        this.registereduser = false;
        this.enterpassword = true;
        this.forgetpassword = true;
    };
    LoginPage.prototype.togglereset = function () {
        this.enterotp = true;
        this.sendotpinput = true;
        this.newpassword = true;
        this.registereduser = true;
        this.enterpassword = true;
        this.forgetpassword = false;
    };
    LoginPage.prototype.editresendNumber = function () {
        this.sendotpinput = false;
        this.registereduser = true;
        this.enterotp = true;
        this.newpassword = true;
        this.forgetpassword = true;
    };
    LoginPage.prototype.resendOtp = function () {
        var _this = this;
        var data = {
            mobile: "+91" + this.loginData.phoneNumber
        };
        this.loginService.resendOtp(data).subscribe(function (data) {
        }, function (err) {
            _this.alertService.presentAlert("", err.error.errors[0]);
        });
    };
    LoginPage.prototype.forgotPassword = function () {
        var _this = this;
        var data = {
            "contact": "+91" + this.loginData.phoneNumber,
            "password": this.loginData.password
        };
        this.loginService.forgotPassword(data).subscribe(function (data) {
          
            _this.enterotp = true;
            _this.sendotpinput = true;
            _this.newpassword = true;
            _this.registereduser = false;
            _this.enterpassword = true;
            _this.forgetpassword = true;
        }, function (err) {
          
            _this.alertService.presentAlert("", err.error.errors[0]);
        });
    };
    LoginPage.prototype.hideShowPassword = function () {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [LoginService,
            LoadingController,
            Router,
            AlertServiceService,
            ModalController,
            HTTP,
            Utils,
            MainAppSetting,
            AlertController,
            NavController,
            MenuController,
            PopoverController,
            StorageService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map