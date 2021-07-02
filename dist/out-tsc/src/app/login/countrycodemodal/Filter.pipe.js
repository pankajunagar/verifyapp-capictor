import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (conCode, searchTerm) {
        if (!conCode)
            return [];
        if (!searchTerm)
            return conCode;
        searchTerm = searchTerm.toLowerCase();
        return conCode.filter(function (it) {
            return it.country.toLowerCase().includes(searchTerm);
        });
    };
    FilterPipe = tslib_1.__decorate([
        Pipe({
            name: 'Filter'
        })
    ], FilterPipe);
    return FilterPipe;
}());
export { FilterPipe };
//# sourceMappingURL=Filter.pipe.js.map