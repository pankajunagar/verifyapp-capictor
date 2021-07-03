import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ProfilePage } from './pages/profile/profile.page';
var BuildingManagementComponent = /** @class */ (function () {
    function BuildingManagementComponent(profile) {
        this.profile = profile;
        this.appPages = {
            name: '',
            phoneNumber: localStorage.getItem('phoneNumber'),
            pages: [
                {
                    title: 'Home',
                    url: '/home',
                    src: '/assets/icon/my-home.png'
                }, {
                    title: 'Calendar',
                    url: '/calendar',
                    src: '/assets/icon/calendar.png'
                }, {
                    title: 'Tickets',
                    url: '/tickets',
                    src: '/assets/icon/ticket-history.png'
                }, {
                    title: 'Notice board',
                    url: '/notice-board',
                    src: '/assets/icon/communications.png'
                },
                {
                    title: 'Approvals',
                    url: '/user-approval',
                    src: '/assets/icon/approval.png'
                },
                {
                    title: 'Contact us',
                    url: '/contact-us',
                    src: '/assets/icon/phone.png'
                },
                {
                    title: 'Profile',
                    url: '/profile',
                    src: '/assets/icon/profile.png'
                }
            ],
            logout: {
                title: 'Logout',
                src: '/assets/icon/log-out.png',
            }
        };
    }
    BuildingManagementComponent.prototype.logOut = function () {
        this.profile.logOut();
        // this.userService.getUserById(localStorage.getItem('user_id')).subscribe((data) => {
        //   data.businessAppDevice = {};
        //   this.userService.updateUser(data).subscribe(() => {
        //     localStorage.clear();
        //     this.router.navigateByUrl('/login');
        //   });
        // })
    };
    BuildingManagementComponent = tslib_1.__decorate([
        Component({
            selector: 'Building-management-root',
            templateUrl: 'building-management.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ProfilePage])
    ], BuildingManagementComponent);
    return BuildingManagementComponent;
}());
export { BuildingManagementComponent };
//# sourceMappingURL=building-management.component.js.map