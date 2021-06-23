import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NailaService } from '../../services/naila.service';
// import { RewardmodalfirstComponent } from '../../modals/rewardmodalfirst/rewardmodalfirst.component';
import { Utils } from '../../services/utils.service';
// import { Rewardmodal1Component } from '../../modals/rewardmodal1/rewardmodal1.component';
// import { Slides } from 'ionic-angular';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js';
import { ScratchmodalComponent } from '../../modals/scratchmodal/scratchmodal.component';
var verifyitOffer = /** @class */ (function () {
    function verifyitOffer(nailaservice, modalController, utils) {
        this.nailaservice = nailaservice;
        this.modalController = modalController;
        this.utils = utils;
        this.items = [];
    }
    verifyitOffer.prototype.ngOnInit = function () {
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
            var obj = {};
            _this.listbanner.data.forEach(function (item) {
                if (obj[item.brand]) {
                    obj[item.brand].loyalty_points = Number(obj[item.brand].loyalty_points) + Number(item.loyalty_points);
                }
                else {
                    obj[item.brand] = item;
                }
            });
            _this.items = (Object.values(obj));
        });
    };
    verifyitOffer.prototype.setFilteredItems = function () {
        this.items = this.listbanner.data;
        this.items = this.filterItems(this.searchTerm);
    };
    verifyitOffer.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    // async presentModal2(data) {
    //   debugger
    //   this.utils.royaltyData=data
    //   let modal = await this.modalController.create({
    //     component: RewardmodalfirstComponent,
    //     cssClass: "custome-refer-modal",
    //   });
    //   return await modal.present();
    // }
    verifyitOffer.prototype.scratchModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
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
    verifyitOffer.prototype.createNewScratchCard = function () {
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
    verifyitOffer = tslib_1.__decorate([
        Component({
            selector: 'app-verifyitoffer',
            templateUrl: './verifyitoffer.html',
            styleUrls: ['./verifyitoffer.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService, ModalController,
            Utils])
    ], verifyitOffer);
    return verifyitOffer;
}());
export { verifyitOffer };
//# sourceMappingURL=verifyitoffer.js.map