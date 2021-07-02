import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var NoticeService = /** @class */ (function () {
    function NoticeService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
    }
    NoticeService.prototype.getNotices = function (filterData) {
        console.log(filterData);
        return this.http.get(this.appSettings.getApi() + "/api/discussion?skip=" + filterData.skip + "&limit=5&populate=files", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NoticeService.prototype.likeNotice = function (id) {
        return this.http.get(this.appSettings.getApi() + "/api/discussion/" + id + "/like", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NoticeService.prototype.getNoticeById = function (id) {
        console.log(id);
        return this.http.get(this.appSettings.getApi() + "/api/discussion/" + id + "?&populate=files", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NoticeService.prototype.getAllComments = function (id) {
        console.log(id);
        return this.http.get(this.appSettings.getApi() + "/api/discussion/" + id + "/comments?sortBy=-createdAt", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NoticeService.prototype.createComment = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/comment", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NoticeService.prototype.deleteComment = function (id) {
        console.log(id);
        return this.http.delete(this.appSettings.getApi() + "/api/comment/" + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NoticeService.prototype.createNotice = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/discussion", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NoticeService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], NoticeService);
    return NoticeService;
}());
export { NoticeService };
//# sourceMappingURL=notice.service.js.map