import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var SearchProjectService = /** @class */ (function () {
    function SearchProjectService(http, appSetting) {
        this.http = http;
        this.appSetting = appSetting;
    }
    SearchProjectService.prototype.searchProject = function (type, searchtext, skip, org, id) {
        //projects?limit=5&skip=0&searchText=&organization=5943d4efa3d24b443f4008a2
        return this.http.get("http://localhost:3020/shared-resource/onboarding/" + type + "?limit=10&searchText=" + searchtext + "&skip=" + skip + "&" + org + "=" + id, this.appSetting.getHttpHeades());
    };
    SearchProjectService.prototype.createUserApproval = function (data) {
        return this.http.post("http://localhost:3020/api/approval", data, this.appSetting.getHttpHeades());
    };
    SearchProjectService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], SearchProjectService);
    return SearchProjectService;
}());
export { SearchProjectService };
//# sourceMappingURL=search-project.service.js.map