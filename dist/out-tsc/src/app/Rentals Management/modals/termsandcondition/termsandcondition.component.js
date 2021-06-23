import * as tslib_1 from "tslib";
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var TermsModalComponent = /** @class */ (function () {
    function TermsModalComponent(modalController, loadingCtrl, noticeService, router, alertService, route, webView, transService, actionSheet) {
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
    TermsModalComponent.prototype.ngOnInit = function () { };
    TermsModalComponent.prototype.presentLoading = function () {
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
    TermsModalComponent.prototype.closeModal = function () {
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
    TermsModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-termsandcondition',
            templateUrl: './termsandcondition.component.html',
            styleUrls: ['./termsandcondition.component.scss'],
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
    ], TermsModalComponent);
    return TermsModalComponent;
}());
export { TermsModalComponent };
//# sourceMappingURL=termsandcondition.component.js.map