import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UnitService } from '../../services/unit.service';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var UnitSearchPage = /** @class */ (function () {
    function UnitSearchPage(unitService, modalController, navParams, alertService, transService) {
        this.unitService = unitService;
        this.modalController = modalController;
        this.navParams = navParams;
        this.alertService = alertService;
        this.transService = transService;
        this.units = [];
        this.loading = false;
        this.disableInfiniteScroll = false;
        this.selectedUnit = {};
        this.filterData = {
            skip: 0,
            searchText: ''
        };
        if (this.navParams.get('id')) {
            this.selectedUnit.ticketBelongsToRefId = this.navParams.get('id');
            this.selectedUnit.ticketBelongsToName = this.navParams.get('name');
        }
        this.searchUnit('');
    }
    UnitSearchPage.prototype.ngOnInit = function () {
    };
    UnitSearchPage.prototype.closeModal = function (sendData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sendData) return [3 /*break*/, 2];
                        console.log('Send data');
                        return [4 /*yield*/, this.modalController.dismiss(this.selectedUnit)];
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
    UnitSearchPage.prototype.selectUnit = function (unit) {
        this.selectedUnit.ticketBelongsToName = '';
        if (unit.block) {
            this.selectedUnit.ticketBelongsToName = unit.block;
        }
        if (unit.door) {
            this.selectedUnit.ticketBelongsToName = this.selectedUnit.ticketBelongsToName + unit.door;
        }
        if (unit.name) {
            this.selectedUnit.ticketBelongsToName = this.selectedUnit.ticketBelongsToName + ', ' + unit.name;
        }
        this.selectedUnit.ticketBelongsToRefId = unit._id;
        this.closeModal(true);
    };
    UnitSearchPage.prototype.searchUnit = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!event) {
                    this.loading = true;
                }
                this.unitService.getUnits(this.filterData)
                    .subscribe(function (data) {
                    _this.units = _this.units.concat(data.data.data);
                    _this.filterData.skip = data.data.query.skip + 10;
                    console.log(_this.units);
                    event ? event.target.complete() : _this.loading = false;
                    console.log('loading should dismiss');
                    if (data.data.query.current >= data.data.query.total) {
                        _this.disableInfiniteScroll = true;
                    }
                }, function (err) {
                    _this.loading = false;
                    _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                });
                return [2 /*return*/];
            });
        });
    };
    UnitSearchPage.prototype.resetFilterAndSearch = function () {
        this.units = [];
        this.filterData.skip = 0;
        this.disableInfiniteScroll = false;
        this.searchUnit('');
    };
    UnitSearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-unit-search',
            templateUrl: './unit-search.page.html',
            styleUrls: ['./unit-search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [UnitService,
            ModalController,
            NavParams,
            AlertServiceService,
            TranslateServiceService])
    ], UnitSearchPage);
    return UnitSearchPage;
}());
export { UnitSearchPage };
//# sourceMappingURL=unit-search.page.js.map