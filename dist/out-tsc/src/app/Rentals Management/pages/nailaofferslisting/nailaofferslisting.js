import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var NailaoffersListingPage = /** @class */ (function () {
    function NailaoffersListingPage() {
        this.sliderConfig = {
            slidesPerView: 1.2,
            spaceBetween: 5,
        };
        this.sliderConfig2 = {
            slidesPerView: 3.2,
            spaceBetween: 5,
        };
        this.searchTerm = "";
        this.a = false;
        this.items = [
            { title: "one" },
            { title: "two" },
            { title: "three" },
            { title: "four" },
            { title: "five" },
            { title: "six" }
        ];
    }
    NailaoffersListingPage.prototype.ngOnInit = function () {
        this.setFilteredItems();
    };
    NailaoffersListingPage.prototype.setFilteredItems = function () {
        this.items = this.filterItems(this.searchTerm);
    };
    NailaoffersListingPage.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    NailaoffersListingPage = tslib_1.__decorate([
        Component({
            selector: 'app-nailaofferslisting',
            templateUrl: './nailaofferslisting.html',
            styleUrls: ['./nailaofferslisting.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], NailaoffersListingPage);
    return NailaoffersListingPage;
}());
export { NailaoffersListingPage };
//# sourceMappingURL=nailaofferslisting.js.map