import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
var TranslateServiceService = /** @class */ (function () {
    function TranslateServiceService(translate) {
        this.translate = translate;
    }
    TranslateServiceService.prototype.getTranslatedData = function (key) {
        return this.translate.instant(key);
    };
    TranslateServiceService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [TranslateService])
    ], TranslateServiceService);
    return TranslateServiceService;
}());
export { TranslateServiceService };
//# sourceMappingURL=translate-service.service.js.map