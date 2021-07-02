import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { TicketService } from '../../services/ticket.service';
import { UserSearchPage } from '../../pages/user-search/user-search.page';
import { MaterialSearchPage } from '../../pages/material-search/material-search.page';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { TranslateService } from '@ngx-translate/core';
import { PictureComponent } from 'src/app/common-components/picture/picture.component';
var TicketDetailsPage = /** @class */ (function () {
    function TicketDetailsPage(route, loadingCtrl, ticketService, modalController, alertService, alertCtrl, transService, trans, actionSheet) {
        var _this = this;
        this.route = route;
        this.loadingCtrl = loadingCtrl;
        this.ticketService = ticketService;
        this.modalController = modalController;
        this.alertService = alertService;
        this.alertCtrl = alertCtrl;
        this.transService = transService;
        this.trans = trans;
        this.actionSheet = actionSheet;
        this.ticket = {};
        this.comments = [];
        this.activeMaterialSection = 'description';
        this.materialData = {};
        this.images = [];
        this.flag = 'false';
        this.formData = {};
        console.log("constructor");
        this.route.queryParamMap.subscribe(function (params) {
            params.params.ticketId ? _this.ticketId = params.params.ticketId : '';
            params.params.flag ? _this.flag = params.params.flag : '';
            params.params.tid ? _this.ticketId = params.params.tid : '';
            console.log(_this.ticketId, _this.flag);
            _this.getTicketDetails();
        });
    }
    TicketDetailsPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({}).then(function (loading) {
                            loading.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TicketDetailsPage.prototype.ngOnInit = function () {
        this.selectedTab = 'SUMMARY';
        console.log(this.images.length);
    };
    TicketDetailsPage.prototype.ionViewWillEnter = function () {
        // if (this.flag === 'true') {
        //   console.log('true', this.ticketId);
        //   this.flag = 'false';
        //   this.ticket = [];
        //   this.getTicketDetails();
        // }
    };
    TicketDetailsPage.prototype.showMaterialForm = function () {
        this.activeMaterialSection = 'materialForm';
    };
    TicketDetailsPage.prototype.hideMaterialForm = function () {
        this.activeMaterialSection = 'description';
    };
    TicketDetailsPage.prototype.getTicketDetails = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.ticketService.getTicketById(this.ticketId)
                            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.ticket = data;
                                        return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('error-alert'));
                                        return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    TicketDetailsPage.prototype.getTicketComments = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.ticketService.getTicketComments(this.ticketId)
                            .subscribe(function (data) {
                            _this.loadingCtrl.dismiss();
                            _this.comments = data.data;
                            // console.log(this.comments);
                        }, function (err) {
                            _this.loadingCtrl.dismiss();
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), _this.transService.getTranslatedData('error-alert'));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TicketDetailsPage.prototype.updateTicket = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        if (this.ticketToBeUpdated.ticketCategory) {
                            this.ticketToBeUpdated.ticketCategory = this.ticketToBeUpdated.ticketCategoryId;
                        }
                        if (this.ticketToBeUpdated.ticketSubCategory) {
                            this.ticketToBeUpdated.ticketSubCategory = this.ticketToBeUpdated.ticketSubCategoryId;
                        }
                        if (this.images.length > 0) {
                            console.log("With Image");
                            console.log(this.ticketToBeUpdated);
                            this.alertService.upload(this.images[0], this.ticketToBeUpdated, 'ADDTOTICKETDETAIL').then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                        case 1:
                                            _a.sent();
                                            console.log(this.images);
                                            this.images = [];
                                            this.activeMaterialSection = 'description';
                                            this.materialData = {};
                                            this.getTicketDetails();
                                            this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('ticket-details.ticket-updated'));
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                        case 1:
                                            _a.sent();
                                            console.log(error);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        else {
                            console.log("Without Image");
                            this.ticketService.updateTicket(this.ticketToBeUpdated)
                                .subscribe(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.activeMaterialSection = 'description';
                                            this.materialData = {};
                                            return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                        case 1:
                                            _a.sent();
                                            this.getTicketDetails();
                                            this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('ticket-details.ticket-updated'));
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                                        case 1:
                                            _a.sent();
                                            this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('error-alert'));
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TicketDetailsPage.prototype.openUserSearchModal = function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var id, modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ticketToBeUpdated = Object.assign({}, this.ticket);
                        if (type === 'agent' && this.ticketToBeUpdated.agent) {
                            id = this.ticketToBeUpdated.agent._id;
                        }
                        else if (type === 'poc' && this.ticketToBeUpdated.contactPoint) {
                            id = this.ticketToBeUpdated.contactPoint._id;
                        }
                        return [4 /*yield*/, this.modalController.create({
                                component: UserSearchPage,
                                componentProps: {
                                    id: id
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (user) {
                            if (user !== null && user.data) {
                                if (type === 'agent') {
                                    console.log('selecting technician');
                                    console.log(user);
                                    _this.ticketToBeUpdated.agent = user.data.id;
                                    _this.updateTicket();
                                }
                                else if (type === 'poc') {
                                    console.log('selecting point of contact');
                                    console.log(user);
                                    _this.ticketToBeUpdated.contactPoint = user.data.id;
                                    _this.updateTicket();
                                }
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketDetailsPage.prototype.createComment = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            text: this.ticket.commentText,
                            ticket: this.ticketId,
                            type: 'ticket',
                        };
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.ticketService.createComment(data)
                            .subscribe(function (data) {
                            _this.loadingCtrl.dismiss();
                            _this.getTicketComments();
                            _this.ticket.commentText = '';
                            // this.router.navigateByUrl('/tickets');
                        }, function (err) {
                            _this.loadingCtrl.dismiss();
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), _this.transService.getTranslatedData('error-alert'));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TicketDetailsPage.prototype.updateCheckList = function (status, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.ticketToBeUpdated = Object.assign({}, this.ticket);
                this.ticketToBeUpdated.checklist[index].completed = status;
                this.updateTicket();
                this.activeMaterialSection = 'description';
                this.materialData = {};
                return [2 /*return*/];
            });
        });
    };
    TicketDetailsPage.prototype.openMaterialSearchModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: MaterialSearchPage,
                            componentProps: {}
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (materialData) {
                            console.log(materialData);
                            _this.materialData.name = materialData.data.name;
                            _this.materialData.product = materialData.data;
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketDetailsPage.prototype.tagMaterial = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.ticketToBeUpdated = Object.assign({}, this.ticket);
                this.ticketToBeUpdated.itemDetails.push(this.materialData);
                this.updateTicket();
                return [2 /*return*/];
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
    //   console.log(this.images);
    //   // if (this.images.length < 1) {
    //   let image = await this.alertService.capturePhoto(type);
    //   console.log("in add-visitor Page\n\n");
    //   console.log(image);
    //   if (image !== undefined) {
    //     this.images.push(image);
    //     this.images
    //     this.ticketToBeUpdated = Object.assign({}, this.ticket);
    //     this.updateTicket();
    //   }
    //   // } else {
    //   // this.alertService.presentAlert("Alert", "Only one picture is allowed!!")
    //   // }
    // }
    TicketDetailsPage.prototype.removeImage = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: this.transService.getTranslatedData('ticket-details.remove-image'),
                            buttons: [
                                {
                                    text: this.transService.getTranslatedData('ticket-details.update.no'),
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: this.transService.getTranslatedData('ticket-details.update.yes'),
                                    handler: function () {
                                        console.log(id);
                                        _this.ticketToBeUpdated = Object.assign({}, _this.ticket);
                                        _this.ticketToBeUpdated.files = _this.ticketToBeUpdated.files.filter(function (value) { return value._id !== id; });
                                        _this.updateTicket();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [2 /*return*/, alert.present()];
                }
            });
        });
    };
    TicketDetailsPage.prototype.removeMaterial = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: this.transService.getTranslatedData('ticket-details.delete-material'),
                            buttons: [
                                {
                                    text: this.transService.getTranslatedData('ticket-details.update.no'),
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: this.transService.getTranslatedData('ticket-details.update.yes'),
                                    handler: function () {
                                        console.log(id);
                                        _this.ticketToBeUpdated = Object.assign({}, _this.ticket);
                                        _this.ticketToBeUpdated.itemDetails = _this.ticketToBeUpdated.itemDetails.filter(function (value) { return value._id !== id; });
                                        _this.updateTicket();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [2 /*return*/, alert.present()];
                }
            });
        });
    };
    TicketDetailsPage.prototype.openImage = function (image) {
        this.modalController.create({
            component: PictureComponent,
            componentProps: { image: image }
        }).then(function (modal) {
            modal.present();
        });
    };
    TicketDetailsPage.prototype.call = function (number) {
        if (number) {
            window.location.href = 'tel:' + number;
        }
        else {
            this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('call-alert'));
        }
    };
    TicketDetailsPage.prototype.updatStatus = function (status) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var title, ticketActionStatus, alert_1, alert_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = '';
                        ticketActionStatus = ['resolved'];
                        this.trans.get('ticket-details.update.title', { val: status == 'in-progress' ? 'IN PROGRESS' : status.toUpperCase() }).subscribe(function (res) {
                            title = res;
                        });
                        this.ticketToBeUpdated = Object.assign({}, this.ticket);
                        if (!(this.ticketToBeUpdated.status === 'open' && ticketActionStatus.includes(status))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: "Please change ticket status to in-progress first",
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'ok',
                                    }
                                ]
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [2 /*return*/, alert_1.present()];
                    case 2:
                        if (!(status !== this.ticketToBeUpdated.status)) return [3 /*break*/, 4];
                        if (this.ticketToBeUpdated.status === 'open'
                            && !this.ticketToBeUpdated.agent
                            && status !== 'rejected') {
                            title = 'Technician/vendor is not tagged to this ticket. Do you still want to update the ticket status?';
                        }
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: title,
                                buttons: [
                                    {
                                        text: this.transService.getTranslatedData('ticket-details.update.no'),
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                            console.log('Confirm Cancel');
                                        }
                                    }, {
                                        text: this.transService.getTranslatedData('ticket-details.update.yes'),
                                        handler: function () {
                                            _this.ticketToBeUpdated.status = status;
                                            console.log(_this.ticketToBeUpdated);
                                            _this.updateTicket();
                                        }
                                    }
                                ]
                            })];
                    case 3:
                        alert_2 = _a.sent();
                        return [2 /*return*/, alert_2.present()];
                    case 4:
                        this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('ticket-details.update.status') + " " + status);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TicketDetailsPage = tslib_1.__decorate([
        Component({
            selector: 'app-ticket-details',
            templateUrl: './ticket-details.page.html',
            styleUrls: ['./ticket-details.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            LoadingController,
            TicketService,
            ModalController,
            AlertServiceService,
            AlertController,
            TranslateServiceService,
            TranslateService,
            ActionSheetController])
    ], TicketDetailsPage);
    return TicketDetailsPage;
}());
export { TicketDetailsPage };
//# sourceMappingURL=ticket-details.page.js.map