import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
var TicketService = /** @class */ (function () {
    function TicketService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
        this.apiUrl = 'https://alpha.thehousemonk.com';
    }
    TicketService.prototype.getTicketStats = function () {
        return this.http.get(this.appSettings.getApi() + "/api/stats/business-app", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService.prototype.getTickets = function (skip, status, ticketBelongsTo, type, projects, priority, startDate, endDate, contactPoint, agent, asset) {
        console.log(asset);
        return this.http.get(this.appSettings.getApi() + "/api/ticket?" + status + "&limit=10&sortBy=-createdAt&skip=" + skip + "&ticketBelongsTo=" + ticketBelongsTo + "&type=" + type + "&projects=" + projects + "&priority=" + priority + "&startDate=" + startDate + "&endDate=" + endDate + "&contactPoint=" + contactPoint + "&agent=" + agent + "&asset=" + asset, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService.prototype.getTicketCategories = function (filterData) {
        return this.http.get(this.appSettings.getApi() + "/api/category?belongsTo=" + filterData.ticketBelongsTo + "&" + filterData.ticketBelongsTo.toLowerCase() + "=" + filterData.ticketBelongsToRefId + "&status=active&status=inactive", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService.prototype.createTicket = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/ticket", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService.prototype.updateTicket = function (data) {
        return this.http.put(this.appSettings.getApi() + "/api/ticket/" + data._id, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService.prototype.getTicketById = function (ticketId) {
        return this.http.get(this.appSettings.getApi() + "/api/ticket/" + ticketId + "?populate=estimates&populate=assets&populate=contactPoint&populate=raisedBy&populate=agent&populate=itemDetails.product", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService.prototype.getTicketComments = function (ticketId) {
        return this.http.get(this.appSettings.getApi() + "/api/ticket/" + ticketId + "/comments", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService.prototype.createComment = function (data) {
        return this.http.post(this.appSettings.getApi() + "/api/comment", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService.prototype.searchMaterials = function (filterData) {
        return this.http.get(this.appSettings.getApi() + "/api/product-and-service?type=inventory&searchText=" + filterData.searchText + "&skip=" + filterData.skip + "&limit=10&status=active", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService.prototype.searchAssert = function (data) {
        return this.http.get(this.appSettings.getApi() + "/api/asset/" + data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        });
    };
    TicketService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            MainAppSetting])
    ], TicketService);
    return TicketService;
}());
export { TicketService };
//# sourceMappingURL=ticket.service.js.map