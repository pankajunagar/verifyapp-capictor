import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { OrgModalComponent } from '../org-modal/org-modal.component';
import { SearchProjectService } from 'src/app/common-services/search-properties/search-project.service';
var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(modalCtrl, alertService, userApprovalService, navController) {
        this.modalCtrl = modalCtrl;
        this.alertService = alertService;
        this.userApprovalService = userApprovalService;
        this.navController = navController;
        this.org = {};
        this.project = {};
        this.type = {};
        this.door = {};
        this.nextForm = false;
        this.adduser = {
            approval: {
                approvalData: {}
            },
            target: {}
        };
    }
    AddUserComponent.prototype.ngOnInit = function () { };
    AddUserComponent.prototype.close = function () {
        this.modalCtrl.dismiss();
    };
    AddUserComponent.prototype.presentOrgModal = function (type, id) {
        var _this = this;
        this.modalCtrl.create({
            component: OrgModalComponent,
            componentProps: {
                modalType: type,
                id: id ? id : undefined
            }
        }).then(function (modal) {
            modal.present();
            modal.onDidDismiss().then(function (res) {
                if (res != null) {
                    if (res.role == 'org') {
                        console.log(res);
                        _this.org = res.data.organization;
                        _this.adduser.approval.approvalData.org = res.data.organization._id;
                        window.localStorage.setItem('org', res.data.moduleName);
                    }
                    else if (res.role == 'project') {
                        _this.project = res.data;
                        _this.adduser.approval.approvalData.project = res.data._id;
                        console.log('====================================');
                        console.log(_this.project);
                        console.log('====================================');
                    }
                    else if (res.role == 'door') {
                        _this.door = res.data;
                        console.log('====================================');
                        console.log(res.data.homes[0]);
                        console.log('====================================');
                        // this.adduser.approval.approvalData.home = res.data._id
                    }
                }
            });
        });
    };
    AddUserComponent.prototype.orgSearch = function (type, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (type == 'project' && !this.org._id) {
                    this.alertService.presentAlert("", 'Please select an Organization');
                }
                else if (type == 'door') {
                    if (!this.org._id) {
                        this.alertService.presentAlert("", 'Please select an Organization');
                    }
                    else if (!this.project._id) {
                        this.alertService.presentAlert("", 'Please select a Project');
                    }
                    else {
                        this.presentOrgModal(type, id);
                    }
                }
                else {
                    this.presentOrgModal(type, id);
                }
                return [2 /*return*/];
            });
        });
    };
    AddUserComponent.prototype.proceed = function () {
        this.nextForm = !this.nextForm;
    };
    AddUserComponent.prototype.requestUserApproval = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var phoneno;
            return tslib_1.__generator(this, function (_a) {
                if (this.adduser.approval.type) {
                    if (this.adduser.approval.type == 'owner-approval') {
                        this.adduser.approval.approvalData.listing = this.door._id;
                    }
                    else if (this.adduser.approval.type == 'tenant-approval') {
                        this.adduser.approval.approvalData.home = this.door.homes[0];
                    }
                }
                phoneno = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
                if (this.adduser.target.countryCode === "+91") {
                    if (String(this.adduser.target.phoneNumber).match(phoneno)) {
                        if (this.adduser.target.email) {
                            if (this.validateEmail(this.adduser.target.email)) {
                                this.createUserApproval();
                            }
                            else {
                                this.alertService.presentAlert("", "Please enter a valid email address.");
                            }
                        }
                        else {
                            this.createUserApproval();
                        }
                    }
                    else {
                        this.alertService.presentAlert("", "Please enter a valid phone number.");
                    }
                }
                else {
                    if (String(this.adduser.target.phoneNumber).length > 4) {
                        if (this.adduser.target.email) {
                            if (this.validateEmail(this.adduser.target.email)) {
                                this.createUserApproval();
                            }
                            else {
                                this.alertService.presentAlert("", "Please enter a valid email address.");
                            }
                        }
                        else {
                            this.createUserApproval();
                        }
                    }
                    else {
                        this.alertService.presentAlert("", "Please enter a valid phone number..");
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    AddUserComponent.prototype.validateEmail = function (email) {
        var emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(email);
    };
    AddUserComponent.prototype.createUserApproval = function () {
        var _this = this;
        // this.presentLaoding();
        this.userApprovalService.createUserApproval(this.adduser).subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // await this.loadingCtrl.dismiss();
                this.alertService.presentAlert('', 'User approval request received');
                this.modalCtrl.dismiss();
                return [2 /*return*/];
            });
        }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.mixpanel.track('building-management createUserApproval service Error', {
                //   error: err,
                //   data: this.adduser
                // });
                // await this.loadingCtrl.dismiss();
                console.log(err);
                this.alertService.presentAlert("", 'something went wrong please try again');
                return [2 /*return*/];
            });
        }); });
    };
    AddUserComponent = tslib_1.__decorate([
        Component({
            selector: 'app-add-user',
            templateUrl: './add-user.component.html',
            styleUrls: ['./add-user.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            AlertServiceService,
            SearchProjectService,
            NavController])
    ], AddUserComponent);
    return AddUserComponent;
}());
export { AddUserComponent };
//# sourceMappingURL=add-user.component.js.map