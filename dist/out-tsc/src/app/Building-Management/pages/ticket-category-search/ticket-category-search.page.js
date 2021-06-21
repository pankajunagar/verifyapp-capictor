import * as tslib_1 from "tslib";
import { AlertServiceService } from '../../../common-services/alert-service.service';
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TicketService } from '../../services/ticket.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var TicketCategorySearchPage = /** @class */ (function () {
    function TicketCategorySearchPage(modalController, ticketService, navParams, alertService, transService) {
        this.modalController = modalController;
        this.ticketService = ticketService;
        this.navParams = navParams;
        this.alertService = alertService;
        this.transService = transService;
        this.categories = [];
        this.selectedCategory = {};
        this.loading = false;
        this.selectedCategory.name = this.navParams.get('name');
        this.selectedCategory.ticketCategory = this.navParams.get('ticketCategory');
        this.selectedCategory.subCategory = this.navParams.get('subCategories');
        var categoryFilter = {
            ticketBelongsTo: this.navParams.get('ticketBelongsTo'),
            ticketBelongsToRefId: this.navParams.get('ticketBelongsToRefId')
        };
        this.getCategories(categoryFilter);
    }
    TicketCategorySearchPage.prototype.ngOnInit = function () {
    };
    TicketCategorySearchPage.prototype.selectCategory = function (category) {
        this.selectedCategory.name = category.name;
        this.selectedCategory.ticketCategory = category._id;
        this.selectedCategory.subCategory = category.subCategory;
        this.closeModal(true);
    };
    TicketCategorySearchPage.prototype.closeModal = function (sendData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sendData) return [3 /*break*/, 2];
                        console.log('Send data');
                        return [4 /*yield*/, this.modalController.dismiss(this.selectedCategory)];
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
    TicketCategorySearchPage.prototype.getCategories = function (categoryFilter) {
        var _this = this;
        this.loading = true;
        this.ticketService.getTicketCategories(categoryFilter)
            .subscribe(function (data) {
            _this.loading = false;
            _this.categories = data;
        }, function (err) {
            _this.loading = false;
            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
        });
    };
    TicketCategorySearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-ticket-category-search',
            templateUrl: './ticket-category-search.page.html',
            styleUrls: ['./ticket-category-search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            TicketService,
            NavParams,
            AlertServiceService,
            TranslateServiceService])
    ], TicketCategorySearchPage);
    return TicketCategorySearchPage;
}());
export { TicketCategorySearchPage };
//# sourceMappingURL=ticket-category-search.page.js.map