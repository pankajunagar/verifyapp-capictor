import * as tslib_1 from "tslib";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var NailaService = /** @class */ (function () {
    function NailaService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
    }
    NailaService.prototype.getEstimateById = function (id) {
        return this.http.get(this.appSettings.getApi() + "/api/estimate/" + id + "?populate=statusChangedBy", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NailaService.prototype.updateEstimate = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/estimate/" + data._id, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NailaService.prototype.listBanners = function () {
        return this.http.get(this.appSettings.getApi() + "/products/getRelatedProductD", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                //   Authorization: localStorage.getItem('token')
                credentials: 'include',
            }),
            withCredentials: true,
        });
    };
    NailaService.prototype.apartmentList = function () {
        return this.http.get(this.appSettings.getApi() + "/api/v1/apartments/active", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.browseBycategory = function () {
        return this.http.get(this.appSettings.getApi() + "/api/v1/categories/active", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.selectedCategory = function (data) {
        return this.http.get(this.appSettings.getApi() + "/api/v1/categories/" + data + "/services", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    // 
    NailaService.prototype.listAllBookings = function (data) {
        return this.http.get(this.appSettings.getApi() + "/api/v1/bookings/users/" + data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.listAllTickets = function (data) {
        return this.http.get(this.appSettings.getApi() + "/api/v1/tickets/" + data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.listserviceByid = function (id) {
        return this.http.get(this.appSettings.getApi() + "/api/v1/services/" + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.applyCoupon = function (data) {
        return this.http.get(this.appSettings.getApi() + "/api/v1/bookings/coupons/" + data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.getAvailbleSlots = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/v1/bookings/get_slots", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.createBooking = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/v1/bookings", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.createTicket = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/v1/tickets", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.markAttendance = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/v1/attendances/punch_in", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.updateAttendance = function (data, punchin_id) {
        return this.http.put(this.appSettings.getApi() + "/api/v1/attendances/ " + punchin_id + "/punch_out", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.getBookingForBeautician = function (data) {
        return this.http.get(this.appSettings.getApi() + "/api/v1/bookings/beauticians/" + data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    NailaService.prototype.updatepaymentStatus = function (paymentdata, data) {
        return this.http.put(this.appSettings.getApi() + "/api/v1/bookings/" + data.id, paymentdata, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        });
    };
    //nowverifyit api
    NailaService.prototype.callGetTag = function (id) {
        // nfc/get
        return this.http.get(this.appSettings.getApi() + "/nfc/get/" + id + "/2", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
                credentials: 'include',
            })
        });
    };
    NailaService.prototype.callRecordScan = function (data) {
        return this.http.get(this.appSettings.getApi() + "/nfc/recordscan/" + data.tagId + "?location=" + data.location + "&lat=" + data.lat + "&long=" + data.long + "&pincode=" + data.pincode + "&city=" + data.city + "&state=" + data.state + "&country=" + data.country + "&source_token=" + data.source_token, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                Authorization: localStorage.getItem('token'),
                credentials: 'include',
            }),
            withCredentials: true,
        });
    };
    NailaService.prototype.callPostBoughtIt = function (tagId) {
        return this.http.post(this.appSettings.getApi() + "/nfc/bought", tagId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
            })
        });
    };
    NailaService.prototype.writeNFCQRcodedata = function (data) {
        return this.http.post(this.appSettings.getApi() + "/nfc/post/" + data.name + "/" + data.place, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
            })
        });
    };
    NailaService.prototype.genetateOTP = function (data) {
        return this.http.get(this.appSettings.getApi() + "/nfc/sendsms/" + data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
                credentials: 'include',
            }),
            withCredentials: true,
        });
    };
    NailaService.prototype.submitOTP = function (data) {
        return this.http.get(this.appSettings.getApi() + "/nfc/authPurchase/" + data.tagId + "/" + data.otp, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
                credentials: 'include',
            }),
            withCredentials: true,
        });
    };
    NailaService.prototype.listRelatedProducts = function (data) {
        return this.http.get(this.appSettings.getApi() + "/products/getRelatedProductDetails/" + data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
                credentials: 'include',
            }),
            withCredentials: true,
        });
    };
    NailaService.prototype.listRelatedProductsfrombrand = function (data) {
        return this.http.get(this.appSettings.getApi() + "/products/getRelatedProductDetails/0/" + data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
                credentials: 'include',
            }),
            withCredentials: true,
        });
    };
    NailaService.prototype.genToken = function () {
        return this.http.get(this.appSettings.getApi() + "/login/gentoken", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // Authorization: localStorage.getItem('token'),
                credentials: 'include',
            }),
            withCredentials: true,
        });
    };
    NailaService.prototype.reviewTracking = function (data) {
        // return this.http.post(`${this.appSettings.getApi()}/tracking/review_tracking`, data,
        return this.http.post(this.appSettings.getApi() + "/tracking/tracking", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    NailaService.prototype.getLoyaltyPointByuser = function (data) {
        // http://develop.nowverifyit.com/loyaltypoints/getloyaltyofuser/{$user_id}/{$token_id}/{$mobile_number}
        return this.http.get(this.appSettings.getApi() + "/loyaltypoints/getloyaltyofuser", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
                credentials: 'include',
            }),
            withCredentials: true,
        });
    };
    NailaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], NailaService);
    return NailaService;
}());
export { NailaService };
//# sourceMappingURL=naila.service.js.map