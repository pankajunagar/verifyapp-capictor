import * as tslib_1 from "tslib";
import { AlertServiceService } from '../../../common-services/alert-service.service';
import { Component } from '@angular/core';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { ProjectSearchPage } from '../project-search/project-search.page';
import { NoticeService } from '../../services/notice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var NoticeCreatePage = /** @class */ (function () {
    function NoticeCreatePage(modalController, loadingCtrl, noticeService, router, alertService, route, transService, webView, actionSheet) {
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.noticeService = noticeService;
        this.router = router;
        this.alertService = alertService;
        this.route = route;
        this.transService = transService;
        this.webView = webView;
        this.actionSheet = actionSheet;
        this.notice = {
            discussionBelongsTo: 'Project',
            discussionType: 'Notice',
            raisedByEmployee: true,
        };
        this.images = [];
    }
    NoticeCreatePage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({})];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NoticeCreatePage.prototype.ngOnInit = function () {
    };
    NoticeCreatePage.prototype.closeModal = function () {
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
    NoticeCreatePage.prototype.openProjectSearchModal = function () {
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
    NoticeCreatePage.prototype.createNotice = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        if (this.images.length > 0) {
                            this.alertService.upload(this.images[0], this.notice, 'CREATENOTICE').then(function () {
                                _this.loadingCtrl.dismiss();
                                _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), _this.transService.getTranslatedData('create-notice.notice-created'));
                                _this.router.navigateByUrl('/building-management-notice-board');
                            }, function (err) {
                                _this.loadingCtrl.dismiss();
                                _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err);
                            });
                        }
                        else {
                            this.noticeService.createNotice(this.notice)
                                .subscribe(function (data) {
                                _this.loadingCtrl.dismiss();
                                _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), _this.transService.getTranslatedData('create-notice.notice-created'));
                                _this.router.navigateByUrl('/building-management-notice-board');
                            }, function (err) {
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
    //     let image_url;
    //     let caller = await this.alertService.capturePhoto(type);
    //     image_url = caller;
    //     console.log("in add-visitor Page\n\n");
    //     if (image_url != undefined) {
    //       console.log(image_url);
    //       this.images.push(image_url);
    //       console.log(this.images);
    //     }
    //   } else {
    //     this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'),
    //       this.transService.getTranslatedData('create-notice.picture-limit'))
    //   }
    // }
    NoticeCreatePage.prototype.removeImage = function () {
        this.images = [];
    };
    NoticeCreatePage = tslib_1.__decorate([
        Component({
            selector: 'app-notice-create',
            templateUrl: './notice-create.page.html',
            styleUrls: ['./notice-create.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            LoadingController,
            NoticeService,
            Router,
            AlertServiceService,
            ActivatedRoute,
            TranslateServiceService,
            WebView,
            ActionSheetController])
    ], NoticeCreatePage);
    return NoticeCreatePage;
}());
export { NoticeCreatePage };
//# sourceMappingURL=notice-create.page.js.map