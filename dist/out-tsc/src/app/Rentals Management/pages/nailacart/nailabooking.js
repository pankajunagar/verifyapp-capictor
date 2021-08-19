import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController, PopoverController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NailaService } from '../../services/naila.service';
import { Utils } from '../../services/utils.service';
import { ApprovalpopupComponent } from '../../modals/approvalpopup/approvalpopup.component';
var NailaCartPage = /** @class */ (function () {
    function NailaCartPage(loadingCtrl, nailaservice, utils, popOver, router, platform) {
        this.loadingCtrl = loadingCtrl;
        this.nailaservice = nailaservice;
        this.utils = utils;
        this.popOver = popOver;
        this.router = router;
        this.platform = platform;
        this.paymentAmount = 0;
        this.currency = 'INR';
        this.currencyIcon = '₹';
        this.razor_key = 'rzp_live_4c3CzCuqiz6qHi';
        this.cardDetails = {};
        this.totalNumberofMinutes = 0;
        this.a = false;
        this.searchTerm = "";
        this.partialcoupon = false;
        this.foundcoupon = false;
        this.servicecount = 0;
        this.servicediscount = 0;
        this.cart = [];
        this.hidecartscreen = true;
        this.todaysdate = new Date();
        this.beauticiandata = [];
        this.items = [
            { title: "one" },
            { title: "two" },
            { title: "three" },
            { title: "four" },
            { title: "five" },
            { title: "six" }
        ];
        this.count = 0;
        this.itemcounter = 0;
        this.temp3 = {
            data: ''
        };
        // this.apartmentList = {
        //   id: 0,
        //   name: "BILLPAYMENT",
        //   value: "Wallet_1002"
        // };
    }
    NailaCartPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
                            spinner: "lines"
                        }).then(function (loading) {
                            loading.present();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NailaCartPage.prototype.ngOnInit = function () {
        var _this_1 = this;
        var myDate = new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000));
        var date = new Date();
        this.currentmindate = this.formatDate(date);
        this.currentplusthreedays = this.formatDate(myDate);
        if (window.localStorage.getItem('apartment_name')) {
            this.flat = window.localStorage.getItem('apartment_name');
        }
        else {
            this.flat = 'Select apartment';
        }
        window.localStorage.getItem('apartment_id');
        this.nailaservice.apartmentList().subscribe(function (data) {
            _this_1.apartmentList = data;
            _this_1.items = data;
            _this_1.apartmentList.forEach(function (element) {
                if (window.localStorage.getItem('apartment_id') === element.id) {
                    _this_1.selectedapartment = element.name;
                }
            });
        });
        this.setFilteredItems();
        var user_id = window.localStorage.getItem('user_id');
        this.utils.cartitem = JSON.parse(window.localStorage.getItem('cartitem'));
        if (window.localStorage.getItem('cartitemcount')) {
            this.utils.cartdata = window.localStorage.getItem('cartitemcount');
        }
        else {
            this.utils.cartdata = [];
        }
        if (this.utils.cartitem) {
            this.temp = (this.utils.cartitem.reduce(function (acc, val) {
                if (!acc.find(function (el) { return el.service.name === val.service.name && val.servicecount == 0; })) {
                    acc.push(val);
                }
                return acc;
            }, []));
            this.calculatePrice('');
            this.calculateMinute();
        }
    };
    NailaCartPage.prototype.setFilteredItems = function () {
        this.items = this.filterItems(this.searchTerm);
    };
    NailaCartPage.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    NailaCartPage.prototype.itemCounter = function (plusminus, data) {
        this.temp.forEach(function (element, i, object) {
            if (element.servicecount == 0)
                object.splice(i, 1);
        });
        if (plusminus == "plus" && data.servicecount >= 0) {
            this.temp.forEach(function (element) {
                if (element.service.name === data.service.name) {
                    data.servicecount = data.servicecount + 1;
                    // element.servicecount = this.itemcounter;
                    // this.calculatePrice()
                }
            });
        }
        else if (plusminus == "minus" && data.servicecount > 0) {
            this.temp.forEach(function (element, i, object) {
                if (element.service.name === data.service.name) {
                    data.servicecount = data.servicecount - 1;
                }
            });
        }
        // this.temp=this.temp3
        this.temp = (this.utils.cartitem.reduce(function (acc, val) {
            if (!acc.find(function (el) { return el.service.name === val.service.name && val.servicecount == 0; })) {
                acc.push(val);
            }
            return acc;
        }, []));
        window.localStorage.setItem('cartitem', JSON.stringify(this.temp));
        this.calculatePrice('');
        this.calculateMinute();
        this.calculateItemcount();
        if (this.coupon) {
            this.applyCoupon(this.coupon);
        }
    };
    NailaCartPage.prototype.calculateItemcount = function () {
        var _this_1 = this;
        this.cartitemcounter = 0;
        this.temp.forEach(function (element) {
            _this_1.cartitemcounter = element.servicecount + _this_1.cartitemcounter;
        });
        if (this.cartitemcounter <= 0) {
            window.localStorage.removeItem('cartitemcount');
            window.localStorage.removeItem('cartitem');
            this.utils.cartitem = false;
        }
        else {
            window.localStorage.setItem('cartitemcount', this.cartitemcounter);
        }
    };
    NailaCartPage.prototype.calculatePrice = function (manualcoupon) {
        var _this_1 = this;
        this.partialcoupon = true;
        this.servicecount = 0;
        this.servicediscount = 0;
        var swap = [this.totalprice];
        this.coupontemp = swap.slice();
        this.totalprice = 0;
        var totalitem = JSON.parse(window.localStorage.getItem('cartitem'));
        totalitem.forEach(function (serviceElement) {
            // if (element.service.coupons.length && element.service.coupons[0].is_active && element.service.coupons[0].coupon_type == 'percent') {
            //   this.itemDiscount = element.service.offer_price * (element.service.coupons[0].value / 100);
            //   this.itemPrice = element.service.offer_price - this.itemDiscount
            //   this.totalprice = (Number(this.itemPrice) * element.servicecount + Number(this.totalprice))
            // } else if (element.service.coupons.length && element.service.coupons[0].is_active && element.service.coupons[0].coupon_type == 'fixed_value') {
            //   this.itemDiscount = element.service.coupons[0].value
            //   this.itemPrice = element.service.offer_price - this.itemDiscount
            //   this.totalprice = (Number(this.itemPrice) * element.servicecount + Number(this.totalprice))
            // }      else 
            // serviceElement.forEach(element => {
            //   if(element.id)
            // });
            _this_1.foundcoupon = false;
            // this.partialcoupon=false
            if (manualcoupon && manualcoupon.coupon_type == 'percent' && serviceElement.service.coupons.length) {
              
                serviceElement.service.coupons.forEach(function (element) {
                    if (element.id == manualcoupon.id && element.name.toLowerCase() == manualcoupon.name.toLowerCase()) {
                        _this_1.foundcoupon = true;
                        _this_1.partialcoupon = true;
                        _this_1.discount = serviceElement.service.offer_price * (manualcoupon.value / 100);
                        _this_1.servicediscount = _this_1.discount * serviceElement.servicecount + _this_1.servicediscount;
                        _this_1.servicecount = _this_1.servicecount + serviceElement.servicecount;
                        _this_1.itemPrice = serviceElement.service.offer_price - _this_1.discount;
                        _this_1.totalprice = (Number(_this_1.itemPrice) * serviceElement.servicecount + Number(_this_1.totalprice));
                    }
                });
                if (!_this_1.foundcoupon) {
                    _this_1.totalprice = Number(serviceElement.service.offer_price) * serviceElement.servicecount + Number(_this_1.totalprice);
                    _this_1.partialcoupon = true;
                }
            }
            else if (manualcoupon && manualcoupon.coupon_type == 'fixed_value' && serviceElement.service.coupons.length) {
                serviceElement.service.coupons.forEach(function (element) {
                    if (element.id == manualcoupon.id && element.name.toLowerCase() == manualcoupon.name.toLowerCase()) {
                        _this_1.foundcoupon = true;
                        _this_1.partialcoupon = true;
                        _this_1.discount = manualcoupon.value;
                        _this_1.servicediscount = _this_1.discount * serviceElement.servicecount + _this_1.servicediscount;
                        // this.servicecount= this.servicecount + 
                        _this_1.itemPrice = serviceElement.service.offer_price - _this_1.discount;
                        _this_1.totalprice = (Number(_this_1.itemPrice) * serviceElement.servicecount + Number(_this_1.totalprice));
                    }
                });
                if (!_this_1.foundcoupon) {
                    _this_1.totalprice = Number(serviceElement.service.offer_price) * serviceElement.servicecount + Number(_this_1.totalprice);
                    // this.partialcoupon=true
                }
            }
            else {
                _this_1.totalprice = Number(serviceElement.service.offer_price) * serviceElement.servicecount + Number(_this_1.totalprice);
                _this_1.totalprice.toFixed(2);
                if (manualcoupon && !_this_1.partialcoupon && !_this_1.foundcoupon) {
                    alert('This coupon is not applicable on this service.');
                    _this_1.coupon = '';
                }
            }
            _this_1.cgst = _this_1.totalprice * 0.09;
            _this_1.sgst = _this_1.totalprice * 0.09;
        });
        // this.totalprice = cgst + sgst + this.totalprice;
        // if (manualcoupon && !this.foundcoupon) {
        //   this.totalprice = this.coupontemp[0];
        //   this.totalprice = Number(this.totalprice).toFixed(2)
        //   alert('This coupon is not applicable on this service.')
        //   this.coupon = ''
        // }
    };
    NailaCartPage.prototype.applyCoupon = function (data) {
        var _this_1 = this;
        this.nailaservice.applyCoupon(data).subscribe(function (item) {
            _this_1.coupondetail = item;
            window.localStorage.setItem('coupon_id', _this_1.coupondetail.id);
            if (_this_1.coupondetail.is_active) {
                _this_1.calculatePrice(_this_1.coupondetail);
            }
            else {
                // this.totalprice = this.coupontemp[0];
                // this.totalprice = Number(this.totalprice).toFixed(2)
                alert('This coupon is not applicable on this service.');
                _this_1.coupon = '';
            }
            // if (this.coupondetail.coupon_type == 'percent' && item) {
            //   this.discount = this.totalprice * (this.coupondetail.value / 100)
            //   this.totalprice = this.totalprice - this.discount
            // } else {
            //   this.totalprice = this.totalprice - this.coupondetail.value
            // }
        }, function (err) {
            alert('This coupon is not applicable on this service.');
            _this_1.coupon = '';
        });
    };
    NailaCartPage.prototype.removeCoupon = function () {
        this.totalprice = Number(this.totalprice) + Number(this.servicediscount);
        this.totalprice = this.totalprice.toFixed(2);
        this.discount = '';
        this.coupon = '';
    };
    NailaCartPage.prototype.calculateMinute = function () {
        var _this_1 = this;
        this.totalNumberofMinutes = 0;
        this.temp.forEach(function (element) {
            _this_1.totalNumberofMinutes = (element.service.no_of_minuties * element.servicecount) + _this_1.totalNumberofMinutes;
        });
        console.log("=================", this.totalNumberofMinutes, "======================================");
        this.slotdata = {
            "apartment_id": window.localStorage.getItem('apartment_id'),
            "no_of_minites": this.totalNumberofMinutes
        };
        var selectedapartment = this.slotdata;
        // this.getAvailabaleSlot(selectedapartment);
    };
    NailaCartPage.prototype.getAvailabaleSlot = function (event) {
        var _this_1 = this;
        this.beauticiandata = [];
      
        if (event.selected_date) {
            this.slotdate = event.selected_date.toDateString().split("T");
        }
        else {
            this.slotdate = event.split("T")[0];
        }
        this.selectedapartment = window.localStorage.getItem('apartment_id');
        var data = {
            "apartment_id": this.selectedapartment,
            "no_of_minites": this.totalNumberofMinutes,
            "selected_date": this.slotdate
        };
        if (data.apartment_id && data.no_of_minites) {
            this.nailaservice.getAvailbleSlots(data).subscribe(function (data) {
                _this_1.beauticiandata = data;
            });
        }
    };
    NailaCartPage.prototype.selectedbeautician = function (data) {
      
        console.log(data.target.value);
        this.selectedBeauticiandata = data.target.value;
        this.scheduledondate = data.target.value.start_datetime;
        this.scheduledend_datetime = data.target.value.start_datetime;
    };
    NailaCartPage.prototype.createBooking = function (paymentid, status, selectedmodeofpayment) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var temp, data;
            var _this_1 = this;
            return tslib_1.__generator(this, function (_a) {
                this.presentLoading();
                temp = this.temp.filter(function (element) {
                    return (element.servicecount > 0);
                });
                temp.forEach(function (element) {
                    _this_1.cart.push({
                        "service_id": element.service.id,
                        "quantity": element.servicecount
                    });
                });
                try {
                    data = {
                        "apartment_id": Number(window.localStorage.getItem('apartment_id')),
                        "user_id": Number(window.localStorage.getItem('user_id')),
                        "beautician_id": this.selectedBeauticiandata.beauticians[0],
                        "total_amount": this.totalprice,
                        "c_gst": this.cgst,
                        "s_gst": this.sgst,
                        "address": this.selectedaddress,
                        "flat_no": this.selectedflat,
                        "schedule_on": this.scheduledondate,
                        "schedule_till": this.scheduledend_datetime,
                        "total_no_of_minutes": this.totalNumberofMinutes,
                        "payment_status": status,
                        "payment_mode": selectedmodeofpayment,
                        "payment_id": paymentid,
                        "transaction_id": '',
                        "coupon_id": window.localStorage.getItem('coupon_id'),
                        "services": this.cart
                    };
                    this.nailaservice.createBooking(data).subscribe(function (data) {
                        _this_1.loadingCtrl.dismiss();
                        _this_1.router.navigateByUrl('/rentals-naila-search-page');
                        alert('Your booking has been done successfully.');
                        window.localStorage.removeItem('cartitem');
                        window.localStorage.removeItem('cartitemcount');
                        // this.hidecartscreen=false;
                    }, function (err) {
                        // this.router.navigateByUrl('/rentals-naila-search-page')
                        alert("something went wrong");
                        // window.localStorage.removeItem('cartitem')	
                        // window.localStorage.removeItem('cartitemcount')	
                    });
                }
                catch (e) {
                    console.log("error => ", e.response);
                }
                return [2 /*return*/];
            });
        });
    };
    NailaCartPage.prototype.presentPopover = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popOver;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popOver.create({
                            component: ApprovalpopupComponent,
                            backdropDismiss: false,
                            componentProps: {
                                val: ''
                            }
                        })];
                    case 1:
                        popOver = _a.sent();
                        popOver.onDidDismiss().then(function (data) {
                            if (data.data) {
                                if (data.data.val == 'approve') {
                                    // this.approvalUser(id)
                                }
                                else if (data.data.val == 'reject') {
                                    // this.rejectUser(id, data.data.notes)
                                }
                            }
                        });
                        return [4 /*yield*/, popOver.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NailaCartPage.prototype.selectedApartment = function (event) {
      
        this.selectedapartment = event.target.value.id;
        var slectedbuilding = window.localStorage.setItem('apartment_id', this.selectedapartment);
        // this.slotdata = {
        //   "apartment_id": window.localStorage.getItem('apartment_id'),
        //   "no_of_minites": this.totalNumberofMinutes,
        //   "selected_date": this.todaysdate
        // }
        var selectedapartment = this.slotdata;
        this.date = '';
        this.selecteddate = '';
        this.beauticiandata = [];
        // this.getAvailabaleSlot(selectedapartment);
    };
    NailaCartPage.prototype.payWithRazor = function () {
        var _this = this;
        var options = {
            description: 'Naila app product of Mayuri International group.',
            image: 'https://naila-proj.s3.ap-south-1.amazonaws.com/production/uploads/Assets/razorpaynailalogo.png',
            currency: this.currency,
            key: this.razor_key,
            amount: this.totalprice * 100,
            name: 'Naila Beauty Redefined',
            theme: {
                color: '#000000'
            },
            modal: {
                ondismiss: function () {
                    alert('dismissed');
                }
            }
        };
        var successCallback = function (payment_id) {
            _this.createBooking(payment_id, 'online_paid', 'online');
        };
        var cancelCallback = function (error) {
            // this.selectedmodeofpayment="by_cash"
            _this.createBooking('No payment id', 'Not paid', 'by_cash');
        };
        RazorpayCheckout.open(options, successCallback, cancelCallback);
    };
    NailaCartPage.prototype.ionViewWillLeave = function () {
        var _this_1 = this;
        window.localStorage.removeItem('coupon_id');
        this.cartitemcounter = 0;
        this.utils.cartitem = JSON.parse(window.localStorage.getItem('cartitem'));
        this.locatemp = this.utils.cartitem;
        if (!this.utils.cartitem) {
            this.utils.cartitem = [];
        }
        var filtercartitem = this.utils.cartitem.filter(function (element) {
            return (element.servicecount > 0);
        });
        if (filtercartitem.length) {
            filtercartitem.forEach(function (element) {
                _this_1.cartitemcounter = element.servicecount + _this_1.cartitemcounter;
            });
            window.localStorage.setItem('cartitem', JSON.stringify(filtercartitem));
            window.localStorage.setItem('cartitemcount', this.cartitemcounter);
        }
    };
    NailaCartPage.prototype.formatDate = function (date) {
        var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    NailaCartPage = tslib_1.__decorate([
        Component({
            selector: 'app-nailacart',
            templateUrl: './nailacart.html',
            styleUrls: ['./nailacart.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [LoadingController, NailaService, Utils, PopoverController, Router, Platform])
    ], NailaCartPage);
    return NailaCartPage;
}());
export { NailaCartPage };
//# sourceMappingURL=nailabooking.js.map