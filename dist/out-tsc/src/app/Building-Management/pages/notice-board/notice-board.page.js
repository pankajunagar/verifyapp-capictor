import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { NoticeCreatePage } from '../notice-create/notice-create.page';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Router } from '@angular/router';
var NoticeBoardPage = /** @class */ (function () {
    function NoticeBoardPage(noticeService, loading, modalController, alertService, transService, router) {
        this.noticeService = noticeService;
        this.loading = loading;
        this.modalController = modalController;
        this.alertService = alertService;
        this.transService = transService;
        this.router = router;
        this.notices = [];
        this.disableInfiniteScroll = false;
        this.filterData = {
            skip: 0
        };
    }
    NoticeBoardPage.prototype.ngOnInit = function () {
    };
    NoticeBoardPage.prototype.ionViewDidEnter = function () {
        this.filterData.skip = 0;
        this.notices = [];
        this.disableInfiniteScroll = false;
        this.getNoices('');
    };
    NoticeBoardPage.prototype.presentLoading = function () {
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
    NoticeBoardPage.prototype.getNoices = function (event) {
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
                        this.noticeService.getNotices(this.filterData)
                            .subscribe(function (data) {
                            _this.notices = _this.notices.concat(data.data.data);
                            _this.filterData.skip = data.data.query.skip + 5;
                            console.log(_this.notices);
                            event ? event.target.complete() : _this.loading.dismiss();
                            if (data.data.query.current >= data.data.query.total) {
                                _this.disableInfiniteScroll = true;
                            }
                        }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        console.log(err);
                                        if (err.error == "You don't have permission for this operation!") {
                                            this.alertService.presentAlert('', "You don't have permission for this operation!");
                                            this.router.navigateByUrl('building-management-home');
                                        }
                                        else {
                                            this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'), err.error.error);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeBoardPage.prototype.changeLikeIcon = function (id) {
        this.notices.map(function (item) {
            if (item._id === id) {
                item.hasLiked = !item.hasLiked;
                if (item.hasLiked === false) {
                    item.likesCount = item.likesCount - 1;
                }
                else if (item.hasLiked === true) {
                    item.likesCount = item.likesCount + 1;
                }
            }
        });
    };
    NoticeBoardPage.prototype.openCreateNoticeModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: CreateNoticeComponent
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            if (data.data === true) {
                                console.log(data.data);
                                _this.notices = [];
                                _this.filterData.skip = 0;
                                _this.getNoices('');
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NoticeBoardPage.prototype.stopEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    NoticeBoardPage.prototype.likeDiscussion = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.noticeService.likeNotice(id)
                            .subscribe(function (data) {
                            _this.changeLikeIcon(id);
                            _this.loading.dismiss();
                        }, function (err) {
                            _this.loading.dismiss();
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeBoardPage.prototype.openNoticeCreateModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: NoticeCreatePage,
                            componentProps: { value: 123 }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NoticeBoardPage.prototype.closeModal = function () {
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
    NoticeBoardPage = tslib_1.__decorate([
        Component({
            selector: 'app-notice-board',
            templateUrl: './notice-board.page.html',
            styleUrls: ['./notice-board.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NoticeService,
            LoadingController,
            ModalController,
            AlertServiceService,
            TranslateServiceService,
            Router])
    ], NoticeBoardPage);
    return NoticeBoardPage;
}());
export { NoticeBoardPage };
//# sourceMappingURL=notice-board.page.js.map