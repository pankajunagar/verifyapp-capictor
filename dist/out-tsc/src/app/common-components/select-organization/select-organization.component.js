import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
var SelectOrganizationComponent = /** @class */ (function () {
    function SelectOrganizationComponent(popOver) {
        this.popOver = popOver;
    }
    SelectOrganizationComponent.prototype.ngOnInit = function () {
        console.log('====================================');
        console.log(this.data);
        console.log('====================================');
    };
    SelectOrganizationComponent.prototype.close = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orgData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 2];
                        orgData = {
                            type: data
                        };
                        return [4 /*yield*/, data];
                    case 1:
                        (_a.sent()) == 'bm' ? orgData.bm = this.data.bm : data == 'rm' ? orgData.rm = this.data.rm : '';
                        this.popOver.dismiss(orgData, data);
                        return [3 /*break*/, 3];
                    case 2:
                        this.popOver.dismiss();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SelectOrganizationComponent.prototype, "data", void 0);
    SelectOrganizationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-select-organization',
            templateUrl: './select-organization.component.html',
            styleUrls: ['./select-organization.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController])
    ], SelectOrganizationComponent);
    return SelectOrganizationComponent;
}());
export { SelectOrganizationComponent };
//# sourceMappingURL=select-organization.component.js.map