import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RefundModalComponent } from '../../modals/refundmodal/refundmodal.component';
import { PrivacyPolicyModalComponent } from '../../modals/privacypolicy/privacypolicy.component';
import { TermsModalComponent } from '../../modals/termsandcondition/termsandcondition.component';
// import { Slides } from 'ionic-angular';
var VerifyitAccountsPage = /** @class */ (function () {
    // sliderConfig = {
    //   slidesPerView: 1.2,
    //   spaceBetween: 5,
    //   // centeredSlides: true
    // };
    // sliderConfig2 = {
    //   slidesPerView: 3.2,
    //   spaceBetween: 5,
    //   // centeredSlides: true
    // };
    // public searchTerm: string = "";
    // public items: any;
    function VerifyitAccountsPage(alertController, refundmodal, modalController, route) {
        this.alertController = alertController;
        this.refundmodal = refundmodal;
        this.modalController = modalController;
        this.route = route;
        this.accountdetail = {
            name: '',
            email: '',
            mobile: ''
        };
        // this.items = [
        //   { title: "one" },
        //   { title: "two" },
        //   { title: "three" },
        //   { title: "four" },
        //   { title: "five" },
        //   { title: "six" }
        // ];
    }
    VerifyitAccountsPage.prototype.ngOnInit = function () {
        var slug = this.route.snapshot.paramMap.get('slug');
        var url = "https://devdactic.com/wp-json/wp/v2/posts?slug=" + slug + "&_embed";
        this.accountdetail.name = window.localStorage.getItem('name');
        this.accountdetail.email = window.localStorage.getItem('email');
        this.accountdetail.mobile = window.localStorage.getItem('mobile');
        // this.setFilteredItems();
    };
    //   setFilteredItems() {
    //     this.items = this.filterItems(this.searchTerm);
    //   }
    //   filterItems(searchTerm) {
    //     return this.items.filter(item => {
    //       return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    //     });
    //   }
    // a=false;
    VerifyitAccountsPage.prototype.presentAlert = function () {
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
    // async presentRefudAlert() {
    //   const alert = await this.alertController.create({
    //     cssClass: 'custom-refund-alert',
    //     message: 'You can contact Naila Support Team on 7624943335 number.',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    // }
    VerifyitAccountsPage.prototype.openCreateRefundModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: RefundModalComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VerifyitAccountsPage.prototype.openPrivacyPolicyModal = function () {
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
    VerifyitAccountsPage.prototype.TandCModal = function () {
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
    // popOver.onDidDismiss().then(data => {
    //   // if (data.data) {
    //   //   if (data.data.val == 'approve') {
    //   //     // this.approvalUser(id)
    //   //   } else if (data.data.val == 'reject') {
    //   //     // this.rejectUser(id, data.data.notes)
    //   //   }
    //   // }
    // })
    // return await popOver.present()
    VerifyitAccountsPage.prototype.dismiss = function () {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    };
    VerifyitAccountsPage = tslib_1.__decorate([
        Component({
            selector: 'app-verifyitaccountspage',
            templateUrl: './verifyitaccountspage.html',
            styleUrls: ['./verifyitaccountspage.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            RefundModalComponent,
            ModalController,
            ActivatedRoute])
    ], VerifyitAccountsPage);
    return VerifyitAccountsPage;
}());
export { VerifyitAccountsPage };
//# sourceMappingURL=verifyitaccountspage.js.map