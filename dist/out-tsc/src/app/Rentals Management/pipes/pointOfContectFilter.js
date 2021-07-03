import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var PointOfContact = /** @class */ (function () {
    function PointOfContact() {
    }
    PointOfContact.prototype.transform = function (conCode, searchTerm) {
        if (!conCode)
            return [];
        if (!searchTerm)
            return conCode;
        searchTerm = searchTerm.toLowerCase();
        return conCode.filter(function (it) {
            // let name:string;
            // if (it.lastName) {
            // return it.lastName.toLowerCase().includes(searchTerm);
            // } else if (it.firstName) {
            return it.firstName.toLowerCase().includes(searchTerm);
            // }
        });
    };
    PointOfContact = tslib_1.__decorate([
        Pipe({
            name: 'PointOfContactFilter'
        })
    ], PointOfContact);
    return PointOfContact;
}());
export { PointOfContact };
//# sourceMappingURL=pointOfContectFilter.js.map