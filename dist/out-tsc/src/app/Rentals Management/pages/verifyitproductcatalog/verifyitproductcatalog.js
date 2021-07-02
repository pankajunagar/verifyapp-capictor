import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NailaService } from '../../services/naila.service';
import { Utils } from '../../services/utils.service';
// import { Slides } from 'ionic-angular';
import { Plugins } from "@capacitor/core";
var Share = Plugins.Share;
var VerifyitProductCatalogPage = /** @class */ (function () {
    function VerifyitProductCatalogPage(nailaservice, utils, router, route) {
        this.nailaservice = nailaservice;
        this.utils = utils;
        this.router = router;
        this.route = route;
        this.groupedProducts = [];
        this.jsonToBeUsed = [];
        this.values = [];
        this.result = [];
        this.listGroupedProduct = [];
    }
    VerifyitProductCatalogPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.route.snapshot.queryParams['brand']) {
            var brand = this.route.snapshot.queryParams['brand'];
            this.brandName = brand;
            this.nailaservice.listRelatedProductsfrombrand(brand).subscribe(function (data) {
                _this.listbanner = data;
                _this.brandName = _this.listbanner.data[0].brand;
                if (_this.listbanner.data[0].meta_data.category) {
                    _this.groupBy(_this.listbanner.data, "category");
                    console.log('=================================>===============');
                    _this.groupedProducts.push(_this.result);
                    Object.keys(_this.result).forEach(function (e) { return _this.jsonToBeUsed.push({ key: e, value: _this.result[e] }); });
                    console.log(_this.jsonToBeUsed);
                    console.log('=================================>===============');
                }
                _this.items = _this.listbanner.data;
                _this.listbanner.data.forEach(function (element) {
                    element.name = element.product_name;
                });
                console.log(_this.listbanner);
            });
        }
        else if (this.route.snapshot.queryParams['product_id']) {
            this.nailaservice.listRelatedProducts(this.route.snapshot.queryParams['product_id']).subscribe(function (data) {
                _this.listbanner = data;
                _this.brandName = _this.listbanner.data[0].brand;
                if (_this.listbanner.data[0].meta_data.category) {
                    _this.groupBy(_this.listbanner.data, "category");
                    console.log('=================================>===============');
                    _this.groupedProducts.push(_this.result);
                    Object.keys(_this.result).forEach(function (e) { return _this.jsonToBeUsed.push({ key: e, value: _this.result[e] }); });
                    console.log(_this.jsonToBeUsed);
                    console.log('=================================>===============');
                }
                _this.items = _this.listbanner.data;
                _this.listbanner.data.forEach(function (element) {
                    element.name = element.product_name;
                });
                console.log(_this.listbanner);
            });
        }
        else {
            this.nailaservice.listRelatedProducts(this.utils.productId).subscribe(function (data) {
                _this.listbanner = data;
                _this.brandName = _this.listbanner.data[0].brand;
                if (_this.listbanner.data[0].meta_data.category) {
                    _this.groupBy(_this.listbanner.data, "category");
                    console.log('=================================>===============');
                    _this.groupedProducts.push(_this.result);
                    Object.keys(_this.result).forEach(function (e) { return _this.jsonToBeUsed.push({ key: e, value: _this.result[e] }); });
                    console.log(_this.jsonToBeUsed);
                    console.log('=================================>===============');
                }
                _this.items = _this.listbanner.data;
                _this.listbanner.data.forEach(function (element) {
                    element.name = element.product_name;
                });
                console.log(_this.listbanner);
            });
        }
        // 
    };
    VerifyitProductCatalogPage.prototype.setFilteredItems = function () {
        this.items = this.listbanner.data;
        this.items = this.filterItems(this.searchTerm);
    };
    VerifyitProductCatalogPage.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    VerifyitProductCatalogPage.prototype.showProductInfo = function (item) {
        debugger;
        this.utils.productCatalogInfo = '';
        this.utils.productCatalogInfo = item;
        this.utils.callgettagresult = item;
        // this.utils.LoadPageOnrouteChange();
        // this.router.navigateByUrl('/verifyit-product-info')
        this.router.navigateByUrl('/verifyit-product-catalog-info');
    };
    VerifyitProductCatalogPage.prototype.groupBy = function (collection, property) {
        var _this = this;
        debugger;
        // var i = 0, val, index
        // for (; i < collection.length; i++) {
        //     val = collection[i].meta_data.category;
        //     index = this.values.indexOf(val);
        //     if (index > -1)
        //         this.result[index].push(collection[i]);
        //     else {
        //         this.values.push(val);
        //         this.result.push([collection[i]]);
        //     }
        // }
        collection.reduce(function (acc, d) {
            if (Object.keys(acc).includes(d.meta_data.category))
                return acc;
            acc[d.meta_data.category] = collection.filter(function (g) { return g.meta_data.category === d.meta_data.category; });
            return _this.result = acc;
            // this.result.push(acc);
        }, {});
    };
    VerifyitProductCatalogPage.prototype.showProductFromGroup = function (value) {
        this.listGroupedProduct = value;
    };
    VerifyitProductCatalogPage.prototype.socialShare = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var shareRet;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.product_title = this.callgettagresult.product_name;
                        // this.brand = this.brandName
                        this.catalog_link =
                            "https://pwa.nowverifyit.com?product_id=" +
                                this.utils.productId;
                        return [4 /*yield*/, Share.share({
                                text: "Hey, Checkout catalogue" + " from " + this.brandName,
                                url: this.catalog_link
                            })];
                    case 1:
                        shareRet = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VerifyitProductCatalogPage = tslib_1.__decorate([
        Component({
            selector: 'app-verifyitproductcatalog',
            templateUrl: './verifyitproductcatalog.html',
            styleUrls: ['./verifyitproductcatalog.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService, Utils, Router, ActivatedRoute])
    ], VerifyitProductCatalogPage);
    return VerifyitProductCatalogPage;
}());
export { VerifyitProductCatalogPage };
//# sourceMappingURL=verifyitproductcatalog.js.map