import * as tslib_1 from "tslib";
import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
var TicketComponent = /** @class */ (function () {
    function TicketComponent(popOverCtrl) {
        this.popOverCtrl = popOverCtrl;
    }
    TicketComponent.prototype.ngOnInit = function () { };
    TicketComponent.prototype.close = function () {
        this.popOverCtrl.dismiss();
    };
    TicketComponent = tslib_1.__decorate([
        Component({
            selector: 'app-ticket',
            templateUrl: './ticket.component.html',
            styleUrls: ['./ticket.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController])
    ], TicketComponent);
    return TicketComponent;
}());
export { TicketComponent };
//# sourceMappingURL=ticket.component.js.map