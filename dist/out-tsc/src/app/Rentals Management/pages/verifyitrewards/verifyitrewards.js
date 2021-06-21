import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NailaService } from '../../services/naila.service';
import { RewardmodalfirstComponent } from '../../modals/rewardmodalfirst/rewardmodalfirst.component';
import { Utils } from '../../services/utils.service';
// import { Rewardmodal1Component } from '../../modals/rewardmodal1/rewardmodal1.component';
// import { Slides } from 'ionic-angular';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js';
import { ScratchmodalComponent } from '../../modals/scratchmodal/scratchmodal.component';
var Verifyitrewards = /** @class */ (function () {
    function Verifyitrewards(nailaservice, modalController, utils) {
        this.nailaservice = nailaservice;
        this.modalController = modalController;
        this.utils = utils;
        this.items = [];
        this.hasExpired = false;
    }
    Verifyitrewards.prototype.ngOnInit = function () {
        // this.scratchModal()
        var _this = this;
        // this.createNewScratchCard();
        var data;
        this.nailaservice.getLoyaltyPointByuser(data).subscribe(function (data) {
            _this.listbanner = data;
            // this.items=this.listbanner.data
            // this.listbanner.data.forEach(element => {
            //   element.name= element.product_name
            // });
            var today = new Date();
            var day = today.getDate();
            var obj = {};
            _this.listbanner.data.forEach(function (item) {
                // debugger
                var splitdate = (item["validity"]);
                _this.checkExpiredCoupon(splitdate);
                if (obj[item.brand] && _this.hasExpired) {
                    obj[item.brand].loyalty_points = Number(obj[item.brand].loyalty_points) + Number(item.loyalty_points);
                }
                else {
                    obj[item.brand] = item;
                    var b = Object.values(obj);
                    var c = b[0];
                    debugger;
                    _this.items.push(c);
                    console.log(_this.items);
                }
            });
            _this.items = (Object.values(obj));
        });
    };
    Verifyitrewards.prototype.setFilteredItems = function () {
        this.items = this.listbanner.data;
        this.items = this.filterItems(this.searchTerm);
    };
    Verifyitrewards.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    Verifyitrewards.prototype.presentModal2 = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        this.utils.royaltyData = data;
                        return [4 /*yield*/, this.modalController.create({
                                component: RewardmodalfirstComponent,
                                cssClass: "custome-refer-modal",
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Verifyitrewards.prototype.scratchModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        return [4 /*yield*/, this.modalController.create({
                                component: ScratchmodalComponent,
                                cssClass: "scratch-modal",
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Verifyitrewards.prototype.createNewScratchCard = function () {
        var scContainer = document.getElementById('js--sc--container');
        var sc = new ScratchCard('#js--sc--container', {
            scratchType: SCRATCH_TYPE.CIRCLE,
            containerWidth: 300,
            containerHeight: 300,
            imageForwardSrc: 'assets/scanqrcode.png',
            //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
            htmlBackground: '<div class="cardamountcss"><div class="won-amnt">30</div><div class="won-text">Points<br>Won!</div></div>',
            clearZoneRadius: 40,
            nPoints: 30,
            pointSize: 4,
            callback: function () {
                console.log('Now the window will reload !');
            }
        });
        // Init
        sc.init();
    };
    Verifyitrewards.prototype.checkExpiredCoupon = function (date) {
        debugger;
        this.currentDate = new Date();
        this.substractDate = new Date(date * 1000).toISOString();
        this.substractDate = new Date(this.substractDate);
        if (this.currentDate < this.substractDate) {
            this.hasExpired = true;
        }
        else {
            this.hasExpired = false;
        }
    };
    Verifyitrewards = tslib_1.__decorate([
        Component({
            selector: 'app-verifyitrewards',
            templateUrl: './verifyitrewards.html',
            styleUrls: ['./verifyitrewards.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService, ModalController,
            Utils])
    ], Verifyitrewards);
    return Verifyitrewards;
}());
export { Verifyitrewards };
//# sourceMappingURL=verifyitrewards.js.map