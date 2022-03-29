import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
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
import { Plugins } from "@capacitor/core";
import { LoginService } from 'src/app/common-services/login.service';
import { QuizModalComponent } from "../../modals/quiz-modal/quiz-modal.component";
import { ScratchmodalComponent } from '../../modals/scratchmodal/scratchmodal.component';


const { Share } = Plugins;
@Component({
  selector: 'app-verifyitproductcatalog',
  templateUrl: './verifyitproductcatalog.html',
  styleUrls: ['./verifyitproductcatalog.scss'],
})


export class VerifyitProductCatalogPage {



  constructor(private nailaservice: NailaService, private utils: Utils, private router: Router, private route: ActivatedRoute,
    private loginService: LoginService, private utilservice: Utils, private apiSvc: NailaService, private modalController: ModalController
  ) {

  }
  searchTerm
  subscription1
  subscription2
  listbanner: any;
  groupedProducts = [];
  jsonToBeUsed = []
  brandName: any;
  brand_name
  ngOnInit() {

    this.subscription1 = this.utilservice.LoadModal.subscribe((data) => {
      debugger

      this.brand_name= window.localStorage.getItem('brand')



      this.checkWinnerStatus();


    });

    this.subscription2 = this.utilservice.getQues.subscribe((data) => {
      debugger

      this.brand_name= window.localStorage.getItem('brand')


      this.getQuestions();


    });




    if (this.route.snapshot.queryParams['brand']) {
      let brand = this.route.snapshot.queryParams['brand'];
      this.brandName = brand
      this.nailaservice.listRelatedProductsfrombrand(brand).subscribe(data => {
        this.listbanner = data;
        this.brandName = this.listbanner.data[0].brand


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
    } else if (this.route.snapshot.queryParams['product_id']) {

      this.nailaservice.listRelatedProducts(this.route.snapshot.queryParams['product_id']).subscribe(data => {
        this.listbanner = data;
        this.brandName = this.listbanner.data[0]?.brand


        
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
    else {

      this.nailaservice.listRelatedProducts(this.utils.productId).subscribe(data => {
        this.listbanner = data;
        this.brandName = this.listbanner.data[0].brand


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


    // flow3 and rest flow


    switch (window.localStorage.getItem('scan_flow')) {
      case "0":

        break;
      case "1":
        this.flowOperation1("1")
        // code block
        break;
      case "2":
        this.flowOperation2("2")

      case "3":
        this.flowOperation3("3")

      case "4":
        this.flowOperation4("4")
          
      default:
      // code block
    }


















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

    let shareData = {
      user_id: localStorage.getItem("userid"),
      tag_id: localStorage.getItem("tagId"),
      product_id: this.utils.productId,
      // product_id: 10,
      device_id: localStorage.getItem("device_id"),
      otype: "PRODUCT_CATALOGPAGE_SHOW_CATALOG_CLICK",

    };
    this.nailaservice.reviewTracking(shareData).subscribe(
      (res: any) => {

        if (res) {

          this.utils.productCatalogInfo = '';

          this.utils.productCatalogInfo = item;

          this.utils.callgettagresult = item

          this.router.navigate(['/verifyit-product'], { queryParams: { reg: 'catalogpage' } })
        }
        this.utils.LoadPageOnrouteChange();
        // this.router.navigateByUrl('/verifyit-product-info')


      },
      //**charu end */
      err => {
        alert(JSON.stringify(err));
      }
    );
    this.utils.productCatalogInfo = '';

    this.utils.productCatalogInfo = item;

    this.utils.callgettagresult = item

    // this.utils.LoadPageOnrouteChange();
    // this.router.navigateByUrl('/verifyit-product-info')
    // this.router.navigateByUrl('/verifyit-product-catalog-info')


  }


  values = []
  result = []

  groupBy(collection, property) {

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
    debugger;
    // alert("hello");
    this.listGroupedProduct = value
  }


  catalog_link
  async socialShare() {
    // this.product_title = this.callgettagresult.product_name;
    // this.brand = this.brandName
    this.catalog_link =
      "https://pwa.nowverifyit.com?product_id=" +
      this.utils.productId

    let shareRet = await Share.share({
      text: "Hey, Checkout catalogue" + " from " + this.brandName,

      url: this.catalog_link
    });

  }


  flowOperation1(data) {
    debugger

    if (window.localStorage.getItem('name') && data == '1') {
      this.loginService.isProductInfo = true;
      this.utilservice.isProductInfo = true;
      window.localStorage.setItem("hasquizModal", "1");
      this.getQuestions()
    } else {
      // this.loginService.isProductInfo = true;
      this.utilservice.isProductInfo = true;


      this.router.navigateByUrl('/login')
    }

  }

  flowOperation2(data) {
    debugger

    if (!window.localStorage.getItem('name')){
      this.checkWinnerStatus2()

    } else {
      this.getQuestions()
    }
  }

  flowOperation3(data){
    debugger
    window.localStorage.setItem('user_upi','xxxxxxx')

    if (window.localStorage.getItem('name') && data == '3') {
      this.loginService.isProductInfo = true;
      this.utilservice.isProductInfo = true;
      window.localStorage.setItem("hasquizModal", "1");
      this.getQuestions()
    } else {
      // this.loginService.isProductInfo = true;
      // this.utilservice.isProductInfo = true;
      this.utilservice.newflow = true
      
      this.router.navigateByUrl('/login')
    }

  }

  flowOperation4(data){
    debugger
    if (!window.localStorage.getItem('name')){
      this.checkWinnerStatus2()

    } else {
      this.getQuestions()
    }
  }





  getQuestions() {
    debugger
    // this.subscription.unsubscribe();
    let data = {
      brand_id: window.localStorage.getItem('brand_id'),
      // brand_id: "38",
    };

    this.apiSvc.getQuestion(data).subscribe(
      (res: any) => {
        if (res.message == 'Success') {

          let loginInfo = window.localStorage.getItem('name')
          // new flow coding

          this.openQuiz("default");



        }


      },

      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }



  async openQuiz(type, data?) {
    window.localStorage.setItem("hasquizModal", "1");
    let datarequest = type == "video" ? data : "";
    const modal = await this.modalController.create({
      component: QuizModalComponent,
      cssClass: 'my-quiz-class_new',
      componentProps: {
        requestFrom: type,
        data: datarequest
      }
    });
    /** Charu  */

    /** Charu  */
    return await modal.present();

  }


  checkWinnerStatus() {
    let winnerData = {
      product_id: this.utils.callgettagresult.product_id,
      user_id: window.localStorage.getItem("userid"),
    };
    this.apiSvc.checkWinStatus(winnerData).subscribe(
      (res: any) => {

        if (res.data.win == 1 && !this.utilservice.source_token) {

          this.utilservice.cashbackAmount = res.data.price_money
          this.utilservice.winMessage = res.data.res_message
          this.utilservice.winLossAlgoData = res.data
          // this.subscription.unsubscribe();
          console.log(res);
          this.utilservice.usernotwon = true;
          this.utilservice.showConfetti();
          this.router.navigateByUrl('/surprise-modal')
        } else {
          this.utilservice.winMessage = res.data.res_message
          this.utilservice.winLossAlgoData = res.data
          this.utilservice.usernotwon = false;

          if (this.utilservice.winLossAlgoData) {

            this.router.navigateByUrl('/surprise-modal')
          }
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }


  checkWinnerStatus2(){
    let winnerData = {
      product_id: this.utils.callgettagresult.product_id,
      user_id: window.localStorage.getItem("userid"),
    };
    this.apiSvc.checkWinStatus(winnerData).subscribe(
      (res: any) => {

        if (res.data.win == 1 && !this.utilservice.source_token) {

          this.utilservice.cashbackAmount = res.data.price_money
          this.utilservice.winMessage = res.data.res_message
          this.utilservice.winLossAlgoData = res.data
          // this.subscription.unsubscribe();
          console.log(res);
          this.utilservice.usernotwon = true;
          // this.utilservice.showConfetti();
          // this.router.navigateByUrl('/surprise-modal')
          this.scratchModal()
        } else {
          this.utilservice.winMessage = res.data.res_message
          this.utilservice.winLossAlgoData = res.data
          this.utilservice.usernotwon = false;

          if (this.utilservice.winLossAlgoData) {

            this.router.navigateByUrl('/surprise-modal')
          }
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }



  async scratchModal() {
    // this.utils.royaltyData=data
    let modal = await this.modalController.create({
      component: ScratchmodalComponent,
      cssClass: "scratch-modal",
      backdropDismiss:false
    }
    );
    return await modal.present();
  }


}
