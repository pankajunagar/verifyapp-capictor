import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NailaService } from '../../services/naila.service';
import { Utils } from '../../services/utils.service';
// import { Slides } from 'ionic-angular';
var CertificateModalComponent = /** @class */ (function () {
    function CertificateModalComponent(nailaservice, utils, router, mctrl) {
        this.nailaservice = nailaservice;
        this.utils = utils;
        this.router = router;
        this.mctrl = mctrl;
    }
    CertificateModalComponent.prototype.ngOnInit = function () {
        this.items = this.utils.certificateData;
        this.utils.certificateData.forEach(function (element) {
          
            element.text = element.text;
        });
        // this.nailaservice.listRelatedProducts(this.utils.).subscribe(data => {
        // this.listbanner=data;
        // this.items=this.listbanner.data
        //   this.listbanner.data.forEach(element => {
        //     element.text= element.product_text
        //   });
        // console.log(this.listbanner);
        // })
    };
    CertificateModalComponent.prototype.setFilteredItems = function () {
        this.items = this.utils.certificateData;
        this.items = this.filterItems(this.searchTerm);
    };
    CertificateModalComponent.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            return item.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    CertificateModalComponent.prototype.showProductInfo = function (item) {
        // this.utils.productCatalogInfo=item;
        // this.router.navigateByUrl('/verifyit-product-catalog-info')
    };
    CertificateModalComponent.prototype.closeModal = function () {
        this.mctrl.dismiss();
    };
    CertificateModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-certificatemodal',
            templateUrl: './certificatemodal.component.html',
            styleUrls: ['./certificatemodal.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NailaService, Utils, Router, ModalController])
    ], CertificateModalComponent);
    return CertificateModalComponent;
}());
export { CertificateModalComponent };
//# sourceMappingURL=certificatemodal.component.js.map