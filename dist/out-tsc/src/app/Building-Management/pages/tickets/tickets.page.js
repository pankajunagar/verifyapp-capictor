import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { TicketFilterPage } from '../../pages/ticket-filter/ticket-filter.page';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TicketComponent } from '../../components/ticket/ticket.component';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { ActivatedRoute } from '@angular/router';
var TicketsPage = /** @class */ (function () {
    function TicketsPage(ticketService, ref, loading, modalController, alertService, popOverCtrl, transService, route) {
        var _this = this;
        this.ticketService = ticketService;
        this.ref = ref;
        this.loading = loading;
        this.modalController = modalController;
        this.alertService = alertService;
        this.popOverCtrl = popOverCtrl;
        this.transService = transService;
        this.route = route;
        this.tickets = [];
        this.disableInfiniteScroll = false;
        this.noTicket = false;
        this.filterData = {
            skip: 0,
            status: ['open', 'in-progress'],
            ticketBelongsTo: 'all',
            type: 'on-demand',
            priority: 'all'
        };
        this.status = '';
        // this.searchTicket('');
        this.route.queryParams.subscribe(function (params) {
            if (params && params.id) {
                _this.filterData.asset = params.id;
                _this.filterData.assetId = params.name;
            }
            _this.searchTicket('');
        });
    }
    TicketsPage.prototype.ngOnInit = function () {
    };
    TicketsPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({})];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TicketsPage.prototype.openTicketFilterModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: TicketFilterPage,
                            componentProps: {
                                data: this.dataFromFilterPage
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (ticketFilter) {
                            _this.status = '';
                            if (ticketFilter !== null && ticketFilter.data) {
                                _this.dataFromFilterPage = ticketFilter.data;
                                console.log(ticketFilter);
                                ticketFilter.data.agent ? _this.filterData.agent = ticketFilter.data.agent : _this.filterData.agent = '';
                                ticketFilter.data.startDate ? _this.filterData.startDate = ticketFilter.data.startDate : _this.filterData.startDate = '';
                                ticketFilter.data.endDate ? _this.filterData.endDate = ticketFilter.data.endDate : _this.filterData.endDate = '';
                                ticketFilter.data.ticketBelongsToRefId ? _this.filterData.projects = ticketFilter.data.ticketBelongsToRefId : _this.filterData.projects = '';
                                ticketFilter.data.agent ? _this.filterData.agent = ticketFilter.data.agent : _this.filterData.agent = '';
                                ticketFilter.data.contactPoint ? _this.filterData.contactPoint = ticketFilter.data.contactPoint : _this.filterData.contactPoint = '';
                                if (ticketFilter.data.ticketBelongsTo) {
                                    ticketFilter.data.ticketBelongsTo.length > 1 ? _this.filterData.ticketBelongsTo = 'all' : _this.filterData.ticketBelongsTo = ticketFilter.data.ticketBelongsTo[0];
                                }
                                if (ticketFilter.data.type) {
                                    ticketFilter.data.type.length > 1 ? _this.filterData.type = 'all' : _this.filterData.type = ticketFilter.data.type[0];
                                }
                                if (ticketFilter.data.priority) {
                                    ticketFilter.data.priority.length > 1 ? _this.filterData.priority = 'all' : _this.filterData.priority = ticketFilter.data.priority[0];
                                }
                                if (ticketFilter.data.status) {
                                    _this.filterData.status = ticketFilter.data.status;
                                }
                                if (_this.filterData.startDate) {
                                    _this.filterData.startDate = new Date(_this.filterData.startDate);
                                    _this.filterData.startDate = new Date(_this.filterData.startDate.setHours(0, 0, 0, 0));
                                    _this.filterData.startDate = (_this.filterData.startDate.toJSON()).substr(0, 10);
                                }
                                if (_this.filterData.startDate && !_this.filterData.endDate) {
                                    var d = new Date(_this.filterData.startDate);
                                    var year = d.getFullYear();
                                    var month = d.getMonth();
                                    var day = d.getDate();
                                    var end = new Date(year + 1, month, day);
                                    _this.filterData.endDate = end.toJSON().substr(0, 10);
                                }
                                if (_this.filterData.endDate) {
                                    _this.filterData.endDate = new Date(_this.filterData.endDate);
                                    _this.filterData.endDate = new Date(_this.filterData.endDate.setHours(0, 0, 0, 0));
                                    _this.filterData.endDate = (_this.filterData.endDate.toJSON()).substr(0, 10);
                                }
                                _this.tickets = [];
                                _this.filterData.skip = 0;
                                _this.searchTicket('');
                                console.log(_this.filterData);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // skip,
    // status,
    // ticketBelongsTo,
    // type,
    // projects,
    // priority,
    // startDate,
    // endDate,
    // contactPoint,
    // agent,
    // asset
    TicketsPage.prototype.searchTicket = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!event) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.filterData.status.forEach(function (element) {
                            _this.status = _this.status + ("&status=" + element);
                        })];
                    case 3:
                        _a.sent();
                        console.log('====================================');
                        console.log(this.status);
                        console.log('====================================');
                        this.ticketService.getTickets(this.filterData.skip || '', this.status || '', this.filterData.ticketBelongsTo || '', this.filterData.type || '', this.filterData.projects || '', this.filterData.priority || '', this.filterData.startDate || '', this.filterData.endDate || '', this.filterData.contactPoint || '', this.filterData.agent || '', this.filterData.asset || '')
                            .subscribe(function (data) {
                            _this.tickets = _this.tickets.concat(data.data.data);
                            _this.filterData.skip = data.data.query.skip + 10;
                            _this.noTicket = true;
                            event ? event.target.complete() : _this.loading.dismiss();
                            if (data.data.query.current >= data.data.query.total) {
                                _this.disableInfiniteScroll = true;
                            }
                        }, function (err) {
                            _this.loading.dismiss();
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TicketsPage.prototype.popOverOption = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popOver;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popOverCtrl.create({
                            component: TicketComponent,
                            event: event,
                            mode: 'ios',
                        })];
                    case 1:
                        popOver = _a.sent();
                        popOver.onDidDismiss().then(function (status) {
                            console.log('====================================');
                            console.log(status);
                            console.log('====================================');
                        });
                        return [4 /*yield*/, popOver.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketsPage = tslib_1.__decorate([
        Component({
            selector: 'app-tickets',
            templateUrl: './tickets.page.html',
            styleUrls: ['./tickets.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [TicketService,
            ChangeDetectorRef,
            LoadingController,
            ModalController,
            AlertServiceService,
            PopoverController,
            TranslateServiceService,
            ActivatedRoute])
    ], TicketsPage);
    return TicketsPage;
}());
export { TicketsPage };
//# sourceMappingURL=tickets.page.js.map