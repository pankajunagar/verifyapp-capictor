import * as tslib_1 from "tslib";
import { Injectable, ViewChildren, QueryList } from '@angular/core';
import { IonRouterOutlet, ActionSheetController, PopoverController, ModalController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
var AutocloseOverlaysService = /** @class */ (function () {
    function AutocloseOverlaysService(actionSheetCtrl, popoverCtrl, modalCtrl, menu, router, toastController) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.popoverCtrl = popoverCtrl;
        this.modalCtrl = modalCtrl;
        this.menu = menu;
        this.router = router;
        this.toastController = toastController;
        this.lastTimeBackPress = 0;
        this.timePeriodToExit = 2000;
    }
    AutocloseOverlaysService.prototype.trigger = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var element, error_1, element, error_2, element, error_3, element, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        console.log('backbutton triggered');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.actionSheetCtrl.getTop()];
                    case 2:
                        element = _a.sent();
                        if (element) {
                            window.history.forward();
                            element.dismiss();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.popoverCtrl.getTop()];
                    case 5:
                        element = _a.sent();
                        if (element) {
                            window.history.forward();
                            element.dismiss();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.modalCtrl.getTop()];
                    case 8:
                        element = _a.sent();
                        if (element) {
                            window.history.forward();
                            element.dismiss();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 10];
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.menu.getOpen()];
                    case 11:
                        element = _a.sent();
                        if (element !== null) {
                            // window.history.forward();
                            this.menu.close();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 13];
                    case 12:
                        error_4 = _a.sent();
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChildren(IonRouterOutlet),
        tslib_1.__metadata("design:type", QueryList)
    ], AutocloseOverlaysService.prototype, "routerOutlets", void 0);
    AutocloseOverlaysService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ActionSheetController,
            PopoverController,
            ModalController,
            MenuController,
            Router,
            ToastController])
    ], AutocloseOverlaysService);
    return AutocloseOverlaysService;
}());
export { AutocloseOverlaysService };
//# sourceMappingURL=autoclose.service.js.map