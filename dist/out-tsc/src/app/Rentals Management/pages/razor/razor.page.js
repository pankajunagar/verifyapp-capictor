import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var RazorPage = /** @class */ (function () {
    function RazorPage() {
        this.paymentAmount = 333;
        this.currency = 'INR';
        this.currencyIcon = '₹';
        this.razor_key = '7x85rWExQttEoWcsRxxIyCpd';
        this.cardDetails = {};
    }
    RazorPage.prototype.payWithRazor = function () {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: this.currency,
            key: this.razor_key,
            amount: this.paymentAmount,
            name: 'Naila',
            prefill: {
                email: 'hmohit7@gmail.com',
                contact: '9880013407',
                name: 'Naila'
            },
            theme: {
                color: '#F37254'
            },
            modal: {
                ondismiss: function () {
                    alert('dismissed');
                }
            }
        };
        var successCallback = function (payment_id) {
            alert('payment_id: ' + payment_id);
        };
        var cancelCallback = function (error) {
            alert(error.description + ' (Error ' + error.code + ')');
        };
        RazorpayCheckout.open(options, successCallback, cancelCallback);
    };
    RazorPage = tslib_1.__decorate([
        Component({
            selector: 'app-razor',
            templateUrl: 'razor.page.html',
            styleUrls: ['razor.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RazorPage);
    return RazorPage;
}());
export { RazorPage };
//# sourceMappingURL=razor.page.js.map