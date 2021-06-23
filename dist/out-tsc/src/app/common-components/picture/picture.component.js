import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
var PictureComponent = /** @class */ (function () {
    function PictureComponent(_modalCtrl) {
        this._modalCtrl = _modalCtrl;
    }
    PictureComponent.prototype.ngOnInit = function () {
        console.log(this.image);
    };
    PictureComponent.prototype.dismiss = function () {
        this._modalCtrl.dismiss();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PictureComponent.prototype, "image", void 0);
    PictureComponent = tslib_1.__decorate([
        Component({
            selector: 'app-picture',
            templateUrl: './picture.component.html',
            styleUrls: ['./picture.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController])
    ], PictureComponent);
    return PictureComponent;
}());
export { PictureComponent };
//# sourceMappingURL=picture.component.js.map