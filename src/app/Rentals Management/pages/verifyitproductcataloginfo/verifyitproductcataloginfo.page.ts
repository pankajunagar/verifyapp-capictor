import { Component, OnInit, NgZone } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import {
  Platform,
  ModalController,
  ActionSheetController,
  LoadingController
} from "@ionic/angular";
import { NailaService } from "../../services/naila.service";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { Utils } from "../../services/utils.service";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { Router } from "@angular/router";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { AlertController } from "@ionic/angular";
import { TellUsifyouBuyitComponent } from "../../modals/tellusifyoubuyit/tellusifyoubuyit.component";
import { CertificateModalComponent } from "../../modals/certificatemodal/certificatemodal.component";
import {
  StreamingMedia,
  StreamingVideoOptions
} from "@ionic-native/streaming-media/ngx";
import {
  BarcodeScanner,
  BarcodeScannerOptions
} from "@ionic-native/barcode-scanner/ngx";
import {
  InAppBrowser,
  InAppBrowserOptions,
  InAppBrowserEvent
} from "@ionic-native/in-app-browser/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: "app-verifyitproductcataloginfo",
  templateUrl: "./verifyitproductcataloginfo.page.html",
  styleUrls: ["./verifyitproductcataloginfo.page.scss"]
})
export class VerifyitProductCatalogInfoPage {
  cred = {
    tagId: null,
    verified: null,
    product_name: null,
    manufactured: null,
    model_number: null,
    serial_number: null,
    brand: null,

    img: {
      default: {
        main: null
      }
    },
    product_details: {
      water_resistant: null,
      display_type: null,
      series: null,
      occassion: null,
      strap: null
    },
    how_to_use_it: { english: null, spanish: null, portugues: null }
  };
  trackingData = {
    user_id: '',
    tag_id: '',
    product_id: '',
    device_id: '',
    otype: '',
    meta_data: {
      mobile_number: ''
    }
  }
  credKeys = {
    key12: null,
    key1: null,
    key2: null,
    key3: null,
    key4: null,
    key5: null,
    key6: null,
    key7: null,
    key8: null,
    key9: null,
    key10: null,
    key11: null,
    key13: null
  };

  brand_color: any;
  browser

  canNFC = false;
  statusMessage: string;
  tag: any;
  decodedTagId: string;
  readedMsg: string;
  jsonToBeUsed = [];
  // trying
  callgettagresult = {
    product_name: "",
    brand: "",
    product_id: '',
    model_number:'',
    manufactured:''
  };

  readingTag: boolean = false;
  writingTag: boolean = false;
  isWriting: boolean = false;
  writtenInput = "";
  ndefMsg: any;
  hasLogin;
  subscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private platform: Platform,
    private iab: InAppBrowser,
    private ngZone: NgZone,
    private socialSharing: SocialSharing,
    private qrScanner: QRScanner,
    private utilservice: Utils,
    private alertService: AlertServiceService,
    private router: Router,
    public alertController: AlertController,
    private apiSvc: NailaService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {
    this.hasLogin = window.localStorage.getItem("name");
    // alert('=================='+this.hasLogin)
    // this.ionViewDidLoad()
    this.callgettagresult = this.utilservice.productCatalogInfo;

    // this.callgettagresult  =  JSON.parse(this.callgettagresult)
    console.log(this.callgettagresult);

    if (this.utilservice.callgettagresult.meta_data) {
      // this.callgettagresult= this.callgettagresult
      Object.keys(this.utilservice.callgettagresult.meta_data).forEach(e =>
        this.jsonToBeUsed.push({
          key: e,
          value: this.utilservice.callgettagresult.meta_data[e]
        })
      );
    } else {
    }

    //   for (var type in this.callgettagresult) {
    //    let item = {
    //     key: '',
    //     value: ''
    //    };
    //     item.key = type;
    //     item.value = this.callgettagresult[type];
    //     this.jsonToBeUsed.push(item);
    // }
    console.log(this.jsonToBeUsed);
    this.credKeys.key1 = "Product Name";
    this.credKeys.key2 = "Model Number";
    this.credKeys.key3 = "Serial Number";
    this.credKeys.key4 = "Brand";

    this.credKeys.key5 = "Water Resistant";
    this.credKeys.key6 = "Display Type";
    this.credKeys.key7 = "Series";
    this.credKeys.key8 = "Occassion";
    this.credKeys.key9 = "Strap";
    this.credKeys.key10 = "Manufactured";
    this.credKeys.key11 = "Instructions";
    this.credKeys.key12 = "Wine Information";
    this.credKeys.key13 = "Verified";

    this.jsonToBeUsed.forEach(element => {
      if (element.key == "brand_color") {
        this.brand_color = element.value;
      }
    });
  }

  // ionViewDidLoad() {
  //   debugger

  //   this.platform.ready().then(() => {
  //     this.nfc.enabled().then((resolve) => {
  //       this.canNFC = true;
  //       this.setStatus('NFC Compatable.');
  //       this.tagListenerSuccess();
  //     }).catch((reject) => {
  //       this.canNFC = false;
  //       this.alertService.presentAlert('',JSON.stringify("NFC is not supported by your Device"));
  //       this.setStatus('NFC Not Compatable.');
  //     });

  //   });
  // }
  res: any = {};
  // tagListenerSuccess() {
  //   this.subscriptions.push(this.nfc.addNdefListener()
  //     .subscribe(data => {
  //       if (this.readingTag) {
  //         let payload = data.tag.ndefMessage[0].payload;
  //         let tagId = this.nfc.bytesToString(payload).substring(3);
  //         this.readingTag = false;
  //         this.apiSvc.callGetTag(tagId).subscribe((res) => {
  //           this.res = res
  //           this.cred.product_name = this.res.product_name;
  //           this.alertService.presentAlert('',this.cred.product_name)
  //           this.cred.verified = this.res.verified;
  //           this.cred.tagId = tagId;
  //           // this.apiSvc.callRecordScan(tagId).subscribe((res) => {
  //           // });
  //           this.cred.model_number = this.res.model_number;
  //           this.cred.serial_number = this.res.serial_number;
  //           this.cred.brand = this.res.brand;
  //           this.cred.img = this.res.img;
  //           this.cred.product_details = this.res.product_details;
  //           this.cred.how_to_use_it = this.res.how_to_use_it;
  //           this.cred.manufactured = this.res.manufactured;
  //           this.credKeys.key1 = "Product Name";
  //           this.credKeys.key2 = "Model Number";
  //           this.credKeys.key3 = "Serial Number";
  //           this.credKeys.key4 = "Brand";
  //           this.credKeys.key5 = "Water Resistant";
  //           this.credKeys.key6 = "Display Type";
  //           this.credKeys.key7 = "Series";
  //           this.credKeys.key8 = "Occassion";
  //           this.credKeys.key9 = "Strap";
  //           this.credKeys.key10 = "Manufactured";
  //           this.credKeys.key11 = "Instructions";
  //           this.credKeys.key12 = "Wine Information";
  //           this.credKeys.key13 = "Verified";
  //           // this.helperSvc.hideLoading();
  //         });
  //       }
  //     },
  //       err => {

  //       })
  //   );
  // }

  setStatus(message) {
    this.alertService.presentAlert("", message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  async presentAlertBoughtIt() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      inputs: [
        {
          name: "Mobile",
          type: "tel",
          min: -5,
          max: 10
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Ok",
          handler: alertData => {
            //takes the data
            console.log(alertData.Mobile);
          }
        }
      ]
    });
    await alert.present();
  }

  showCatalog(id) {
    this.utilservice.productId = id;
    this.router.navigateByUrl("/verifyit-product-catalog");
  }
  // readTag() {
  //   if (this.canNFC) {
  //     setTimeout(() => {
  //       this.alertService.presentAlert('','Connecting with Server.....');
  //       this.readingTag = true;
  //       this.tagListenerSuccess();
  //     }, 100);

  //   } else {
  //     this.alertService.presentAlert('','NFC is not supported by your Device');
  //   }
  // }

  // boughtIt(tagId){
  //       this.apiSvc.callPostBoughtIt(tagId).subscribe((res) => {
  //         this.alertService.presentAlert('',res);
  //         // this.helperSvc.hideLoading();
  //   });
  //   // this.navCtrl.push(ThankyouPage,{})
  //   this.alertService.presentAlert('','thank you')

  // }

  ionViewWillLeave() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  // scanqrcode() {
  //   var context = this;
  //   // Optionally request the permission early
  //   this.qrScanner.prepare()
  //     .then((status: QRScannerStatus) => {

  //       if (status.authorized) {
  //         // camera permission was granted
  //         this.alertService.presentAlert('',"scanning");
  //         var ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
  //         // start scanning
  //         let scanSub = this.qrScanner.scan().subscribe((scannedAddress: string) => {
  //           this.alertService.presentAlert('',scannedAddress);
  //           // this.friendAddress = scannedAddress;
  //           this.qrScanner.hide(); // hide camera preview
  //           scanSub.unsubscribe(); // stop scanning
  //           ionApp.style.display = "block";
  //           // this.friendAddressInput.setFocus();
  //         });

  //         // show camera preview
  //         ionApp.style.display = "none";
  //         context.qrScanner.show();
  //         // setTimeout(() => {
  //         //   ionApp.style.display = "block";
  //         //   scanSub.unsubscribe(); // stop scanning
  //         //   // context.friendAddressInput.setFocus();
  //         //   context.qrScanner.hide();
  //         // }, 500000);
  //         // wait for user to scan something, then the observable callback will be called

  //       } else if (status.denied) {
  //         this.alertService.presentAlert('',"Denied permission to access camera");
  //       } else {
  //         this.alertService.presentAlert('',"Something else is happening with the camera");
  //       }
  //     })
  //     .catch((e: any) => console.log('Error is', e));

  // }
  async boughtIt(tagId) {
    this.apiSvc.callPostBoughtIt(tagId).subscribe(res => {
      console.log(res);
      this.alertService.presentAlert(
        "",
        "Thank you so much for letting us know about your purchase. We wish you a great buying experience."
      );
      this.router.navigateByUrl("/");
      // this.helperSvc.hideLoading();
    });
    // this.navCtrl.push(ThankyouPage,{})
  }
  showCertificates(data) {
    this.utilservice.certificateData = data;
    // alert(JSON.stringify(data))
    this.presentModal();
    debugger;
  }

  async presentModal() {
    let modal = await this.modalController.create({
      component: CertificateModalComponent
    });
    return await modal.present();
  }

  options: InAppBrowserOptions = {
    hidden: 'no', //Or  'yes'
    // clearcache : 'yes',
    // clearsessioncache : 'yes',
    // zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    // toolbar : 'yes', //iOS only 
    // enableViewportScale : 'yes', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    // disallowoverscroll : 'no', //iOS only 
    presentationstyle: 'fullscreen',//iOS only 
    fullscreen: 'no',//Windows only    
    hideurlbar: 'yes',
    toolbar: 'yes',
    location: 'no',
    hidenavigationbuttons: 'yes',
    zoom: 'no'
  };

  routemessage;

  mobile_number
  async trackingLinks(data) {
    let alert = await this.alertController.create({
      subHeader: `Enter your Paytm number for cash back
      Your cash back will credit in 2-5 working days after approval of review.`,
      inputs: [
        {
          name: 'mobile_number',
          type: 'number'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Submit',
          handler: (alertData) => { //takes the data 
            console.log(alertData.mobile_number);
            this.mobile_number = alertData.mobile_number
            // data.push('mobile_number')
            this.trackingReview(data)
          }
        }
      ]
    });
    await alert.present();
  }



  async presentActionSheet(data) {
    let buttons = [];
    const _this = this;

    data.value.forEach(element => {
      let button = {
        text: element.text,
        // icon:data.icon,
        handler: () => {
          // console.log('setting icon ' + this.data.icon);
          // const browser = this.iab.create(element.link);
if(this.callgettagresult.brand=='RRC'&& data.key=='review'){

  this.trackingLinks(element)
}else{
  this.openInappBrowser(element)
}

        }
      };
      buttons.push(button);
    });

    const actionSheet = await this.actionSheetController.create({
      header: "Useful Links",
      cssClass: "my-custom-class",

      buttons: buttons
    });

    await actionSheet.present();
  }

  thankyouRedirect() {
    this.browser.close();
    this.router.navigateByUrl("/verifyit-message");

  }


  openInappBrowser(element) {
    const _this = this
    this.browser = this.iab.create(element.link, "_blank", this.options);

    this.browser.on("loadstart").subscribe((event: InAppBrowserEvent) => {

      setInterval(function () {

        if (event.url.includes("thankyou")) {


          //   setInterval(function(){ 
          //     //this code runs every second 
          // }, 1000);
          // await this.ngZone.run(() => this.navigateTomsgPage());
          // alert('purchaseproductreview')
          // this.router.navigateByUrl("/verifyit-message");
          // this.routemessage='purchaseproductreview'
          try {

            _this.routemessage = "thankyou"
            _this.browser.close();
          } catch (error) {
            alert(error)
          }
        }
      }, 2000);

    });
    this.browser.on("exit").subscribe(

      async data => {
        debugger

        if (_this.routemessage == 'thankyou') {
          _this.trackingData.user_id = window.localStorage.getItem('userid')
          _this.trackingData.tag_id = window.localStorage.getItem('tagId');
          _this.trackingData.product_id = this.callgettagresult.product_id;
          _this.trackingData.device_id = "xxx"

          this.apiSvc.reviewTracking(_this.trackingData).subscribe((res) => {

          }, err => {
            alert(JSON.stringify(err))
          }
          );


          // _this.router.navigateByUrl('/verifyit-message')

        } else {

          // _this.router.navigateByUrl('/verifyit-account')
          // alert('Review not submitted.')
        }

        // this.router.navigateByUrl("/verifyit-message");



      },

      err => {
        // alert(err);
      }
    );

    return true;

  }


  trackingReview(data) {
    const _this = this
    if (this.callgettagresult.brand == 'RRC') {
      // this.trackingLinks(data)
      _this.trackingData.user_id = window.localStorage.getItem('userid')
      _this.trackingData.tag_id = window.localStorage.getItem('tagId');
      _this.trackingData.product_id = this.callgettagresult.product_id;
      _this.trackingData.device_id = "xxx"
      // _this.trackingData.mobile_number = this.mobile_number
      _this.trackingData.otype = 'REVIEW_LINK_CLICK'

      _this.trackingData.meta_data.mobile_number = this.mobile_number

      this.apiSvc.reviewTracking(_this.trackingData).subscribe((res) => {

        this.openInappBrowser(data)


      }, err => {
        alert(JSON.stringify(err))
      }
      );
    }
  }

  // createButtons(data) {
  //   let buttons = [];
  //   for (var index in data) {
  //     let button = {
  //       text: data.text,
  //       // icon:data.icon,
  //       handler: () => {
  //         // console.log('setting icon ' + this.data.icon);
  //         return true;
  //       }
  //     }
  //     buttons.push(button);
  //   }
  //   return buttons;
  // }

  async presentModal2() {
    let modal = await this.modalController.create({
      component: TellUsifyouBuyitComponent
    });
    return await modal.present();
  }
  product_title = this.callgettagresult.product_name;
  brand = this.callgettagresult.brand;
  product_link = "";

  socialShare() {



    // let options: StreamingVideoOptions = {
    //   successCallback: () => { console.log('=======================>Video played==================>') },
    //   errorCallback: (e) => { console.log('Error streaming') },
    //   orientation: 'portrait',
    //   shouldAutoClose: true,
    //   controls: false
    // };
    // this.streamingMedia.playVideo('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', options);

    // console.log('kkkkkkk=================',this.brand_color)
    this.jsonToBeUsed.forEach(element => {
      if (element.key == "purchase online") {
        console.log(element);
        this.product_link = element.value[0].link;
      }
    });
    this.product_title = this.callgettagresult.product_name;
    this.brand = this.callgettagresult.brand;
    // this.product_link= this.product_link;

    this.socialSharing
      .share(
        "Hey, Checkout" +
        " " +
        this.product_title +
        " from " +
        this.brand +
        "." +
        "\n",
        "",
        "",
        this.product_link
      )
      .then(() => {
        console.log(
          "===============shared================== to whatsapp========"
        );
      })
      .catch(() => {
        console.log(
          "===============shared===========not======= to whatsapp========"
        );
      });
  }
  async navigateTomsgPage() {
    this.router.navigateByUrl('/verifyit-message')
  }

}




