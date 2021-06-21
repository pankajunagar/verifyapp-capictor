import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var Utils = /** @class */ (function () {
    function Utils(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
        this.LoadPage = new EventEmitter();
        this.cartitem = [];
        this.cartdata = 0;
    }
    Utils.prototype.LoadPageOnrouteChange = function () {
        console.log('ios working and verifyit');
        this.LoadPage.next(true);
    };
    Utils = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], Utils);
    return Utils;
}());
export { Utils };
//# sourceMappingURL=utils.service.js.map