import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { NailaService } from "../../services/naila.service";
// import { ApprovalpopupComponent } from '../../modals/approvalpopup/approvalpopup.component';
var NailabookingPage = /** @class */ (function () {
    function NailabookingPage(nailaservice, alertController) {
        this.nailaservice = nailaservice;
        this.alertController = alertController;
        this.sliderConfig = {
            slidesPerView: 1.2,
            spaceBetween: 5
            // centeredSlides: true
        };
        this.sliderConfig2 = {
            slidesPerView: 3.2,
            spaceBetween: 5
            // centeredSlides: true
        };
        this.searchTerm = "";
        this.a = false;
        this.upcomingbooking = [];
        this.pastbooking = [];
        this.listbooking = [];
        this.bookingList = [];
        this.bookingname = "upcoming";
        this.items = [
            { title: "one" },
            { title: "two" },
            { title: "three" },
            { title: "four" },
            { title: "five" },
            { title: "six" }
        ];
    }
    NailabookingPage.prototype.ngOnInit = function () {
        this.setFilteredItems();
        this.listAllBookings("upcoming");
    };
    NailabookingPage.prototype.listAllBookings = function (data) {
        var _this = this;
        this.bookingList = [];
        this.listbooking.splice(0, this.listbooking.length);
        var id = window.localStorage.getItem("user_id");
        this.nailaservice.listAllBookings(id).subscribe(function (bookinglistdata) {
            _this.bookingList = bookinglistdata;
            _this.filterpastandupcomingBooking(data);
        });
    };
    // upcomingdata(data){
    //   this.listbooking=[];
    //   this.
    // }
    NailabookingPage.prototype.filterpastandupcomingBooking = function (data) {
        var _this = this;
        debugger;
        var date = new Date();
        this.upcomingbooking = [];
        this.pastbooking = [];
        this.bookingList.forEach(function (element) {
            if (new Date(element.schedule_on).getTime() >= date.getTime() && element.service_status === null) {
                _this.upcomingbooking.push(element);
            }
            else {
                _this.pastbooking.push(element);
            }
        });
        console.log("===================upcoming================", this.upcomingbooking, "==================================");
        console.log("-----------------past---------------", this.pastbooking, "---------------------------------------------");
        if (data == "upcoming") {
            debugger;
            // this.listbooking.splice(0,this.listbooking.length)
            this.listbooking = this.upcomingbooking;
            this.bookingname = "upcoming";
        }
        else {
            debugger;
            // this.listbooking.splice(0,this.listbooking.length)
            this.bookingname = "past";
            this.listbooking = this.pastbooking;
        }
    };
    NailabookingPage.prototype.setFilteredItems = function () {
        this.items = this.filterItems(this.searchTerm);
    };
    NailabookingPage.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    NailabookingPage.prototype.presentAlert = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            // message: 'Enter your issue.',
                            inputs: [
                                {
                                    name: "description",
                                    placeholder: "Description"
                                }
                            ],
                            buttons: [
                                {
                                    text: "Submit",
                                    handler: function (data) {
                                        var ticketdata = {
                                            title: item.service.name,
                                            description: data.description,
                                            booking_id: item.service_id
                                        };
                                        _this.nailaservice.createTicket(ticketdata).subscribe(function (data) { });
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
    NailabookingPage.prototype.presentInvoiceAlert = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'my-custom-invoice-class',
                                header: "Tracking Id: " + item.unique_id,
                                subHeader: "Total Amount: Rs." + item.total_amount,
                                message: "Payment Mode: " + (item.payment_status),
                                buttons: ['OK']
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
    NailabookingPage = tslib_1.__decorate([
        Component({
            selector: "app-nailabooking",
            templateUrl: "./nailabooking.html",
            styleUrls: ["./nailabooking.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService,
            AlertController])
    ], NailabookingPage);
    return NailabookingPage;
}());
export { NailabookingPage };
//# sourceMappingURL=nailabooking.js.map