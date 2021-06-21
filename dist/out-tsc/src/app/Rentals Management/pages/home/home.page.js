import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Push } from '@ionic-native/push/ngx';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Storage } from '@ionic/storage';
import { RentalsUserService } from '../../services/rentals-user.service';
import { Device } from '@ionic-native/device/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
var HomePage = /** @class */ (function () {
    function HomePage(ticketService, 
    // private barcodeScanner: BarcodeScanner,
    loadingCtrl, router, modalController, userService, alertService, push, transService, storage, device, alertCtrl, _navCtrl) {
        var _this = this;
        this.ticketService = ticketService;
        this.loadingCtrl = loadingCtrl;
        this.router = router;
        this.modalController = modalController;
        this.userService = userService;
        this.alertService = alertService;
        this.push = push;
        this.transService = transService;
        this.storage = storage;
        this.device = device;
        this.alertCtrl = alertCtrl;
        this._navCtrl = _navCtrl;
        this.loading = true;
        this.options = {
            android: {},
            ios: {},
        };
        this.pushObject = this.push.init(this.options);
        this.pushObject.on('registration')
            .subscribe(function (registration) {
            _this.registrationId = registration.registrationId;
        }, function (err) {
            // this.alertService.presentAlert('Error from push', err);
        });
        this.pushObject.on('notification').subscribe(function (notification) {
            _this.loading = false;
            console.log(JSON.stringify(notification));
            // alert(JSON.stringify(notification.additionalData.id));
            if (notification.additionalData.type == 'discussion') {
                _this.presentAlert(notification.title + " " + notification.message);
                console.log('discussion');
                if (notification.additionalData.id) {
                    console.log('discussion with id');
                    _this._navCtrl.navigateForward("/rentals-notice-details", {
                        queryParams: {
                            did: notification.additionalData.id
                        }
                    });
                }
                else {
                    console.log('discussion without id');
                    _this._navCtrl.navigateForward("/rentals-notice-board");
                }
            }
            else if (notification.additionalData.type == 'ticket') {
                _this.presentAlert(notification.title);
                if (notification.additionalData.id) {
                    _this._navCtrl.navigateForward("/rentals-ticket-details", {
                        queryParams: {
                            ticketId: notification.additionalData.id
                        }
                    });
                }
                else {
                    _this._navCtrl.navigateForward('/rentals-tickets');
                }
            }
            // else if (notification.additionalData.type == 'approval') {
            //   this.router.navigateByUrl(`/rentals-user-approval`);
            // } else if (notification.additionalData.type == 'estimate') {
            //   this.router.navigateByUrl(`/rentals-ticket-details?eid=${notification.additionalData.id}`);
            // }
        }, function (err) {
            // alert(JSON.stringify(err))
        });
    }
    HomePage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
                            spinner: 'crescent'
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
    HomePage.prototype.ionViewDidEnter = function () {
        this.loading == true ? this.presentLoading() : '';
        this.getTicketStats();
    };
    HomePage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.getUserDetails();
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.openCreateNoticeModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: CreateNoticeComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.presentAlert = function (header) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: header,
                            // message: message,
                            cssClass: 'notifivation-alert',
                            buttons: [{
                                    text: 'OK',
                                    cssClass: 'width-100-percent alert-button-inner.sc-ion-alert-md',
                                }]
                        }).then(function (alert) {
                            alert.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getRoundedTime = function () {
        var d = new Date();
        // alert(d)
        var ratio = d.getMinutes() / 60;
        // alert(ratio)
        // Past 30 min mark, return epoch at +1 hours and 0 minutes
        if (ratio > 0.5) {
            // alert((d.getHours() + 1) * 3600)
            return (d.getHours() + 1) * 3600;
        }
        // Return epoch at 30 minutes past current hour
        // alert((d.getHours() * 3600) + 1800)
        return (d.getHours() * 3600) + 1800;
    };
    HomePage.prototype.getUserDetails = function () {
        var _this = this;
        this.userService.getUserById(window.localStorage.getItem('user_id'))
            .subscribe(function (data) {
            _this.userDetails = data;
            console.log(_this.userDetails);
            _this.userDetails.businessAppDevice = {
                id: '',
                pushToken: _this.registrationId,
                fcmToken: true,
                deviceId: _this.device.uuid,
                platform: _this.device.platform ? _this.device.platform.toLowerCase() : '',
                newApp: true
            };
            console.log('After', _this.userDetails);
            _this.pushNotifications();
            if (_this.userDetails.firstName) {
                window.localStorage.setItem('firstName', _this.userDetails.firstName);
                _this.storage.set('firstName', _this.userDetails.firstName);
            }
            if (_this.userDetails.lastName) {
                window.localStorage.setItem('lastName', _this.userDetails.lastName);
                _this.storage.set('lastName', _this.userDetails.lastName);
            }
        }, function (err) {
            console.log('error getting user details');
        });
    };
    HomePage.prototype.navigate = function (path) {
        this.router.navigateByUrl("/" + window.localStorage.getItem('appSrc') + "-" + path);
    };
    HomePage.prototype.getTicketStats = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.ticketService.getTicketStats()
                    .subscribe(function (data) {
                    _this.loading == true ? _this.loadingCtrl.dismiss() : '';
                    _this.loading = false;
                    _this.ticketStats = data;
                    console.log(_this.ticketStats);
                }, function (err) {
                    _this.loading == true ? _this.loadingCtrl.dismiss() : '';
                    _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.pushNotifications = function () {
        if (this.registrationId) {
            this.userService.updateUser(this.userDetails).subscribe(function (data) {
                // console.log(data);
                // alert('success');
            }, function (err) {
                // alert('Error')
                console.log(err);
            });
        }
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [TicketService,
            LoadingController,
            Router,
            ModalController,
            RentalsUserService,
            AlertServiceService,
            Push,
            TranslateServiceService,
            Storage,
            Device,
            AlertController,
            NavController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map