import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { Router ,ActivatedRoute} from '@angular/router';
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
  selector: 'app-verifyitproductcatalog',
  templateUrl: './verifyitproductcatalog.html',
  styleUrls: ['./verifyitproductcatalog.scss'],
})


export class VerifyitProductCatalogPage {



  constructor(private nailaservice: NailaService, private utils: Utils, private router: Router,private route: ActivatedRoute, ) {

  }
  searchTerm
  listbanner: any;
  groupedProducts = [];
  jsonToBeUsed = []

  ngOnInit() {

    if (this.route.snapshot.queryParams['brand']) {
     let brand = this.route.snapshot.queryParams['brand'];

     this.nailaservice.listRelatedProductsfrombrand(brand).subscribe(data=>{
      this.listbanner = data;

      if (this.listbanner.data[0].meta_data.category) {
        this.groupBy(this.listbanner.data, "category");

        console.log('=================================>===============')
        this.groupedProducts.push(this.result)


        Object.keys(this.result).forEach(e => this.jsonToBeUsed.push({ key: e, value: this.result[e] }))
        console.log(this.jsonToBeUsed)
        console.log('=================================>===============')
      }


      this.items = this.listbanner.data
      this.listbanner.data.forEach(element => {
        element.name = element.product_name
      });
      console.log(this.listbanner);
     })
    }else{
      this.nailaservice.listRelatedProducts(this.utils.productId).subscribe(data => {
        this.listbanner = data;
  
        if (this.listbanner.data[0].meta_data.category) {
          this.groupBy(this.listbanner.data, "category");
  
          console.log('=================================>===============')
          this.groupedProducts.push(this.result)
  
  
          Object.keys(this.result).forEach(e => this.jsonToBeUsed.push({ key: e, value: this.result[e] }))
          console.log(this.jsonToBeUsed)
          console.log('=================================>===============')
        }
  
  
        this.items = this.listbanner.data
        this.listbanner.data.forEach(element => {
          element.name = element.product_name
        });
        console.log(this.listbanner);
      })
    }
    // 
    




  }
  items
  setFilteredItems() {
    this.items = this.listbanner.data;
    this.items = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  showProductInfo(item) {
    debugger
    this.utils.productCatalogInfo = '';

    this.utils.productCatalogInfo = item;
    this.router.navigateByUrl('/verifyit-product-catalog-info')
  }


  values = []
  result = []

  groupBy(collection, property) {
    debugger
    // var i = 0, val, index

    // for (; i < collection.length; i++) {
    //     val = collection[i].meta_data.category;
    //     index = this.values.indexOf(val);
    //     if (index > -1)
    //         this.result[index].push(collection[i]);
    //     else {
    //         this.values.push(val);
    //         this.result.push([collection[i]]);
    //     }
    // }


    collection.reduce((acc, d) => {
      if (Object.keys(acc).includes(d.meta_data.category)) return acc;

      acc[d.meta_data.category] = collection.filter(g => g.meta_data.category === d.meta_data.category);

      return this.result = acc;
      // this.result.push(acc);
    }, {

      })

  }
  listGroupedProduct = []
  showProductFromGroup(value) {
    this.listGroupedProduct = value
  }

}
