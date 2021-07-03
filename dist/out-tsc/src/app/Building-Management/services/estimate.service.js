import * as tslib_1 from "tslib";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var EstimateService = /** @class */ (function () {
    function EstimateService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
    }
    EstimateService.prototype.getEstimateById = function (id) {
        return this.http.get(this.appSettings.getApi() + "/api/estimate/" + id + "?populate=statusChangedBy", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    EstimateService.prototype.updateEstimate = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/estimate/" + data._id, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    EstimateService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], EstimateService);
    return EstimateService;
}());
export { EstimateService };
//# sourceMappingURL=estimate.service.js.map