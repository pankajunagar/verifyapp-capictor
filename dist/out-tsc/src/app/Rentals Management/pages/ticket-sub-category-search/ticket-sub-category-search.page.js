import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var TicketSubCategorySearchPage = /** @class */ (function () {
    function TicketSubCategorySearchPage(modalController, navParams, transService) {
        this.modalController = modalController;
        this.navParams = navParams;
        this.transService = transService;
        this.subCategories = [];
        this.selectedSubCategory = {};
        this.selectedSubCategory.name = this.navParams.get('name');
        this.selectedSubCategory.ticketSubCategory = this.navParams.get('ticketSubCategory');
        this.subCategories = this.navParams.get('subCategories');
    }
    TicketSubCategorySearchPage.prototype.ngOnInit = function () {
    };
    TicketSubCategorySearchPage.prototype.selectSubCategory = function (subCategory) {
        this.selectedSubCategory.name = subCategory.name;
        this.selectedSubCategory.ticketSubCategory = subCategory._id;
        this.closeModal(true);
    };
    TicketSubCategorySearchPage.prototype.closeModal = function (sendData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sendData) return [3 /*break*/, 2];
                        console.log('Send data');
                        return [4 /*yield*/, this.modalController.dismiss(this.selectedSubCategory)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        console.log('Dont Send data');
                        return [4 /*yield*/, this.modalController.dismiss()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TicketSubCategorySearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-ticket-sub-category-search',
            templateUrl: './ticket-sub-category-search.page.html',
            styleUrls: ['./ticket-sub-category-search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            NavParams,
            TranslateServiceService])
    ], TicketSubCategorySearchPage);
    return TicketSubCategorySearchPage;
}());
export { TicketSubCategorySearchPage };
//# sourceMappingURL=ticket-sub-category-search.page.js.map