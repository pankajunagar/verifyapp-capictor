import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NailaService } from '../../services/naila.service';
// import { ApprovalpopupComponent } from '../../modals/approvalpopup/approvalpopup.component';
var NailaticketPage = /** @class */ (function () {
    function NailaticketPage(nailaservice, alertController) {
        this.nailaservice = nailaservice;
        this.alertController = alertController;
        this.sliderConfig = {
            slidesPerView: 1.2,
            spaceBetween: 5,
        };
        this.sliderConfig2 = {
            slidesPerView: 3.2,
            spaceBetween: 5,
        };
        this.searchTerm = "";
        this.a = false;
        this.upcomingbooking = [];
        this.pastbooking = [];
        this.listbooking = [];
        this.bookingList = [];
        this.items = [
            { title: "one" },
            { title: "two" },
            { title: "three" },
            { title: "four" },
            { title: "five" },
            { title: "six" }
        ];
    }
    NailaticketPage.prototype.ngOnInit = function () {
        this.setFilteredItems();
        this.listAllTicket('upcoming');
    };
    NailaticketPage.prototype.listAllTicket = function (data) {
        var _this = this;
        this.listbooking = [];
        var date = new Date;
        var id = window.localStorage.getItem('user_id');
        this.nailaservice.listAllTickets(id).subscribe(function (data) {
            _this.bookingList = data;
        });
        this.bookingList.forEach(function (element) {
            if (element.schedule_on >= date) {
                _this.upcomingbooking.push(element);
            }
            else {
                _this.pastbooking.push(element);
            }
        });
        if (data == 'upcoming') {
            this.listbooking = [];
            this.listbooking = this.upcomingbooking;
            this.bookingname = "upcoming";
        }
        else {
            this.listbooking = [];
            this.listbooking = this.pastbooking;
            this.bookingname = "past";
        }
        console.log(this.listbooking);
    };
    // upcomingdata(data){
    //   this.listbooking=[];
    //   this.
    // }
    NailaticketPage.prototype.setFilteredItems = function () {
        this.items = this.filterItems(this.searchTerm);
    };
    NailaticketPage.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    NailaticketPage.prototype.presentAlert = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            // message: 'Enter your issue.',
                            inputs: [
                                {
                                    name: 'description',
                                    placeholder: 'Description'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Submit',
                                    handler: function (data) {
                                        var ticketdata = {
                                            "title": item.service.name,
                                            "description": data.description,
                                            "booking_id": item.service_id
                                        };
                                        _this.nailaservice.createTicket(ticketdata).subscribe(function (data) {
                                        });
                                        // let validateObj = (data);
                                        console.log("==================", data, "========================");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NailaticketPage = tslib_1.__decorate([
        Component({
            selector: 'app-nailaticket',
            templateUrl: './nailaticket.html',
            styleUrls: ['./nailaticket.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService, AlertController])
    ], NailaticketPage);
    return NailaticketPage;
}());
export { NailaticketPage };
//# sourceMappingURL=nailaticket.js.map