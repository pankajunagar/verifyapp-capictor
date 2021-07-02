import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NailaService } from '../../services/naila.service';
// import { Slides } from 'ionic-angular';
var NailaOffersPage = /** @class */ (function () {
    function NailaOffersPage(nailaservice) {
        this.nailaservice = nailaservice;
    }
    NailaOffersPage.prototype.ngOnInit = function () {
        var _this = this;
        this.nailaservice.listRelatedProducts('1').subscribe(function (data) {
            _this.listbanner = data;
            _this.items = _this.listbanner.data;
            _this.listbanner.data.forEach(function (element) {
                element.name = element.product_name;
            });
            console.log(_this.listbanner);
        });
    };
    NailaOffersPage.prototype.setFilteredItems = function () {
        this.items = this.listbanner.data;
        this.items = this.filterItems(this.searchTerm);
    };
    NailaOffersPage.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    NailaOffersPage = tslib_1.__decorate([
        Component({
            selector: 'app-nailaofferspage',
            templateUrl: './nailaofferspage.html',
            styleUrls: ['./nailaofferspage.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService])
    ], NailaOffersPage);
    return NailaOffersPage;
}());
export { NailaOffersPage };
//# sourceMappingURL=nailaofferspage.js.map