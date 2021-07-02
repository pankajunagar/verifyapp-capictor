import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import * as moment from 'moment';
var AgoFilter = /** @class */ (function () {
    function AgoFilter() {
    }
    AgoFilter.prototype.transform = function (conCode) {
        console.log("ago Filter", conCode);
        var m = moment(conCode).fromNow();
        return m;
    };
    AgoFilter = tslib_1.__decorate([
        Pipe({
            name: 'agoFilter'
        })
    ], AgoFilter);
    return AgoFilter;
}());
export { AgoFilter };
//# sourceMappingURL=agofilter.js.map