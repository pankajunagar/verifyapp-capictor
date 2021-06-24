import * as tslib_1 from "tslib";
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { ProjectSearchPage } from '../../pages/project-search/project-search.page';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var CreateNoticeComponent = /** @class */ (function () {
    function CreateNoticeComponent(modalController, loadingCtrl, noticeService, router, alertService, route, webView, transService, actionSheet) {
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.noticeService = noticeService;
        this.router = router;
        this.alertService = alertService;
        this.route = route;
        this.webView = webView;
        this.transService = transService;
        this.actionSheet = actionSheet;
        this.notice = {
            discussionBelongsTo: 'Project',
            discussionType: 'Notice',
            raisedByEmployee: true,
        };
        this.flag = false;
        this.images = [];
    }
    CreateNoticeComponent.prototype.ngOnInit = function () { };
    CreateNoticeComponent.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.loadingCtrl.create({
                    spinner: "lines"
                }).then(function (loading) {
                    loading.present();
                });
                return [2 /*return*/];
            });
        });
    };
    CreateNoticeComponent.prototype.closeModal = function () {
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
    CreateNoticeComponent.prototype.openProjectSearchModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ProjectSearchPage,
                            componentProps: {
                                id: this.notice.discussionBelongsToRefId,
                                name: this.notice.noticeBelongsToName
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (project) {
                            if (project !== null && project.data) {
                                console.log(project);
                                _this.notice.noticeBelongsToName = project.data.ticketBelongsToName;
                                _this.notice.discussionBelongsToRefId = project.data.ticketBelongsToRefId;
                                console.log(_this.notice);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateNoticeComponent.prototype.createNotice = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.presentLoading();
                if (this.images.length > 0) {
                    this.alertService.upload(this.images[0], this.notice, 'CREATENOTICE').then(function () {
                        _this.loadingCtrl.dismiss();
                        _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), _this.transService.getTranslatedData('create-notice-modal.notice-created'));
                        _this.flag = true;
                        _this.modalController.dismiss(_this.flag);
                        _this.router.navigateByUrl('/rentals-notice-board');
                    }, function (err) {
                        _this.loadingCtrl.dismiss();
                        if (err.error.message == "You don't have permission for this operation!") {
                            _this.alertService.presentAlert('', "You don't have permission for this operation!");
                            _this.modalController.dismiss();
                        }
                        else {
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err);
                        }
                    });
                }
                else {
                    this.noticeService.createNotice(this.notice)
                        .subscribe(function (data) {
                        _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), _this.transService.getTranslatedData('create-notice-modal.notice-created'));
                        _this.flag = true;
                        _this.loadingCtrl.dismiss();
                        _this.modalController.dismiss(_this.flag);
                        _this.router.navigateByUrl('/rentals-notice-board');
                    }, function (err) {
                        _this.loadingCtrl.dismiss();
                        if (err.error.message == "You don't have permission for this operation!") {
                            _this.alertService.presentAlert('', "You don't have permission for this operation!");
                            _this.modalController.dismiss();
                        }
                        else {
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    // async fileSourceOption(type) {
    //   if (this.images.length < 1) {
    //     const caller = await this.alertService.capturePhoto(type);
    //     console.log("in add-visitor Page\n\n");
    //     if (caller != undefined) {
    //       console.log(caller);
    //       this.images.push(caller);
    //       console.log(this.images);
    //     }
    //   } else {
    //     this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), this.transService.getTranslatedData('create-notice-modal.picture-limit'))
    //   }
    // }
    CreateNoticeComponent.prototype.removeImage = function () {
        this.images = [];
    };
    CreateNoticeComponent.prototype.dismiss = function () {
        this.modalController.dismiss(this.flag);
    };
    CreateNoticeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-create-notice',
            templateUrl: './create-notice.component.html',
            styleUrls: ['./create-notice.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            LoadingController,
            NoticeService,
            Router,
            AlertServiceService,
            ActivatedRoute,
            WebView,
            TranslateServiceService,
            ActionSheetController])
    ], CreateNoticeComponent);
    return CreateNoticeComponent;
}());
export { CreateNoticeComponent };
//# sourceMappingURL=create-notice.component.js.map