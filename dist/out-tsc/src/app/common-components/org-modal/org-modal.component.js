import * as tslib_1 from "tslib";
import { Component, Input, } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SearchProjectService } from 'src/app/common-services/search-properties/search-project.service';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
// import { AlertserviceService } from 'src/app/common-services/alert/alertservice.service';
// import { Mixpanel } from '@ionic-native/mixpanel/ngx';
var OrgModalComponent = /** @class */ (function () {
    function OrgModalComponent(modalCtrl, searchProjectService, alertService, loading) {
        this.modalCtrl = modalCtrl;
        this.searchProjectService = searchProjectService;
        this.alertService = alertService;
        this.loading = loading;
        this.searchText = '';
        this.isloggedin = 'false';
        this.searchType = 'project';
        this.doors = [];
        this.org = {
            type: "multi",
            bm: {
                organization: {
                    _id: "5943d4efa3d24b443f4008a2",
                    name: "Monk Realty Solutions Pvt Ltd",
                    status: "active",
                    logo: { "thumbnail": "https://thehousemonk-saas-ramaniyam.s3-ap-southeast-1.amazonaws.com/demoAccount/S3C/documents/bc9af9b4-905c-434a-8121-35201db9a0ab-VnV-TE4F_fiSyYRJSdDzPVyd_c.png" }
                },
                action: "register",
                moduleName: "BM"
            },
            // rm: {
            //   organization: {
            //     _id: "5943d4efa3d24b443f4008a2",
            //     name: "Monk Realty Solutions Pvt Ltd",
            //     status: "active",
            //     logo: { "thumbnail": "https://thehousemonk-saas-ramaniyam.s3-ap-southeast-1.amazonaws.com/demoAccount/S3C/documents/bc9af9b4-905c-434a-8121-35201db9a0ab-VnV-TE4F_fiSyYRJSdDzPVyd_c.png" }
            //   },
            //   action: "register",
            //   moduleName: "RM"
            // },
            rm: {
                types: ["tenant"],
                organization: {
                    _id: "5d67abae2fca1d4059d940cb",
                    name: "Grexter Living",
                    status: "active",
                    logo: { "thumbnail": "https://thehousemonk-saas-ramaniyam.s3-ap-southeast-1.amazonaws.com/GrexterLiving-5d67abae2fca1d4059d940cb/S3C/documents/a8485ad4-75b8-43b3-8b91-4690a97e6b11-prrmYkcRf9MhoxJKZ9z3y6kV_c.png" }
                },
                action: "login",
                moduleName: "RM"
            }
        };
        this.projects = [];
    }
    OrgModalComponent.prototype.ngOnInit = function () {
        if (this.modalType == 'org') {
            this.searchOrg();
            this.title = 'an organization';
        }
        else if (this.modalType == "project") {
            this.searchProject();
            this.title = 'a project';
        }
        else if (this.modalType == 'door') {
            this.title = 'a unit';
            this.searchDoor();
        }
    };
    OrgModalComponent.prototype.presentLoading = function () {
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
    OrgModalComponent.prototype.close = function (data) {
        if (data) {
            this.modalCtrl.dismiss(data, this.modalType);
        }
        else {
            this.modalCtrl.dismiss(null, null);
        }
    };
    OrgModalComponent.prototype.searchOrg = function () {
    };
    OrgModalComponent.prototype.searchDoor = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        console.log('====================================');
                        console.log(this.searchText);
                        console.log('====================================');
                        this.searchProjectService.searchProject('listings', this.searchText, 0, 'project', this.id).subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.doors = data.listingsWithHomes;
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        // this.mixpanel.track('error while calling searchproject service', {
                                        //   type: 'listings',
                                        //   org: 'project',
                                        //   id: this.id
                                        // })
                                        this.alertService.presentAlert("", 'Something went wrong, Please try again later');
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    OrgModalComponent.prototype.searchProject = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var type, skip, org;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        console.log('====================================');
                        console.log(this.id);
                        console.log('====================================');
                        type = '';
                        skip = 0;
                        this.searchText;
                        this.searchProjectService.searchProject('projects', this.searchText, skip, 'organization', this.id).subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.projects = data.data;
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.alertService.presentAlert("", 'Something went wrong, Please try again later');
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], OrgModalComponent.prototype, "modalType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], OrgModalComponent.prototype, "id", void 0);
    OrgModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-org-modal',
            templateUrl: './org-modal.component.html',
            styleUrls: ['./org-modal.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            SearchProjectService,
            AlertServiceService,
            LoadingController])
    ], OrgModalComponent);
    return OrgModalComponent;
}());
export { OrgModalComponent };
//# sourceMappingURL=org-modal.component.js.map