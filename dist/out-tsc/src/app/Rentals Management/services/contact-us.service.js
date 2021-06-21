import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var ContactUsService = /** @class */ (function () {
    function ContactUsService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
    }
    ContactUsService.prototype.createContactUs = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/support/help/send-troubleshoot-mail", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    ContactUsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], ContactUsService);
    return ContactUsService;
}());
export { ContactUsService };
//# sourceMappingURL=contact-us.service.js.map