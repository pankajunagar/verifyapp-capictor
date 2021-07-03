import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { ProjectSearchPage } from '../../pages/project-search/project-search.page';
import { UserSearchPage } from '../../pages/user-search/user-search.page';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { TicketService } from '../../services/ticket.service';
var TicketFilterPage = /** @class */ (function () {
    function TicketFilterPage(modalController, navParams, transService, alertService, 
    // private barcodeScanner: BarcodeScanner,
    ticketService, alertCtrl) {
        this.modalController = modalController;
        this.navParams = navParams;
        this.transService = transService;
        this.alertService = alertService;
        this.ticketService = ticketService;
        this.alertCtrl = alertCtrl;
        this.ticketFilter = {
            status: ['open', 'in-progress'],
            ticketBelongsTo: ['Home', 'Project'],
            type: ['on-demand'],
            priority: ['low', 'high']
        };
        if (this.navParams.get('data')) {
            this.ticketFilter = this.navParams.get('data');
            console.log(this.ticketFilter);
        }
    }
    TicketFilterPage.prototype.ngOnInit = function () {
    };
    TicketFilterPage.prototype.selectTicketStatus = function (value) {
        this.ticketFilter.status.indexOf(value) === -1 ? this.ticketFilter.status.push(value) : this.ticketFilter.status.splice(this.ticketFilter.status.indexOf(value), 1);
        // this.ticketFilter.status = _.union([value], this.ticketFilter.status);
        console.log(this.ticketFilter.status);
    };
    TicketFilterPage.prototype.selectTicketBelongsTo = function (value) {
        this.ticketFilter.ticketBelongsTo.indexOf(value) === -1 ? this.ticketFilter.ticketBelongsTo.push(value) : this.ticketFilter.ticketBelongsTo.splice(this.ticketFilter.ticketBelongsTo.indexOf(value), 1);
        console.log(this.ticketFilter.ticketBelongsTo);
    };
    TicketFilterPage.prototype.selectTicketType = function (value) {
        this.ticketFilter.type.indexOf(value) === -1 ? this.ticketFilter.type.push(value) : this.ticketFilter.type.splice(this.ticketFilter.type.indexOf(value), 1);
        console.log(this.ticketFilter.type);
    };
    TicketFilterPage.prototype.selectTicketPriority = function (value) {
        this.ticketFilter.priority.indexOf(value) === -1 ? this.ticketFilter.priority.push(value) : this.ticketFilter.priority.splice(this.ticketFilter.priority.indexOf(value), 1);
        console.log(this.ticketFilter.priority);
    };
    TicketFilterPage.prototype.openProjectSearchModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ProjectSearchPage,
                            componentProps: {
                                id: this.ticketFilter.ticketBelongsToRefId,
                                name: this.ticketFilter.ticketBelongsToName
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (project) {
                            if (project !== null && project.data) {
                                _this.ticketFilter.ticketBelongsToName = project.data.ticketBelongsToName;
                                _this.ticketFilter.ticketBelongsToRefId = project.data.ticketBelongsToRefId;
                                console.log(_this.ticketFilter);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketFilterPage.prototype.openUserSearchModal = function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var id, name, modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type === 'agent') {
                            id = this.ticketFilter.agent;
                            name = this.ticketFilter.agentName;
                        }
                        else if (type === 'poc') {
                            id = this.ticketFilter.contactPoint;
                            name = this.ticketFilter.contactPointName;
                        }
                        return [4 /*yield*/, this.modalController.create({
                                component: UserSearchPage,
                                componentProps: {
                                    id: id,
                                    name: name
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (user) {
                            if (user !== null && user.data) {
                                if (type === 'agent') {
                                    _this.ticketFilter.agentName = user.data.name;
                                    _this.ticketFilter.agent = user.data.id;
                                }
                                else if (type === 'poc') {
                                    _this.ticketFilter.contactPointName = user.data.name;
                                    _this.ticketFilter.contactPoint = user.data.id;
                                }
                                console.log(_this.ticketFilter);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketFilterPage.prototype.applyFilter = function () {
        console.log(this.ticketFilter);
    };
    TicketFilterPage.prototype.closeModal = function (sendData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sendData) return [3 /*break*/, 2];
                        console.log('Send data');
                        return [4 /*yield*/, this.modalController.dismiss(this.ticketFilter)];
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
    TicketFilterPage = tslib_1.__decorate([
        Component({
            selector: 'app-ticket-filter',
            templateUrl: './ticket-filter.page.html',
            styleUrls: ['./ticket-filter.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            NavParams,
            TranslateServiceService,
            AlertServiceService,
            TicketService,
            AlertController])
    ], TicketFilterPage);
    return TicketFilterPage;
}());
export { TicketFilterPage };
//# sourceMappingURL=ticket-filter.page.js.map