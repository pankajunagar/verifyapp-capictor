import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
var translateService = /** @class */ (function () {
    function translateService(translate) {
        this.translate = translate;
    }
    translateService.prototype.getTranslatedData = function (key) {
        return this.translate.instant(key);
    };
    translateService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [TranslateService])
    ], translateService);
    return translateService;
}());
export { translateService };
//# sourceMappingURL=translate-service.service.js.map