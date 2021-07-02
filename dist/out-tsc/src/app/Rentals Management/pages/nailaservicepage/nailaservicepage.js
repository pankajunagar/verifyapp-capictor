import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Utils } from '../../services/utils.service';
// import { Slides } from 'ionic-angular';
var NailaservicePage = /** @class */ (function () {
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
    function NailaservicePage(utils, router, alertController) {
        this.utils = utils;
        this.router = router;
        this.alertController = alertController;
        this.disablebutton = false;
        // this.items = [
        //   { title: "one" },
        //   { title: "two" },
        //   { title: "three" },
        //   { title: "four" },
        //   { title: "five" },
        //   { title: "six" }
        // ];
        this.restrictproductadd = [];
        this.itemcounter = 0;
    }
    NailaservicePage.prototype.ngOnInit = function () {
        var _this = this;
        if (window.localStorage.getItem('cartitem')) {
            this.utils.cartdata = window.localStorage.getItem('cartitemcount');
            this.utils.cartitem = JSON.parse(window.localStorage.getItem('cartitem'));
        }
        else {
            this.utils.cartitem = [];
            this.utils.cartdata = [];
        }
        // this.setFilteredItems();
        console.log(this.utils.storage);
        // this.addTocart(this.utils.storage)
        if (window.localStorage.getItem('cartitem')) {
            this.restrictproductadd = JSON.parse(window.localStorage.getItem('cartitem'));
            this.restrictproductadd.forEach(function (element) {
                if (_this.utils.storage.name === element.service.name && element.servicecount > 0) {
                    _this.disablebutton = true;
                    _this.disabledButton();
                    // this.router.navigateByUrl('/rentals-naila-search-page')
                    // alert("Product already added")
                }
            });
        }
        this.percentagediscount = Math.trunc(this.percentage(this.utils.storage.offer_price, this.utils.storage.price));
    };
    NailaservicePage.prototype.percentage = function (partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
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
    NailaservicePage.prototype.itemCounter = function (plusminus) {
        if (plusminus == "plus" && this.itemcounter >= 0) {
            this.itemcounter = this.itemcounter + 1;
        }
        else if (plusminus == "minus" && this.itemcounter > 0) {
            this.itemcounter = this.itemcounter - 1;
        }
    };
    NailaservicePage.prototype.addTocart = function (data) {
        this.utils.cartitem.push({
            'service': data,
            'servicecount': 1
        });
        this.utils.cartdata = this.utils.cartitem.length;
        window.localStorage.setItem('cartitem', JSON.stringify(this.utils.cartitem));
        window.localStorage.setItem('cartitemcount', JSON.stringify(this.utils.cartitem.length));
        // this.utils.cartdata= this.utils.cartdata.reduce((a, b) => a + b, 0) 
    };
    // disabledButton(){
    //     alert("Product already added.If you want to increase the quantity please go to cart.")
    // }
    NailaservicePage.prototype.disabledButton = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            message: 'Product already added.If you want to increase the quantity please go to cart.',
                            buttons: [
                                {
                                    text: 'Continue Shopping',
                                    // role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        // console.log('Confirm Cancel: blah');
                                        _this.router.navigateByUrl('/rentals-naila-search-page');
                                    }
                                }, {
                                    text: 'Go to Cart',
                                    handler: function () {
                                        _this.router.navigateByUrl('/rentals-naila-cart-page');
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
    NailaservicePage.prototype.ionViewWillLeave = function () {
        var _this = this;
        window.localStorage.removeItem('coupon_id');
        this.cartitemcounter = 0;
        this.utils.cartitem = JSON.parse(window.localStorage.getItem('cartitem'));
        this.locatemp = this.utils.cartitem;
        if (!this.utils.cartitem) {
            this.utils.cartitem = [];
        }
        var filtercartitem = this.utils.cartitem.filter(function (element) {
            return (element.servicecount > 0);
        });
        if (filtercartitem.length) {
            filtercartitem.forEach(function (element) {
                _this.cartitemcounter = element.servicecount + _this.cartitemcounter;
            });
            window.localStorage.setItem('cartitem', JSON.stringify(filtercartitem));
            window.localStorage.setItem('cartitemcount', this.cartitemcounter);
        }
    };
    NailaservicePage = tslib_1.__decorate([
        Component({
            selector: 'app-nailaservicepage',
            templateUrl: './nailaservicepage.html',
            styleUrls: ['./nailaservicepage.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Utils, Router, AlertController])
    ], NailaservicePage);
    return NailaservicePage;
}());
export { NailaservicePage };
//# sourceMappingURL=nailaservicepage.js.map