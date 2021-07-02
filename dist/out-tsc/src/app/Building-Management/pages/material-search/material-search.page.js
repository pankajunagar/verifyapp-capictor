import * as tslib_1 from "tslib";
import { AlertServiceService } from '../../../common-services/alert-service.service';
import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TicketService } from '../../services/ticket.service';
var MaterialSearchPage = /** @class */ (function () {
    function MaterialSearchPage(loadingCtrl, ticketService, modalController, alertService) {
        this.loadingCtrl = loadingCtrl;
        this.ticketService = ticketService;
        this.modalController = modalController;
        this.alertService = alertService;
        this.materials = [];
        this.loading = false;
        this.disableInfiniteScroll = false;
        this.selectedMaterial = {};
        this.filterData = {
            skip: 0,
            searchText: ''
        };
        this.searchMaterial('');
    }
    MaterialSearchPage.prototype.ngOnInit = function () {
    };
    MaterialSearchPage.prototype.closeModal = function (sendData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sendData) return [3 /*break*/, 2];
                        console.log('Send data');
                        return [4 /*yield*/, this.modalController.dismiss(this.selectedMaterial)];
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
    MaterialSearchPage.prototype.selectMaterial = function (material) {
        this.selectedMaterial = material;
        this.closeModal(true);
    };
    // async presentLoading() {
    //   this.loading = await this.loadingCtrl.create({
    //   });
    //   this.loading.present();
    // }
    // type, searchtext, skip, token, status
    MaterialSearchPage.prototype.searchMaterial = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!event) {
                    this.loading = true;
                }
                this.ticketService.searchMaterials(this.filterData)
                    .subscribe(function (data) {
                    _this.materials = _this.materials.concat(data.data);
                    _this.filterData.skip = data.query.skip + 10;
                    console.log(_this.materials);
                    event ? event.target.complete() : _this.loading = false;
                    console.log('loading should dismiss');
                    if (data.query.current >= data.query.total) {
                        _this.disableInfiniteScroll = true;
                    }
                }, function (err) {
                    _this.loading = false;
                    _this.alertService.presentAlert('', err.error.error);
                });
                return [2 /*return*/];
            });
        });
    };
    MaterialSearchPage.prototype.resetFilterAndSearch = function () {
        this.materials = [];
        this.filterData.skip = 0;
        this.disableInfiniteScroll = false;
        this.searchMaterial('');
    };
    MaterialSearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-material-search',
            templateUrl: './material-search.page.html',
            styleUrls: ['./material-search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [LoadingController,
            TicketService,
            ModalController,
            AlertServiceService])
    ], MaterialSearchPage);
    return MaterialSearchPage;
}());
export { MaterialSearchPage };
//# sourceMappingURL=material-search.page.js.map