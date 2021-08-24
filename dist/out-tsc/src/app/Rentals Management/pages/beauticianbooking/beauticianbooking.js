import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NailaService } from '../../services/naila.service';
// import { ApprovalpopupComponent } from '../../modals/approvalpopup/approvalpopup.component';
var NailaBeauticianBookingPage = /** @class */ (function () {
    function NailaBeauticianBookingPage(nailaservice, alertController) {
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
        // this.bookingname="Loading"
    }
    NailaBeauticianBookingPage.prototype.ngOnInit = function () {
        this.setFilteredItems();
        this.listAllBookings('past');
    };
    NailaBeauticianBookingPage.prototype.listAllBookings = function (data) {
        var _this = this;
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.starttimeoftomorrow = tomorrow;
        this.starttimeoftomorrow.setHours(0, 0, 0, 0);
        this.endtimeoftomorrow = tomorrow;
        this.endtimeoftomorrow.setHours(23, 59, 59, 999);
        this.starttimeofday = new Date();
        this.starttimeofday.setHours(0, 0, 0, 0);
        this.endtimeofday = new Date();
        this.endtimeofday.setHours(23, 59, 59, 999);
        // element.schedule_on).getTime()
        this.listbooking.splice(0, this.listbooking.length);
        var date = new Date();
        console.log(date);
        var id = window.localStorage.getItem('beautician_id');
        this.nailaservice.getBookingForBeautician(id).subscribe(function (bookingList) {
            _this.bookingList = bookingList;
            _this.upcomingbooking = [];
            _this.bookingList.forEach(function (element) {
                
                if (new Date(element.schedule_on).getTime() >= _this.starttimeofday.getTime() && new Date(element.schedule_on).getTime() < _this.endtimeofday.getTime()) {
                    _this.pastbooking.push(element);
                }
                else if (new Date(element.schedule_on).getTime() >= _this.endtimeofday.getTime() && new Date(element.schedule_on).getTime() < _this.endtimeoftomorrow.getTime()) {
                    _this.upcomingbooking.push(element);
                }
            });
            if (data == 'past') {
                // this.listbooking = []
                _this.listbooking.splice(0, _this.listbooking.length);
                _this.listbooking = _this.pastbooking;
                if (_this.listbooking)
                    _this.bookingname = "Todays";
            }
            else {
                _this.listbooking.splice(0, _this.listbooking.length);
                _this.listbooking = _this.upcomingbooking;
                if (_this.listbooking)
                    _this.bookingname = "Tomorrow";
            }
            console.log(_this.listbooking);
        });
    };
    // upcomingdata(data){
    //   this.listbooking=[];
    //   this.
    // }
    NailaBeauticianBookingPage.prototype.setFilteredItems = function () {
        this.items = this.filterItems(this.searchTerm);
    };
    NailaBeauticianBookingPage.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    NailaBeauticianBookingPage.prototype.presentAlert = function (item) {
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
    NailaBeauticianBookingPage.prototype.collectedCash = function (bookingdata) {
        
        var paymentdata = {
            "apartment_id": bookingdata.apartment_id,
            "user_id": bookingdata.user_id,
            "beautician_id": bookingdata.beautician_id,
            "total_amount": bookingdata.total_amount,
            "c_gst": 9,
            "s_gst": 9,
            "service_status": bookingdata.service_status,
            "address": bookingdata.address,
            "schedule_on": bookingdata.schedule_on,
            "schedule_till": bookingdata.schedule_till,
            "total_no_of_minutes": bookingdata.total_no_of_minutes,
            "payment_status": bookingdata.payment_status,
            "payment_mode": bookingdata.payment_mode,
            "payment_id": bookingdata.payment_id,
            "transaction_id": "21342387732424",
            "coupon_id": 1
        };
        this.nailaservice.updatepaymentStatus(paymentdata, bookingdata).subscribe(function (data) {
            bookingdata = data;
            alert('Successfully status updated.');
            // if(bookingdata.payment_status='Paid'){
            //   bookingdata.payment_status='Paid'
            // }
            // if(bookingdata.service_status=='Service Done'){
            //   bookingdata.service_status='Service Done'
            // }
        });
    };
    NailaBeauticianBookingPage = tslib_1.__decorate([
        Component({
            selector: 'app-beauticianbooking',
            templateUrl: './beauticianbooking.html',
            styleUrls: ['./beauticianbooking.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService, AlertController])
    ], NailaBeauticianBookingPage);
    return NailaBeauticianBookingPage;
}());
export { NailaBeauticianBookingPage };
//# sourceMappingURL=beauticianbooking.js.map