import * as tslib_1 from "tslib";
import { LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { EstimateService } from '../../services/estimate.service';
var EstimatePage = /** @class */ (function () {
    function EstimatePage(route, estimateService, alertService, loadingCtrl) {
        var _this = this;
        this.route = route;
        this.estimateService = estimateService;
        this.alertService = alertService;
        this.loadingCtrl = loadingCtrl;
        this.estimate = {};
        this.estimateToBeUpdated = {};
        this.route.queryParamMap.subscribe(function (params) {
            _this.presentLoading();
            _this.getEstimateById(params.params.estimateId);
        });
    }
    EstimatePage.prototype.ngOnInit = function () {
    };
    EstimatePage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
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
    EstimatePage.prototype.getEstimateById = function (id) {
        var _this = this;
        this.estimateService.getEstimateById(id).subscribe(function (data) {
            console.log(data);
            _this.estimate = data;
            _this.loadingCtrl.dismiss();
        }, function (err) {
            _this.alertService.presentAlert('Error', JSON.stringify(err));
        });
    };
    EstimatePage.prototype.updateEstimate = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.estimateToBeUpdated = Object.assign({}, this.estimate);
                this.estimateService.updateEstimate(this.estimateToBeUpdated).subscribe(function (data) {
                    console.log(data);
                });
                return [2 /*return*/];
            });
        });
    };
    EstimatePage = tslib_1.__decorate([
        Component({
            selector: 'app-estimate',
            templateUrl: './estimate.page.html',
            styleUrls: ['./estimate.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            EstimateService,
            AlertServiceService,
            LoadingController])
    ], EstimatePage);
    return EstimatePage;
}());
export { EstimatePage };
//# sourceMappingURL=estimate.page.js.map