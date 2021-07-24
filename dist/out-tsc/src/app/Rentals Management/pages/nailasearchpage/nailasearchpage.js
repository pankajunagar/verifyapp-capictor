import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NailaService } from '../../services/naila.service';
import { Utils } from '../../services/utils.service';
var NailasearchPage = /** @class */ (function () {
    function NailasearchPage(nailaService, utils, router) {
        this.nailaService = nailaService;
        this.utils = utils;
        this.router = router;
        this.sliderConfig = {
            slidesPerView: 1.2,
            spaceBetween: 5,
        };
        this.sliderConfig2 = {
            slidesPerView: 3.2,
            spaceBetween: -50,
        };
        this.searchTerm = "";
        this.serviceList = [];
        this.showSubheading = false;
        this.a = false;
        this.characters = [];
    }
    NailasearchPage.prototype.ngOnInit = function () {
        var _this = this;
        this.nailaService.apartmentList().subscribe(function (data) {
            _this.apartmentList = data;
            _this.items = data;
            // console.log(this.apartmentList)
        });
        this.browseBycategory();
        this.nailaService.listBanners().subscribe(function (data) {
            _this.listofBanner = data;
        });
    };
    NailasearchPage.prototype.ionViewWillEnter = function () {
      
        if (window.localStorage.getItem('cartitemcount')) {
            this.utils.cartdata = window.localStorage.getItem('cartitemcount');
        }
        else {
            this.utils.cartdata = [];
        }
        if (this.utils.bookingdata) {
            alert(this.utils.bookingdata);
            this.nailaService.createBooking(this.utils.bookingdata).subscribe(function (data) {
            });
        }
    };
    NailasearchPage.prototype.browseBycategory = function () {
        var _this = this;
      
        this.nailaService.browseBycategory().subscribe(function (data) {
            console.log(data);
            _this.categories = data;
            _this.selectedCategory(data[0]);
        });
    };
    NailasearchPage.prototype.selectedCategory = function (data) {
        var _this = this;
        this.cardName = data.name;
        var list = [];
        this.nailaService.selectedCategory(data.id).subscribe(function (data) {
            console.log("selected", data);
            _this.categoryList = data;
            _this.filterserviceData(data);
        });
    };
    NailasearchPage.prototype.filterserviceData = function (data) {
        var _this = this;
        this.characters = [];
        this.serviceList = [];
        this.showSubheading = false;
        if (data.length && data[0].sub_category_id && data[0].sub_category) {
            data.forEach(function (element) {
                if (element.sub_category && element.category_id == element.sub_category.category_id) {
                    _this.serviceList.push({
                        data: element,
                        name: element.sub_category.name
                    });
                    _this.showSubheading = true;
                }
            });
            var result = this.serviceList.reduce(function (h, _a) {
                var data = _a.data, name = _a.name;
                var _b;
                return Object.assign(h, (_b = {}, _b[name] = (h[name] || []).concat({ data: data, name: name }), _b));
            }, {});
            var results = Object.keys(result);
            // var characters = [ ];
            for (var prop in result) {
                if (result.hasOwnProperty(prop)) {
                    this.characters.push({
                        name: prop,
                        data: result[prop]
                    });
                }
            }
            this.serviceList = [];
            this.serviceList.push(this.characters);
        }
        else {
            this.characters = [];
            data.forEach(function (element) {
                _this.characters.push({
                    name: '',
                    data: [element]
                });
            });
            // this.characters=data
            // console.log("elseeeeeepart",this.serviceList)
            console.log("=========================change", this.characters, "================================");
            this.showSubheading = false;
        }
    };
    NailasearchPage.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    NailasearchPage.prototype.setFilteredItems = function () {
        this.items = this.apartmentList;
        this.items = this.filterItems(this.searchTerm);
    };
    NailasearchPage.prototype.selectedApartment = function (item) {
        this.searchTerm = item.name;
        window.localStorage.setItem('apartment_name', item.name);
        window.localStorage.setItem('apartment_id', item.id);
    };
    NailasearchPage.prototype.onOuterClick = function (e) {
        if (e.target.classList.contains('ioncontent')) {
            console.log('ioncontent');
            this.a = false;
        }
        else if (e.target.classList.contains('searchbar-input')) {
            console.log('ionsearch');
            this.a = true;
        }
        else if (e.target.classList.contains('item') && e.target.classList.contains('in-list')) {
            console.log('list');
            this.a = false;
        }
    };
    // listofservices
    NailasearchPage.prototype.setDetailsofservice = function (data) {
      
        if (data.data) {
            this.utils.storage = data.data;
        }
        else {
            this.utils.storage = data;
        }
        this.router.navigateByUrl('/rentals-naila-service-page');
    };
    NailasearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-nailasearchpage',
            templateUrl: './nailasearchpage.html',
            styleUrls: ['./nailasearchpage.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService, Utils, Router])
    ], NailasearchPage);
    return NailasearchPage;
}());
export { NailasearchPage };
//# sourceMappingURL=nailasearchpage.js.map