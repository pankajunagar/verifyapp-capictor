import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var SettingsService = /** @class */ (function () {
    function SettingsService() {
        this.theme = new BehaviorSubject('light-theme');
    }
    SettingsService.prototype.setActiveTheme = function (val) {
        this.theme.next(val);
    };
    SettingsService.prototype.getActiveTheme = function () {
        return this.theme.asObservable();
    };
    SettingsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SettingsService);
    return SettingsService;
}());
export { SettingsService };
//# sourceMappingURL=settings.service.js.map