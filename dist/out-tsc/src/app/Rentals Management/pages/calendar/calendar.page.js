import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var CalendarPage = /** @class */ (function () {
    function CalendarPage(ticketService, loading, alertService, transService) {
        this.ticketService = ticketService;
        this.loading = loading;
        this.alertService = alertService;
        this.transService = transService;
        this.dateList = [];
        this.tickets = [];
        this.disableInfiniteScroll = false;
        this.filterData = {
            skip: 0,
            ticketBelongsTo: 'all',
            type: 'all',
            priority: 'all',
            status: '&status=open&status=in-progress',
            startDate: ((new Date(new Date().setHours(0, 0, 0, 0))).toJSON()).substr(0, 10),
            endDate: ((new Date(new Date().setHours(23, 59, 59, 999))).toJSON()).substr(0, 10)
        };
        this.searchTicket('');
    }
    CalendarPage.prototype.ngOnInit = function () {
        var date = new Date();
        var startDate = new Date(date.setDate(date.getDate() - 5));
        for (var i = 0; i <= 8; i++) {
            this.dateList.push(new Date(startDate.setDate(startDate.getDate() + 1)));
        }
    };
    CalendarPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            spinner: "lines"
                        }).then(function (loading) {
                            loading.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CalendarPage.prototype.searchTicket = function (event) {
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
                    case 2:
                        this.ticketService.getTickets(this.filterData.skip, this.filterData.status, this.filterData.ticketBelongsTo, this.filterData.type, '', '', this.filterData.startDate, this.filterData.endDate, '', '', '')
                            .subscribe(function (data) {
                            _this.tickets = _this.tickets.concat(data.data.data);
                            _this.filterData.skip = data.data.query.skip + 10;
                            event ? event.target.complete() : _this.loading.dismiss();
                            if (data.data.query.current >= data.data.query.total) {
                                _this.disableInfiniteScroll = true;
                            }
                        }, function (err) {
                            // this.loading.dismiss();
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CalendarPage.prototype.resetDate = function (date) {
        this.tickets = [];
        this.filterData.skip = 0;
        this.filterData.startDate = ((new Date(new Date(date).setHours(0, 0, 0, 0))).toJSON()).substr(0, 10);
        this.filterData.endDate = ((new Date(new Date(date).setHours(23, 59, 59, 999))).toJSON()).substr(0, 10);
        this.searchTicket('');
    };
    CalendarPage = tslib_1.__decorate([
        Component({
            selector: 'app-calendar',
            templateUrl: './calendar.page.html',
            styleUrls: ['./calendar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [TicketService,
            LoadingController,
            AlertServiceService,
            TranslateServiceService])
    ], CalendarPage);
    return CalendarPage;
}());
export { CalendarPage };
//# sourceMappingURL=calendar.page.js.map