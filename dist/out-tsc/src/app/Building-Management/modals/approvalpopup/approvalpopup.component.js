import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var ApprovalpopupComponent = /** @class */ (function () {
    function ApprovalpopupComponent(popoverCtrl, transService, trans) {
        this.popoverCtrl = popoverCtrl;
        this.transService = transService;
        this.trans = trans;
    }
    ApprovalpopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.trans.get('approval-popup-modal.title', { val: this.val }).subscribe(function (res) {
            _this.title = res;
        });
    };
    ApprovalpopupComponent.prototype.cancel = function () {
        this.popoverCtrl.dismiss();
    };
    ApprovalpopupComponent.prototype.dismiss = function () {
        var data = {
            val: this.val,
            notes: this.notes || {}
        };
        this.popoverCtrl.dismiss(data);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ApprovalpopupComponent.prototype, "val", void 0);
    ApprovalpopupComponent = tslib_1.__decorate([
        Component({
            selector: 'app-approvalpopup',
            templateUrl: './approvalpopup.component.html',
            styleUrls: ['./approvalpopup.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController,
            TranslateServiceService,
            TranslateService])
    ], ApprovalpopupComponent);
    return ApprovalpopupComponent;
}());
export { ApprovalpopupComponent };
//# sourceMappingURL=approvalpopup.component.js.map