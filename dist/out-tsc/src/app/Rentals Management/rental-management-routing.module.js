import * as tslib_1 from "tslib";
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
var routes = [
    {
        path: '',
        redirectTo: 'rentals-naila-search-page',
        pathMatch: 'full'
    },
    { path: 'rentals-home', loadChildren: '../Rentals Management/pages/home/home.module#HomePageModule' },
    { path: 'rentals-profile', loadChildren: '../Rentals Management/pages/profile/profile.module#ProfilePageModule' },
    { path: 'rentals-tickets', loadChildren: '../Rentals Management/pages/tickets/tickets.module#TicketsPageModule' },
    { path: 'rentals-calendar', loadChildren: '../Rentals Management/pages/calendar/calendar.module#CalendarPageModule' },
    { path: 'rentals-create-ticket', loadChildren: '../Rentals Management/pages/create-ticket/create-ticket.module#CreateTicketPageModule' },
    { path: 'rentals-ticket-filter', loadChildren: '../Rentals Management/pages/ticket-filter/ticket-filter.module#TicketFilterPageModule' },
    { path: 'rentals-user-search', loadChildren: '../Rentals Management/pages/user-search/user-search.module#UserSearchPageModule' },
    { path: 'rentals-project-search', loadChildren: '../Rentals Management/pages/project-search/project-search.module#ProjectSearchPageModule' },
    { path: 'rentals-unit-search', loadChildren: '../Rentals Management/pages/unit-search/unit-search.module#UnitSearchPageModule' },
    { path: 'rentals-ticket-category-search', loadChildren: '../Rentals Management/pages/ticket-category-search/ticket-category-search.module#TicketCategorySearchPageModule' },
    { path: 'rentals-ticket-sub-category-search', loadChildren: '../Rentals Management/pages/ticket-sub-category-search/ticket-sub-category-search.module#TicketSubCategorySearchPageModule' },
    { path: 'rentals-ticket-details', loadChildren: '../Rentals Management/pages/ticket-details/ticket-details.module#TicketDetailsPageModule', runGuardsAndResolvers: 'always' },
    { path: 'rentals-material-search', loadChildren: '../Rentals Management/pages/material-search/material-search.module#MaterialSearchPageModule' },
    { path: 'rentals-notice-board', loadChildren: '../Rentals Management/pages/notice-board/notice-board.module#NoticeBoardPageModule' },
    { path: 'rentals-notice-details', loadChildren: '../Rentals Management/pages/notice-details/notice-details.module#NoticeDetailsPageModule' },
    { path: 'rentals-user-approval', loadChildren: '../Rentals Management/pages/user-approval/user-approval.module#UserApprovalPageModule' },
    { path: 'rentals-contact-us', loadChildren: '../Rentals Management/pages/contact-us/contact-us.module#ContactUsPageModule' },
    { path: 'rentals-estimate', loadChildren: '../Rentals Management/pages/estimate/estimate.module#EstimatePageModule' },
    { path: 'rentals-naila-search-page', loadChildren: '../Rentals Management/pages/nailasearchpage/nailasearchpage.module#NailasearchPageModule' },
    { path: 'rentals-naila-service-page', loadChildren: '../Rentals Management/pages/nailaservicepage/nailaservicepage.module#NailaservicePageModule' },
    { path: 'rentals-naila-offers-page', loadChildren: '../Rentals Management/pages/nailaofferspage/nailaofferspage.module#NailaOffersPageModule' },
    { path: 'rentals-naila-offers-listing-page', loadChildren: '../Rentals Management/pages/nailaofferslisting/nailaofferslisting.module#NailaoffersListingPageModule' },
    { path: 'rentals-naila-account-page', loadChildren: '../Rentals Management/pages/nailaaccountpage/nailaaccountpage.module#NailaAccountPageModule' },
    { path: 'rentals-naila-booking-page', loadChildren: '../Rentals Management/pages/nailabooking/nailabooking.module#NailabookingPageModule' },
    { path: 'rentals-naila-cart-page', loadChildren: '../Rentals Management/pages/nailacart/nailacart.module#NailaCartPageModule' },
    { path: 'rentals-naila-ticket-page', loadChildren: '../Rentals Management/pages/nailaticket/nailaticket.module#NailaticketPageModule' },
    { path: 'rentals-naila-beaut-booking-page', loadChildren: '../Rentals Management/pages/beauticianbooking/beauticianbooking.module#NailaBeauticianBookingPageModule' },
    { path: 'rentals-naila-beaut-attendance-page', loadChildren: '../Rentals Management/pages/nailabeauticianattendance/nailabeauticianattendance.module#NailabeauticianAttendanceModule' },
    { path: 'verifyit-dashboard', loadChildren: '../Rentals Management/pages/verifyitdashboard/verifyitdashboard.module#VerifyitDashboardPageModule' },
    { path: 'verifyit-product-info', loadChildren: '../Rentals Management/pages/verifyitProductinfo/verifyitProductinfo.module#VerifyitProductInfoPageModule' },
    { path: 'verifyit-store-product-info', loadChildren: '../Rentals Management/pages/verifyitstoreproductinfo/verifyitstoreproductinfo.module#VerifyitStoreProductInfoPageModule' },
    { path: 'verifyit-message', loadChildren: '../Rentals Management/pages/verifyitsuccessmessage/verifyitsuccessmessage.module#VerifyItSuccessMessageModule' },
    { path: 'verifyit-account', loadChildren: '../Rentals Management/pages/verifyitaccountspage/verifyitaccountspage.module#VerifyitAccountsPageModule' },
    { path: 'verifyit-product-catalog-info', loadChildren: '../Rentals Management/pages/verifyitproductcataloginfo/verifyitproductcataloginfo.module#VerifyitProductCatalogInfoPageModule' },
    { path: 'verifyit-product-catalog', loadChildren: '../Rentals Management/pages/verifyitproductcatalog/verifyitproductcatalog.module#VerifyitProductCatalogPageModule' },
    { path: 'verifyit-rewards', loadChildren: '../Rentals Management/pages/verifyitrewards/verifyitrewards.module#VerifyitRewardsModule' },
    { path: 'verifyit-offer', loadChildren: '../Rentals Management/pages/verifyitoffer/verifyitoffer.module#VerifyitOfferModule' },
];
var RentalsRoutingModule = /** @class */ (function () {
    function RentalsRoutingModule() {
    }
    RentalsRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forChild(routes)
            ],
            exports: [RouterModule]
        })
    ], RentalsRoutingModule);
    return RentalsRoutingModule;
}());
export { RentalsRoutingModule };
//# sourceMappingURL=rental-management-routing.module.js.map