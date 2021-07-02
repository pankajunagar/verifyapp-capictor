import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var UnitService = /** @class */ (function () {
    function UnitService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
    }
    UnitService.prototype.getUnits = function (filterData) {
        console.log(filterData);
        return this.http.get(this.appSettings.getApi() + "/api/home?limit=10&searchText=" + filterData.searchText + "&skip=" + filterData.skip + "&status=active", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    UnitService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], UnitService);
    return UnitService;
}());
export { UnitService };
//# sourceMappingURL=unit.service.js.map