import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var ProjectService = /** @class */ (function () {
    function ProjectService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
    }
    ProjectService.prototype.getProjects = function (filterData) {
        console.log(filterData);
        return this.http.get(this.appSettings.getApi() + "/api/project?limit=15&searchText=" + filterData.searchText + "&skip=" + filterData.skip + "&status=all", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    ProjectService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], ProjectService);
    return ProjectService;
}());
export { ProjectService };
//# sourceMappingURL=project.service.js.map