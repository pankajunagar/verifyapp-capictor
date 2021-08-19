import * as tslib_1 from "tslib";
import { HttpHeaders } from '@angular/common/http';
import * as jsonFile from '../conatants/organization.json';
import { Injectable } from '@angular/core';
import { StorageService } from '../common-services/storage-service.service.js';
var ORG = jsonFile.buildFor;
var appFor = jsonFile.connectTo;
var MainAppSetting = /** @class */ (function () {
    function MainAppSetting(storageService) {
        var _this = this;
        this.storageService = storageService;
        this.ORG = ORG;
        this.appFor = appFor;
        this.platform = '';
        // public API = API;
        this.HTTPHEADER = this.getHttpHeades();
        this.storageService.getDatafromIonicStorage('token').then(function (data) {
            _this.token = data;
        });
        this.storageService.getDatafromIonicStorage('user_id').then(function (data) {
            _this.userId = data;
        });
        // this.storageService.getDatafromIonicStorage('platform').then(data => {
        //     this.platform = data
        // })
    }
    MainAppSetting.prototype.getPlatform = function () {
        var _this = this;
        this.storageService.getDatafromIonicStorage('platform').then(function (data) {
            _this.platform = data;
        });
    };
    MainAppSetting.prototype.getHttpHeades = function () {
        var httpHeades = {
            // withCredentials : true,
            // Credentials:'include',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                Authorization: localStorage.getItem('token'),
            }),
        };
        return httpHeades;
    };
    MainAppSetting.prototype.setTokenAferLogin = function (token) {
        this.token = token;
    };
    MainAppSetting.prototype.setPlatformAfterLogin = function (data) {
        console.log('Step 3 -------------received platform data', data);
        this.platform = data;
        console.log('Step 3 ------------- setting platform', this.platform);
    };
    MainAppSetting.prototype.getHttpHeadesWithToken = function () {
        var httpHeadesWithToken = {
            headers: new HttpHeaders({
                credentials: 'include',
                'Content-Type': 'application/json',
                'authorization': window.localStorage.getItem('token'),
                'Access-Control-Allow-Credentials': 'true'
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Credentials': 'true'
            }),
            withCredentials: true,
        };
        return httpHeadesWithToken;
    };
    MainAppSetting.prototype.getApi = function () {
        var _this = this;
        console.log("Get api service called - step pre 7-------");
        this.storageService.getDatafromIonicStorage('platform').then(function (data) {
            console.log("value recieved in step 7 from storage", data);
            _this.platform = data;
        });
        var API = '';
        // console.log("pltform inapp setting " + this.platform);
        console.log("platform value in step post 7", this.platform);
        if (this.ORG == "Both") {
            if (window.localStorage.getItem('platform') == "rm") {
                if (this.appFor == 'alpha') {
                    API = 'https://admin.grexter.in';
                }
                else if (this.appFor == 'production') {
                    API = 'https://rentals.thehousemonk.com';
                }
            }
            else {
                if (this.appFor == 'alpha') {
                    API = 'https://alpha.thehousemonk.com';
                }
                else if (this.appFor == 'production') {
                    API = 'https://thehousemonk.com';
                }
            }
        }
        else if (this.ORG == "RM") {
            // window.localStorage.setItem('appSrc', 'rentals');
            this.storageService.storeDataToIonicStorage('appSrc', 'rentals');
            if (this.appFor == 'alpha') {
                // API = 'https://www.nowverifyit.com';
                // API = 'https://develop.nowverifyit.com'; //charu
                API = 'http://develop.nowverifyit.com'; 
            }
            else if (this.appFor == 'production') {
                // API = 'https://www.nowverifyit.com';
                // API = 'https://develop.nowverifyit.com'; //charu
                API = 'http://develop.nowverifyit.com';
                
            }
        }
        else if (this.ORG == "BM") {
            window.localStorage.setItem('appSrc', 'building-management');
            this.storageService.storeDataToIonicStorage('appSrc', 'building-management');
            if (this.appFor == 'alpha') {
                API = 'https://alpha.thehousemonk.com';
            }
            else if (this.appFor == 'production') {
                API = 'https://thehousemonk.com';
            }
            else {
                API = 'http://localhost:3020';
            }
        }
        console.log('-------MAIN APP', API);
        return API;
    };
    MainAppSetting = tslib_1.__decorate([
        Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [StorageService])
    ], MainAppSetting);
    return MainAppSetting;
}());
export { MainAppSetting };
//# sourceMappingURL=MainAppSetting.js.map