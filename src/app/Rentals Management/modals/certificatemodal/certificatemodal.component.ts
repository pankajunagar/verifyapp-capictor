import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx'
import * as moment from 'moment';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { translateService } from 'src/app/common-services/translate/translate-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Storage } from '@ionic/storage';
import { RentalsUserService } from '../../services/rentals-user.service';
import { Device } from '@ionic-native/device/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ViewChild } from '@angular/core';
import { NailaService } from '../../services/naila.service';
import { Utils } from '../../services/utils.service';
// import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-certificatemodal',
  templateUrl: './certificatemodal.component.html',
  styleUrls: ['./certificatemodal.component.scss'],
})


export class CertificateModalComponent {



  constructor(private nailaservice: NailaService,private utils:Utils, private router:Router, private mctrl:ModalController) {

  }
  searchTerm
  listbanner:any;


  ngOnInit() {
    this.items=this.utils.certificateData
    this.utils.certificateData.forEach(element => {
      debugger
      element.text= element.text
    });


    // this.nailaservice.listRelatedProducts(this.utils.).subscribe(data => {
    // this.listbanner=data;
    // this.items=this.listbanner.data
    //   this.listbanner.data.forEach(element => {
    //     element.text= element.product_text
    //   });
    // console.log(this.listbanner);
    // })



  }
  items
  setFilteredItems() {
    this.items = this.utils.certificateData;
    this.items = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  showProductInfo(item){
    // this.utils.productCatalogInfo=item;
    // this.router.navigateByUrl('/verifyit-product-catalog-info')
  }
  closeModal(){
    this.mctrl.dismiss();
  }
}
