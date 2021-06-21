import * as tslib_1 from "tslib";
import { AlertServiceService } from '../../../common-services/alert-service.service';
import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController, ModalController, ActionSheetController } from '@ionic/angular';
import { UnitSearchPage } from '../unit-search/unit-search.page';
import { ProjectSearchPage } from '../project-search/project-search.page';
import { UserSearchPage } from '../user-search/user-search.page';
import { TicketCategorySearchPage } from '../ticket-category-search/ticket-category-search.page';
import { TicketSubCategorySearchPage } from '../ticket-sub-category-search/ticket-sub-category-search.page';
import { Router, ActivatedRoute } from '@angular/router';
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { StorageService } from 'src/app/common-services/storage-service.service';
import { PictureComponent } from 'src/app/common-components/picture/picture.component';
var CreateTicketPage = /** @class */ (function () {
    function CreateTicketPage(ticketService, loadingCtrl, modalController, router, route, alertService, webview, transService, storageService, actionSheet) {
        var _this = this;
        this.ticketService = ticketService;
        this.loadingCtrl = loadingCtrl;
        this.modalController = modalController;
        this.router = router;
        this.route = route;
        this.alertService = alertService;
        this.webview = webview;
        this.transService = transService;
        this.storageService = storageService;
        this.actionSheet = actionSheet;
        this.ticketData = {
            ticketBelongsTo: 'Home',
            priority: 'low',
        };
        this.images = [];
        this.flag = false;
        this.loading = this.loadingCtrl.create({});
        this.subCategories = [];
        this.flow = 'createTicket';
        this.title = this.transService.getTranslatedData('create-ticket.raise-ticket');
        this.date = new Date();
        this.route.queryParamMap.subscribe(function (params) {
            _this.ticketId = params.params.ticketId;
            console.log(_this.ticketId);
        });
    }
    CreateTicketPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({})];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    CreateTicketPage.prototype.ionViewDidEnter = function () {
        this.flag = false;
    };
    CreateTicketPage.prototype.ngOnInit = function () {
        if (this.ticketId) {
            this.flow = 'editTicket';
            this.title = this.transService.getTranslatedData('create-ticket.update-ticket');
            this.getTicketDetails();
        }
        else {
            this.ticketData.jobStartTime = this.date.toISOString();
            this.ticketData.jobDate = this.date.toISOString();
            this.ticketData.jobEndDate = this.date.toISOString();
            this.ticketData.jobEndTime = new Date(this.date.setDate(this.date.getMinutes() + 30)).toISOString(); // new Date(this.date.setDate(this.date.getDate() + 1)).toISOString();
            if (this.date.getMinutes() < 30) {
                this.date.setMinutes(30);
            }
            else {
                this.date.setMinutes(0);
                this.date.setHours(new Date().getHours() + 1);
            }
            this.ticketData.jobStartTime = this.date.toISOString();
            this.date.setMinutes(this.date.getMinutes() + 30);
            this.ticketData.jobEndTime = this.date.toISOString();
        }
    };
    CreateTicketPage.prototype.getTicketDetails = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.ticketService.getTicketById(this.ticketId)
                            .subscribe(function (data) {
                            _this.loadingCtrl.dismiss();
                            _this.ticketData = data;
                            console.log(data);
                            if (data.ticketCategory) {
                                _this.ticketData.ticketCategoryName = data.ticketCategory;
                            }
                            if (data.ticketSubCategory) {
                                _this.ticketData.ticketSubCategoryName = data.ticketSubCategory;
                            }
                            if (data.contactPoint) {
                                if (data.contactPoint.firstName) {
                                    _this.ticketData.contactPointName = data.contactPoint.firstName;
                                }
                                if (data.contactPoint.lastName) {
                                    _this.ticketData.contactPointName = _this.ticketData.contactPointName + ' ' + data.contactPoint.lastName;
                                }
                            }
                            if (data.files.length > 0) {
                                _this.images = data.files;
                            }
                            if (data.agent) {
                                if (data.agent.firstName) {
                                    _this.ticketData.agentName = data.agent.firstName;
                                }
                                if (data.agent.lastName) {
                                    _this.ticketData.agentName = _this.ticketData.agentName + ' ' + data.agent.lastName;
                                }
                            }
                            console.log(_this.ticketData);
                        }, function (err) {
                            _this.loadingCtrl.dismiss();
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateTicketPage.prototype.selectTicketBelongsTo = function (value) {
        this.ticketData.ticketBelongsTo = value;
        delete this.ticketData.ticketBelongsToName;
        delete this.ticketData.ticketBelongsToRefId;
        delete this.ticketData.ticketCategoryName;
        delete this.ticketData.ticketCategory;
        delete this.ticketData.ticketCategoryId;
    };
    CreateTicketPage.prototype.selectPriority = function (value) {
        this.ticketData.priority = value;
    };
    CreateTicketPage.prototype.openUnitSearchModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: UnitSearchPage,
                            componentProps: {
                                id: this.ticketData.ticketBelongsToRefId,
                                name: this.ticketData.ticketBelongsToName
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (unit) {
                            if (unit !== null && unit.data) {
                                console.log(unit);
                                delete _this.ticketData.ticketCategoryName;
                                delete _this.ticketData.ticketCategory;
                                delete _this.ticketData.ticketCategoryId;
                                _this.ticketData.ticketBelongsToName = unit.data.ticketBelongsToName;
                                _this.ticketData.ticketBelongsToRefId = unit.data.ticketBelongsToRefId;
                                console.log(_this.ticketData);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateTicketPage.prototype.openProjectSearchModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ProjectSearchPage,
                            componentProps: {
                                id: this.ticketData.ticketBelongsToRefId,
                                name: this.ticketData.ticketBelongsToName
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (project) {
                            if (project !== null && project.data) {
                                delete _this.ticketData.ticketCategoryName;
                                delete _this.ticketData.ticketCategory;
                                delete _this.ticketData.ticketCategoryId;
                                _this.ticketData.ticketBelongsToName = project.data.ticketBelongsToName;
                                _this.ticketData.ticketBelongsToRefId = project.data.ticketBelongsToRefId;
                                console.log(_this.ticketData);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateTicketPage.prototype.openUserSearchModal = function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var id, name, modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type === 'agent') {
                            id = this.ticketData.agent;
                            name = this.ticketData.agentName;
                        }
                        else if (type === 'poc') {
                            id = this.ticketData.contactPoint;
                            name = this.ticketData.contactPointName;
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
                                    _this.ticketData.agentName = user.data.name;
                                    _this.ticketData.agent = user.data.id;
                                }
                                else if (type === 'poc') {
                                    _this.ticketData.contactPointName = user.data.name;
                                    _this.ticketData.contactPoint = user.data.id;
                                }
                                console.log(_this.ticketData);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateTicketPage.prototype.openTicketCategorySearchModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: TicketCategorySearchPage,
                            componentProps: {
                                ticketBelongsTo: this.ticketData.ticketBelongsTo,
                                ticketBelongsToRefId: this.ticketData.ticketBelongsToRefId,
                                name: this.ticketData.ticketCategoryName,
                                ticketCategory: this.ticketData.ticketCategory,
                                subCategories: this.subCategories
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (category) {
                            if (category !== null && category.data) {
                                console.log(_this.ticketData);
                                _this.ticketData.ticketCategoryName = category.data.name;
                                _this.ticketData.ticketCategory = category.data.ticketCategory;
                                _this.ticketData.ticketCategoryId = category.data.ticketCategory;
                                delete _this.ticketData.ticketSubCategory;
                                delete _this.ticketData.ticketSubCategoryName;
                                delete _this.ticketData.ticketSubCategoryId;
                                _this.subCategories = category.data.subCategory;
                                console.log(_this.subCategories);
                            }
                        });
                        if (!this.ticketData.ticketBelongsToRefId) return [3 /*break*/, 3];
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('create-ticket.select-unit-project-alert'));
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateTicketPage.prototype.openTicketSubCategorySearchModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: TicketSubCategorySearchPage,
                            componentProps: {
                                subCategories: this.subCategories,
                                name: this.ticketData.ticketSubCategoryName,
                                ticketSubCategory: this.ticketData.ticketSubCategory
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (subCategory) {
                            if (subCategory !== null && subCategory.data) {
                                console.log(subCategory);
                                _this.ticketData.ticketSubCategoryName = subCategory.data.name;
                                _this.ticketData.ticketSubCategory = subCategory.data.ticketSubCategory;
                                _this.ticketData.ticketSubCategoryId = subCategory.data.ticketSubCategory;
                            }
                        });
                        if (!this.ticketData.ticketCategory) return [3 /*break*/, 3];
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('create-ticket.select-cat-alert'));
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateTicketPage.prototype.closeModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateTicketPage.prototype.openModal = function (value) {
        if (value === 'Home') {
            this.openUnitSearchModal();
        }
        else if (value === 'Project') {
            this.openProjectSearchModal();
        }
        else if (value === 'agent') {
            this.openUserSearchModal('agent');
        }
        else if (value === 'poc') {
            this.openUserSearchModal('poc');
        }
        else if (value === 'ticketCategory') {
            this.openTicketCategorySearchModal();
        }
        else if (value === 'ticketSubCategory') {
            this.openTicketSubCategorySearchModal();
        }
    };
    CreateTicketPage.prototype.raiseTicket = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storageService.getDatafromIonicStorage('user_id').then(function (val) {
                                _this.ticketData.raisedBy = val;
                                _this.ticketData.createdBy = val;
                            })];
                    case 2:
                        _a.sent();
                        console.log("TicketData");
                        console.log(this.ticketData);
                        if (this.images.length > 0) {
                            this.alertService.upload(this.images[0], this.ticketData, 'RAISETICKET').then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.loading.dismiss()];
                                        case 1:
                                            _a.sent();
                                            this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('create-ticket.ticket-create-success'));
                                            this.router.navigateByUrl("/building-management-tickets", { replaceUrl: true });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) {
                                _this.loading.dismiss();
                                _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), JSON.stringify(error));
                            });
                        }
                        else {
                            this.ticketService.createTicket(this.ticketData)
                                .subscribe(function (data) {
                                console.log(_this.ticketData);
                                _this.loading.dismiss();
                                _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), _this.transService.getTranslatedData('create-ticket.ticket-create-success'));
                                _this.router.navigateByUrl("/building-management-tickets", { replaceUrl: true });
                            }, function (err) {
                                _this.loading.dismiss();
                                _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateTicketPage.prototype.updateTicket = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.ticketData.ticketCategory) {
                            this.ticketData.ticketCategory = this.ticketData.ticketCategoryId;
                        }
                        if (this.ticketData.ticketSubCategory) {
                            this.ticketData.ticketSubCategory = this.ticketData.ticketSubCategoryId;
                        }
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        if (this.images.length > 0) {
                            this.alertService.upload(this.images[0], this.ticketData, 'UPDATETICKET').then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                        case 1:
                                            _a.sent();
                                            this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('create-ticket.ticket-update-success'));
                                            this.flag = true;
                                            this.router.navigateByUrl("/building-management-ticket-details?flag=" + this.flag + "&ticketId=" + this.ticketData._id);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) {
                                _this.loading.dismiss();
                                _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), error);
                            });
                        }
                        else {
                            this.ticketService.updateTicket(this.ticketData)
                                .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                        case 1:
                                            _a.sent();
                                            this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('create-ticket.ticket-update-success'));
                                            this.flag = true;
                                            this.router.navigateByUrl("/building-management-ticket-details?flag=" + this.flag + "&ticketId=" + this.ticketData._id);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (err) {
                                _this.loadingCtrl.dismiss();
                                _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // public presentActionSheet() {
    //   this.actionSheet.create({
    //     header: 'Select image from ',
    //     buttons: [
    //       {
    //         text: 'Camera',
    //         icon: 'camera',
    //         handler: async () => {
    //           this.fileSourceOption('camera');
    //         }
    //       },
    //       {
    //         text: 'Library',
    //         icon: 'images',
    //         handler: () => {
    //           this.fileSourceOption('library');
    //         }
    //       },
    //       {
    //         text: 'Cancel',
    //         icon: 'close',
    //         handler: () => {
    //           console.log('cancel');
    //         }
    //       }
    //     ]
    //   }).then(actionsheet => {
    //     actionsheet.present()
    //   })
    // }
    // async fileSourceOption(type) {
    //   if (this.images.length < 1) {
    //     const caller = await this.alertService.capturePhoto(type);
    //     console.log('in add-visitor Page\n\n ', caller);
    //     if (caller !== undefined) {
    //       console.log(caller);
    //       this.images.push(caller);
    //       console.log(this.images);
    //     }
    //   } else {
    //     this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'),
    //       this.transService.getTranslatedData('create-ticket.picture-limit'));
    //   }
    // }
    CreateTicketPage.prototype.removeImage = function () {
        this.images = [];
    };
    CreateTicketPage.prototype.openImage = function (image) {
        this.modalController.create({
            component: PictureComponent,
            componentProps: { image: image }
        }).then(function (modal) {
            modal.present();
        });
    };
    CreateTicketPage = tslib_1.__decorate([
        Component({
            selector: 'app-create-ticket',
            templateUrl: './create-ticket.page.html',
            styleUrls: ['./create-ticket.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [TicketService,
            LoadingController,
            ModalController,
            Router,
            ActivatedRoute,
            AlertServiceService,
            WebView,
            TranslateServiceService,
            StorageService,
            ActionSheetController])
    ], CreateTicketPage);
    return CreateTicketPage;
}());
export { CreateTicketPage };
//# sourceMappingURL=create-ticket.page.js.map