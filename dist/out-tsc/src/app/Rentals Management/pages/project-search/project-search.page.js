import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { ProjectService } from '../../services/project.service';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var ProjectSearchPage = /** @class */ (function () {
    function ProjectSearchPage(loadingCtrl, projectService, modalController, navParams, alertService, transService) {
        this.loadingCtrl = loadingCtrl;
        this.projectService = projectService;
        this.modalController = modalController;
        this.navParams = navParams;
        this.alertService = alertService;
        this.transService = transService;
        this.projects = [];
        this.loading = false;
        this.disableInfiniteScroll = false;
        this.selectedProject = {};
        this.filterData = {
            skip: 0,
            searchText: ''
        };
        if (this.navParams.get('id')) {
            this.selectedProject.ticketBelongsToRefId = this.navParams.get('id');
            this.selectedProject.ticketBelongsToName = this.navParams.get('name');
        }
        this.searchProject('');
    }
    ProjectSearchPage.prototype.ngOnInit = function () {
    };
    ProjectSearchPage.prototype.closeModal = function (sendData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sendData) return [3 /*break*/, 2];
                        console.log('Send data');
                        return [4 /*yield*/, this.modalController.dismiss(this.selectedProject)];
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
    ProjectSearchPage.prototype.selectProject = function (project) {
        this.selectedProject.ticketBelongsToName = project.name;
        this.selectedProject.ticketBelongsToRefId = project._id;
        this.closeModal(true);
    };
    // async presentLoading() {
    //   this.loading = await this.loadingCtrl.create({
    //   });
    //   this.loading.present();
    // }
    // type, searchtext, skip, token, status
    ProjectSearchPage.prototype.searchProject = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!event) {
                    this.loading = true;
                }
                this.projectService.getProjects(this.filterData)
                    .subscribe(function (data) {
                    _this.projects = _this.projects.concat(data.data.searchResult);
                    _this.filterData.skip = data.data.query.skip + 10;
                    console.log(_this.projects);
                    event ? event.target.complete() : _this.loading = false;
                    console.log('loading should dismiss');
                    if (data.data.query.current >= data.data.query.total) {
                        _this.disableInfiniteScroll = true;
                    }
                }, function (err) {
                    _this.loading = false;
                    _this.alertService.presentAlert(_this.transService.getTranslatedData('alert-title'), err.error.error);
                });
                return [2 /*return*/];
            });
        });
    };
    ProjectSearchPage.prototype.resetFilterAndSearch = function () {
        this.projects = [];
        this.filterData.skip = 0;
        this.disableInfiniteScroll = false;
        this.searchProject('');
    };
    ProjectSearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-project-search',
            templateUrl: './project-search.page.html',
            styleUrls: ['./project-search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [LoadingController,
            ProjectService,
            ModalController,
            NavParams,
            AlertServiceService,
            TranslateServiceService])
    ], ProjectSearchPage);
    return ProjectSearchPage;
}());
export { ProjectSearchPage };
//# sourceMappingURL=project-search.page.js.map