import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var NoticeDetailsPage = /** @class */ (function () {
    function NoticeDetailsPage(noticeService, loading, modalController, route, router, alertService, transService) {
        var _this = this;
        this.noticeService = noticeService;
        this.loading = loading;
        this.modalController = modalController;
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.transService = transService;
        this.notice = {};
        this.noticeId = '';
        this.user_id = '';
        this.route.queryParamMap.subscribe(function (params) {
            params.params.noticeId ? _this.noticeId = params.params.noticeId : '';
            params.params.did ? _this.noticeId = params.params.did : '';
            console.log(_this.noticeId);
        });
        this.user_id = window.localStorage.getItem('user_id');
    }
    NoticeDetailsPage.prototype.ngOnInit = function () {
        this.getNotice();
        this.getAllComments();
    };
    NoticeDetailsPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            spinner: 'lines'
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
    NoticeDetailsPage.prototype.getNotice = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userId;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.presentLoading();
                        return [4 /*yield*/, this.alertService.getDataFromLoaclStorage('user_id').then(function (value) {
                                userId = value;
                            })];
                    case 1:
                        _a.sent();
                        this.noticeService.getNoticeById(this.noticeId)
                            .subscribe(function (data) {
                            _this.notice = data;
                            _this.notice.likes.indexOf(userId) > -1 ? _this.notice.hasLiked = true : _this.notice.hasLiked = false;
                            console.log(_this.notice);
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
    NoticeDetailsPage.prototype.getAllComments = function () {
        var _this = this;
        this.noticeService.getAllComments(this.noticeId)
            .subscribe(function (data) {
            _this.comments = data;
            console.log(_this.comments);
        }, function (err) {
            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
        });
    };
    NoticeDetailsPage.prototype.changeLikeIcon = function (id) {
        this.notice.hasLiked = !this.notice.hasLiked;
        if (this.notice.hasLiked === false) {
            this.notice.likesCount = this.notice.likesCount - 1;
        }
        else if (this.notice.hasLiked === true) {
            this.notice.likesCount = this.notice.likesCount + 1;
        }
    };
    NoticeDetailsPage.prototype.likeDiscussion = function (id) {
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
    NoticeDetailsPage.prototype.createComment = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            text: this.notice.commentText,
                            discussion: this.noticeId,
                        };
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.noticeService.createComment(data)
                            .subscribe(function (data) {
                            _this.notice.commentText = '';
                            _this.loading.dismiss();
                            _this.getAllComments();
                            // this.router.navigateByUrl('/tickets');
                        }, function (err) {
                            _this.loading.dismiss();
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeDetailsPage.prototype.deleteComment = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.noticeService.deleteComment(id)
                            .subscribe(function (data) {
                            _this.loading.dismiss();
                            _this.getAllComments();
                            // this.router.navigateByUrl('/tickets');
                        }, function (err) {
                            _this.loading.dismiss();
                            _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeDetailsPage = tslib_1.__decorate([
        Component({
            selector: 'app-notice-details',
            templateUrl: './notice-details.page.html',
            styleUrls: ['./notice-details.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NoticeService,
            LoadingController,
            ModalController,
            ActivatedRoute,
            Router,
            AlertServiceService,
            TranslateServiceService])
    ], NoticeDetailsPage);
    return NoticeDetailsPage;
}());
export { NoticeDetailsPage };
//# sourceMappingURL=notice-details.page.js.map