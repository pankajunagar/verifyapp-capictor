import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var StorageService = /** @class */ (function () {
    function StorageService(storage) {
        var _this = this;
        this.storage = storage;
        this.storage.get('appSrc').then(function (val) {
            _this.appSrc = val;
        });
    }
    StorageService.prototype.gettoken = function () {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
        });
        return this.token;
    };
    StorageService.prototype.storeDataToIonicStorage = function (key, value) {
        this.storage.set(key, value);
    };
    StorageService.prototype.getDatafromIonicStorage = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.storage.get(key)];
            });
        });
    };
    StorageService.prototype.emptyStorage = function () {
        this.storage.clear();
    };
    StorageService.prototype.removeItem = function (item) {
        return this.storage.remove(item);
    };
    StorageService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], StorageService);
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=storage-service.service.js.map