import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PrivacyPolicyModalComponent } from '../../modals/privacypolicy/privacypolicy.component';
import { TermsModalComponent } from '../../modals/termsandcondition/termsandcondition.component';
import { NailaService } from '../../services/naila.service';
// import { Slides } from 'ionic-angular';
var NailabeauticianAttendance = /** @class */ (function () {
    function NailabeauticianAttendance(nailaservice, alertController, modalController) {
        this.nailaservice = nailaservice;
        this.alertController = alertController;
        this.modalController = modalController;
    }
    NailabeauticianAttendance.prototype.ngOnInit = function () {
        this.beauticianid = window.localStorage.getItem('beautician_id');
    };
    NailabeauticianAttendance.prototype.presentAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: 'Whatsapp',
                            message: 'You can contact Naila Support Team on 7624943335 number.',
                            buttons: ['OK']
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
    // async openCreateRefundModal() {
    //   let modal = await this.modalController.create({
    //     component: RefundModalComponent,
    //   })
    //   return await modal.present();
    // }
    NailabeauticianAttendance.prototype.openPrivacyPolicyModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: PrivacyPolicyModalComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NailabeauticianAttendance.prototype.TandCModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: TermsModalComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NailabeauticianAttendance.prototype.dismiss = function () {
        this.modalController.dismiss({
            'dismissed': true
        });
    };
    NailabeauticianAttendance.prototype.markAttendance = function () {
        var _this = this;
        var data = {
            "beautician_id": this.beauticianid
        };
        this.nailaservice.markAttendance(data).subscribe(function (data) {
            _this.punchindata = data;
            window.localStorage.setItem('punchin_id', _this.punchindata.id);
            alert('Punch In successfully');
        });
    };
    NailabeauticianAttendance.prototype.updateAttendance = function () {
        var data = {
            "beautician_id": this.beauticianid
        };
        this.punchinid = window.localStorage.getItem('punchin_id');
        this.nailaservice.updateAttendance(data, this.punchinid).subscribe(function (data) {
            alert('Punch Out successfully');
        });
    };
    NailabeauticianAttendance = tslib_1.__decorate([
        Component({
            selector: 'app-nailabeauticianattendance',
            templateUrl: './nailabeauticianattendance.html',
            styleUrls: ['./nailabeauticianattendance.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService, AlertController, ModalController])
    ], NailabeauticianAttendance);
    return NailabeauticianAttendance;
}());
export { NailabeauticianAttendance };
//# sourceMappingURL=nailabeauticianattendance.js.map