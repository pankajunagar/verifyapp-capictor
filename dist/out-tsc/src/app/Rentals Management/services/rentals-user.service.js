import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var RentalsUserService = /** @class */ (function () {
    function RentalsUserService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
    }
    RentalsUserService.prototype.getUsers = function () {
        return this.http.get(this.appSettings.getApi() + "/api/user/type?fields=firstName&fields=lastName&fields=types&fields=_id&status=active&types=vendor&types=employee&types=contract-employee&types=technician&types=admin&types=housekeeper", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    RentalsUserService.prototype.getUserById = function (id) {
        return this.http.get(this.appSettings.getApi() + "/api/user/" + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    RentalsUserService.prototype.getUserApprovals = function () {
        return this.http.get(this.appSettings.getApi() + "/api/approval", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    RentalsUserService.prototype.updateUser = function (data) {
        return this.http.put(this.appSettings.getApi() + "/api/user/" + data._id, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    RentalsUserService.prototype.approve = function (id) {
        return this.http.post(this.appSettings.getApi() + "/api/approval/" + id + "/approve", '', this.appSettings.getHttpHeadesWithToken());
    };
    RentalsUserService.prototype.reject = function (id, data) {
        console.log(data);
        var userData = {
            notes: data
        };
        return this.http.post(this.appSettings.getApi() + "/api/approval/" + id + "/reject", userData, this.appSettings.getHttpHeadesWithToken());
    };
    RentalsUserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], RentalsUserService);
    return RentalsUserService;
}());
export { RentalsUserService };
//# sourceMappingURL=rentals-user.service.js.map