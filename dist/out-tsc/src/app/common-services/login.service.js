import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jsonFile from '../conatants/organization.json';
import { MainAppSetting } from '../conatants/MainAppSetting.js';
import { HttpHeaders } from '@angular/common/http';
var appFor = jsonFile.connectTo;
var LoginService = /** @class */ (function () {
    function LoginService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
        this.appFor = appFor;
    }
    LoginService.prototype.checkPlatform = function (data) {
        return this.http.post(this.appSettings.getApi() + "/shared-resource/authentication/common-auth", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.needHelp = function (data) {
        var API = '';
        if (this.appFor == 'alpha') {
            API = 'https://alpha.thehousemonk.com';
        }
        else if (this.appFor == 'production') {
            API = 'https://admin.grexter.in';
        }
        return this.http.post(API + "/shared-resource/webhook/support/email", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.signIn = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/login", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.login = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/v2/login", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.verifyOtp = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/verify-otp", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.sendOtp = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/send-otp", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.reserPassword = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/reset-password", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.verifyPhone = function (data) {
        console.log("Step 6 --------- verify phone service called----");
        return this.http.post(this.appSettings.getApi() + "/api/verify-phone", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.userSignup = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/v1/user/send_otp", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.confirmOtp = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/v1/user/verify_otp", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.registerUser = function (data) {
        return this.http.post(this.appSettings.getApi() + "/register?email=" + data.email + "&signup-as=" + data.signupas + "&fullname=" + data.fullname + "&mobile=" + data.mobile + "&password=" + data.password + "&repassword=" + data.password_confirmation + "&gender=" + data.gender + ";", data, this.appSettings.getHttpHeades());
    };
    // "fullname": this.loginData.name,
    // "email": this.loginData.phoneNumber,
    // "password": this.loginData.password,
    // "password_confirmation": this.loginData.passwordCheck,
    // "gender": this.loginData.gender  ,
    // "signup-as":'user',
    // "mobile": this.loginData.mobile
    // registeredUser(data:any): Observable<any> {
    //   return this.http.post(
    //     `${this.appSettings.getApi()}/api/v1/auth/sign_in`,data,this.appSettings.getHttpHeades()
    //   );
    // }
    // registeredUser(data:any): Observable<any> {
    //   return this.http.post(
    //     `${this.appSettings.getApi()}/api/v1/auth/sign_in`,data,this.appSettings.getHttpHeades()
    //   );
    // }
    LoginService.prototype.loginUserInfo = function () {
        return this.http.get(this.appSettings.getApi() + "/login/userinfo", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                credentials: 'include',
                Authorization: localStorage.getItem('token'),
            }),
            withCredentials: true,
        });
    };
    // registeredUser(id): Observable<any> {
    //   return this.http.get(`${this.appSettings.getApi()}/login?email=${id.email}&password=${id.password}`,
    //     {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Credentials': 'true',
    //         credentials: 'include',
    //         Authorization: localStorage.getItem('token')
    //       }),
    //       withCredentials:true,
    //     }
    //     );
    // }
    LoginService.prototype.registeredUser = function (data) {
        return this.http.post(this.appSettings.getApi() + "/login", data, this.appSettings.getHttpHeades());
    };
    LoginService.prototype.resendOtp = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/v1/user/resend_otp", data, this.appSettings.getHttpHeades());
    };
    // forgotPassword(data)
    LoginService.prototype.forgotPassword = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/v1/user/reset_password", data, this.appSettings.getHttpHeades());
    };
    LoginService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map