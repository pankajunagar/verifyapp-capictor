import { browser } from "protractor";
import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import { AlertController, Platform, ToastController } from "@ionic/angular";
import { NailaService } from "../../services/naila.service";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { Utils } from "../../services/utils.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from "@ionic-native/barcode-scanner/ngx";
import jsQR from "jsqr";
import { Plugins } from "@capacitor/core";
import {
  InAppBrowser,
  InAppBrowserOptions,
} from "@ionic-native/in-app-browser/ngx";
import { SettingsService } from "src/app/settings.service";
import { MessagingService } from "src/app/services/messaging.service";
const { Browser } = Plugins;

const Viewer = require('photo-sphere-viewer');

@Component({
  selector: "app-verifyitdashboard",
  templateUrl: "./verifyitdashboard.page.html",
  styleUrls: ["./verifyitdashboard.page.scss"],
})
export class VerifyitDashboardPage implements OnInit {
  @ViewChild("video") video: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;
  videoElement: any;
  scanActive = false;
  scanResult = null;

  cred = {
    tagId: null,
    verified: null,
    product_name: null,
    manufactured: null,
    model_number: null,
    serial_number: null,
    brand: null,
    img: { default: { main: null } },
    product_details: {
      water_resistant: null,
      display_type: null,
      series: null,
      occassion: null,
      strap: null,
    },
    how_to_use_it: { english: null, spanish: null, portugues: null },
  };
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
    key13: null,
  };
  canNFC = false;
  statusMessage: string;
  tag: any;
  decodedTagId: string;
  readedMsg: string;
  userType;
  generateTokenParams;
  readingTag: boolean = false;
  writingTag: boolean = false;
  isWriting: boolean = false;
  writtenInput = "";
  ndefMsg: any;
  scanData: {};
  triggerLocation
  options: BarcodeScannerOptions;
  subscriptions: Array<Subscription> = new Array<Subscription>();
  canvasElement: any;
  canvasContext: any;
  selectedTheme: any;
  constructor(
    private iab: InAppBrowser,
    private nfc: NFC,
    private diagnostic: Diagnostic,
    private ndef: Ndef,
    private platform: Platform,
    private route: ActivatedRoute,
    private loading: LoadingController,
    private toast: ToastController,
    private ngZone: NgZone,
    private qrScanner: QRScanner,
    private messagingService: MessagingService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private utilservice: Utils,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private alertService: AlertServiceService,
    private geolocation: Geolocation,
    private settings: SettingsService,
    private apiSvc: NailaService
  ) {

    this.route.queryParams.subscribe(params => {

      this.generateTokenParams = params
      console.log("=======================")
      console.log((params))
      console.log("=======================")

    });


    if (this.router.url.includes('?')) {

      this.hideDashboardScreen = false;
    }

    this.settings
      .getActiveTheme()
      .subscribe((val) => (this.selectedTheme = val));

    this.ionViewDidLoad();
    this.userType = window.localStorage.getItem("userType");
    // this.alertService.presentthis.alertService.presentAlert(''," user info data",window.localStorage.getItem('userType'));

  }

  toggleAppTheme() {
    if (this.selectedTheme === "dark-theme") {
      this.settings.setActiveTheme("light-theme");
    } else {
      this.settings.setActiveTheme("dark-theme");
    }
  }



  data = {
    lat: 0,
    long: 0,
    tagId: "",
    source_token: "",
  };
  source_token;
  hideDashboardScreen = true;

  url_parameter
  fcmData = {
    android_fcm: "",
    ios_fcm: "",
    js_fcm: "",
  };
  subscription2
  ngOnInit() {



    this.subscription2 = this.utilservice.showNotification.subscribe((data) => {
      this.hardwareDiagnostic()


    });

    this.hasToken()


  }
  async presentLoading(data) {
    const loading = await this.loading.create({
      message: data,
      // duration: 2000,
    });
    await loading.present();
  }

  open() {
    var url = "https://ionicframework.com/";
    const option: InAppBrowserOptions = {
      zoom: "no",
      hardwareback: "no",
      closebuttoncaption: "yes",
    };
    const browser = this.iab.create(url, "_self", option);

    browser.show();
  }

  //**Charu End */
  ionViewDidLoad() {
    this.userType = window.localStorage.getItem("userType");

    this.platform.ready().then(() => {
      this.nfc
        .enabled()
        .then((resolve) => {
          this.canNFC = true;
          // this.setStatus("NFC Compatable.");
          // this.tagListenerSuccess();
        })
        .catch((reject) => {
          this.canNFC = false;
          // this.alertService.presentAlert(
          //   "",
          //   JSON.stringify("NFC is not supported by your Device")
          // );
          // this.setStatus("NFC Not Compatable.");
        });
    });
  }
  res: any = {};
  tagListenerSuccess() {
    // this.geolocation
    //   .getCurrentPosition()
    //   .then((resp) => {
    //     this.data.lat = resp.coords.latitude;
    //     this.data.long = resp.coords.longitude;
    //   })
    //   .catch((error) => {
    //     console.log("Error getting location", error);
    //   });

    if (this.platform.is("ios")) {
      this.readAndWriteNFCIos();
    } else {
      this.subscriptions.push(
        this.nfc.addNdefListener().subscribe(
          (data) => {
            if (this.readingTag) {
              let payload = data.tag.ndefMessage[0].payload;
              let tagId = this.nfc.bytesToString(payload).substring(3);
              this.readingTag = false;
              // this.presentLoading('');
              this.getProductInfo(tagId);
            }
          },
          (err) => {
            // this.loading.dismiss();
            this.alertService.presentAlert("", "Something went wrong!");
          }
        )
      );
    }
  }

  async readAndWriteNFCIos() {
    // this.presentLoading('Place your NFC Tag on the top of your mobile phone.')

    try {
      let tag = await this.nfc.scanNdef({ keepSessionOpen: true });
      let payload = tag.ndefMessage[0].payload;
      let tagId = this.nfc.bytesToString(payload).substring(3);
      // you can read tag data here
      console.log(tagId);
      // this.loading.dismiss();
      this.nfc.cancelScan();
      this.getProductInfo(tagId);

      // this example writes a new message with a timestamp
      // var message = [
      //     this.ndef.textRecord(new String(new Date()))
      // ];

      // nfc.write(
      //     message,
      //     success => console.log('wrote data to tag'),
      //     error => console.log(error)
      // );
    } catch (err) {
      console.log(err);
    }
  }

  getProductInfo(tagId) {
    this.presentLoading("NFC Tag connected successfully.");
    // this.utilservice.storage=tagId;
    window.localStorage.setItem("tagId", tagId);
    this.apiSvc.callGetTag(tagId).subscribe((callgettagresult) => {



      this.utilservice.callgettagresult = callgettagresult;
      this.res = callgettagresult;
      // window.localStorage.setItem('brand_id',this.res.brand_id)
      // this.loading.dismiss();
      this.presentLoading("Processing data from NFC Tag.");

      this.cred.product_name = this.res.product_name;
      // this.alertService.presentAlert('',this.cred.product_name)
      this.cred.verified = this.res.verified;
      this.cred.tagId = tagId;
      this.data.tagId = tagId;

      this.apiSvc.callRecordScan(this.data).subscribe(
        (callrecordscanresult) => {
          this.utilservice.callrecordscanresult = callrecordscanresult;
          // this.loading.dismiss();
          this.router.navigateByUrl("/verifyit-product");
          //location
        },
        (err) => {
          // this.loading.dismiss();
          this.alertService.presentAlert("", "call record scan went wrong");
        }
      );

      this.cred.model_number = this.res.model_number;
      this.cred.serial_number = this.res.serial_number;
      this.cred.brand = this.res.brand;
      this.cred.img = this.res.img;
      this.cred.product_details = this.res.product_details;
      this.cred.how_to_use_it = this.res.how_to_use_it;
      this.cred.manufactured = this.res.manufactured;
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

      // this.helperSvc.hideLoading();
    });
  }

  setStatus(message) {
    this.alertService.presentAlert("", message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  readTag() {
    if (this.canNFC && this.platform.is("android")) {
      setTimeout(() => {
        this.alertService.presentAlert(
          "",
          "Please place your mobile near NFC tag."
        );
        this.readingTag = true;
        this.tagListenerSuccess();
      }, 100);
    } else if (this.platform.is("ios")) {
      this.tagListenerSuccess();
    } else {
      this.alertService.presentAlert("", "NFC is not supported by your Device");
    }
  }


  ionViewWillLeave() {
    this.hideDashboardScreen = true;

    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  stopScan() {
    this.scanActive = false;
    const stream = this.videoElement.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });

    this.videoElement.srcObject = null;
  }

  tagId;
  productData;
  scan() {
    this.platform.ready().then(() => {
      if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
        this.scanActive = true;
        this.canvasElement.height = this.videoElement.videoHeight;
        this.canvasElement.width = this.videoElement.videoWidth;

        this.canvasContext.drawImage(
          this.videoElement,
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );
        const imageData = this.canvasContext.getImageData(
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );

        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        console.log(code);
        //     // logic for existing and new qr code

        this.tagId = code;

        if (this.tagId) {
          let tagId = this.tagId.data;
          console.log(tagId);
          tagId.replace(/\s+/g, "");
          if (tagId.includes("params")) {
            tagId = tagId.split("=")[1].split("&")[0];

            this.gettag(tagId);
            this.stopScan();
          } else {
            this.gettag(tagId);
            this.stopScan();
          }
          this.tagId = JSON.parse(tagId);

          this.productData = this.strToObj(tagId);
        }

        if (code) {
          this.scanActive = false;
        } else {
          if (this.scanActive) {
            requestAnimationFrame(this.scan.bind(this));
          }
        }
      } else {
        requestAnimationFrame(this.scan.bind(this));
      }
    });
  }
  async scanqrcode() {

    if (this.platform.is("android")) { }



    let locationUrl = window.location.href;

    if (locationUrl.includes("pwa") || locationUrl.includes("nowverifycap")) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      this.videoElement.srcObject = stream;
      this.videoElement.setAttribute("playsinline", true);
      this.videoElement.play();
      requestAnimationFrame(this.scan.bind(this));
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      this.videoElement.srcObject = stream;
      this.videoElement.setAttribute("playsinline", true);
      this.videoElement.play();
      requestAnimationFrame(this.scan.bind(this));

    }

  }
  bdata
  async gettag(tagId) {
    
    window.localStorage.setItem("tagId", tagId);
    let locationUrl = window.location.href;

    this.apiSvc.callGetTag(tagId).subscribe((callgettagresult) => {
      debugger
      this.utilservice.callgettagresult = callgettagresult;
      window.localStorage.setItem('scan_flow', this.utilservice.callgettagresult.scan_flow)
      window.localStorage.setItem('brand', this.utilservice.callgettagresult.brand)
      this.res = callgettagresult;


      

      this.apiSvc.getBrandDetail(this.res.product_id).subscribe((data) => {

        this.bdata = data
        // window.localStorage.setItem('brand_id','0')
        this.utilservice.brand_id = this.bdata.data.id
        console.log('======================dasboard brand==================')
        console.log('======================dasboard brand==================')

        console.log('======================dasboard brand==================')

        console.log(this.bdata.data.id)
        console.log(this.bdata.data)


        console.log('======================dasboard brand==================')

        console.log('======================dasboard brand==================')

        console.log('======================dasboard brand==================')

        window.localStorage.setItem('brand_id', this.bdata.data.id)

       

        if (this.hasBparams) {
// this.loading.dismiss()
          this.router.navigate(["/verifyit-product-catalog"], {
            queryParams: { product_id: window.localStorage.getItem('product_id') },
          });
        } else {
          // this.loading.dismiss()

          this.router.navigateByUrl("/verifyit-product");

        }



      })

      this.cred.product_name = this.res.product_name;
      // this.alertService.presentAlert('',this.cred.product_name)
      this.cred.verified = this.res.verified;
      this.cred.tagId = tagId;
      this.data.tagId = tagId;

      this.cred.model_number = this.res.model_number;
      this.cred.serial_number = this.res.serial_number;
      this.cred.brand = this.res.brand;
      this.cred.img = this.res.img;
      this.cred.product_details = this.res.product_details;
      this.cred.how_to_use_it = this.res.how_to_use_it;
      this.cred.manufactured = this.res.manufactured;
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

    });

  }

  strToObj(str) {
    var obj = {};
    if (str && typeof str === "string") {
      var objStr = str.match(/\{(.)+\}/g);
      eval("obj =" + objStr);
    }
    //
    return obj;
    this.router.navigateByUrl("/verifyit-product");
  }



  scanIOS() {
    this.options = {
      prompt: "Scan your barcode",
    };
    this.barcodeScanner.scan(this.options).then(
      (barcodeData) => {
        console.log(barcodeData);

        // logic for existing and new qr code

        this.tagId = barcodeData.text.toString();

        if (this.tagId.includes("myparam")) {
          this.tagId = this.tagId.split("=")[1];
          alert(this.tagId);
          this.gettag(this.tagId);
        } else {
          this.gettag(this.tagId);
        }
        this.tagId = JSON.parse(this.tagId);

        this.productData = this.strToObj(this.tagId);

        // let variabletype = typeof (this.tagId)
        // if (variabletype == "number") {
        //
        //   // alert('number')
        //   this.gettag(this.tagId);

        // } else {
        //
        //   this.gettag(this.productData.tagId);

        // alert('string')
        // }
      },
      (err) => {
        console.log("Error occured : " + err);
      }
    );
  }

  async presentToast(data) {
    const toast = await this.toast.create({
      message: data,
      duration: 3000,
    });
    toast.present();
  }



  async generateToken(fcmData) {
    let token = window.localStorage.getItem("token");
    if (!token.length) {
      await this.apiSvc.genToken(fcmData, this.generateTokenParams.params).subscribe(
        (data: any) => {
          window.localStorage.setItem("token", data.data.token);

          // this.showProductPage();
          // this.hardwareDiagnostic()



          this.callRecordScan()


        },
        async (err) => {
          
          this.alertService.presentAlert("", "Something went wrong.");
        }
      );
    } else {
      this.callRecordScan()
    }
  }





  showProductPage() {
    // this.presentLoading('')
    this.route.queryParams.subscribe(params => {


      this.url_parameter = params
      console.log("=======================")
      console.log((params))
      console.log("=======================")

      // if (params) {
      //   let queryParams = JSON.parse(params);
      //   console.log(queryParams)
      // }
    });

    debugger
    // window.localStorage.setItem('product-link',this.router.url)
    if (
      (this.router.url.includes("params") || this.router.url.includes("bparams")) &&
      !this.router.url.includes("source")
    ) {
      this.hideDashboardScreen = false;


      if (this.router.url.includes("bparams")) {
        window.localStorage.setItem('params', this.url_parameter.bparams)
        this.gettag(this.url_parameter.bparams);
      } else {

        window.localStorage.setItem('params', this.url_parameter.params)
        this.gettag(this.url_parameter.params);
      }


    } else if (
      this.router.url.includes("brand") &&
      !this.router.url.includes("source")
    ) {
      this.hideDashboardScreen = false;
      let brand = this.url_parameter.brand;
      window.localStorage.setItem('params', this.url_parameter.params)
      this.router.navigate(["/verifyit-product-catalog"], {
        queryParams: { brand: brand },
      });



      this.gettag('5000')

    } else if (this.router.url.includes("ext-loading")) {
      this.hideDashboardScreen = false;
      this.utilservice.notification_id = this.url_parameter.not_id;
      this.router.navigateByUrl('/ext-loading')
    }
    else if (this.router.url.includes("product_id")) {
      this.hideDashboardScreen = false;
      let product_id = this.router.url.split("=")[1];
      this.router.navigate(["/verifyit-product-catalog"], {
        queryParams: { product_id: product_id },
      });
    }
    else if (
      this.router.url.includes("params") &&
      this.router.url.includes("source")
    ) {
      this.hideDashboardScreen = false;
      this.source_token = this.url_parameter.source;
      window.localStorage.setItem('params', this.url_parameter.params)
      window.localStorage.setItem("source_token", this.source_token);
      this.data.source_token = this.source_token;
      this.utilservice.source_token = this.source_token
      this.gettag(this.url_parameter.params);
      // this.router.navigateByUrl('/verifyit-product')
    }
    // this.gettag('4516') 4925
    //  for multiple image ,scrach card 4516
    // for vedio link      4573
    //for customer review  4517
    // 4534 for reward
    //4507  //for scratchcard
    // 5013 first care product
    // this.gettag('5020')




    // ask for location

    // const alert = await this.alertCtrl.create({
    //   header: "Error",
    //   message: 'err',
    //   buttons: ["OK"],
    // });

    // await alert.present();
    // }


    // this.askLocation()














    this.utilservice.LoadPage.subscribe((data) => {
      //
      // this.alertService.presentAlert('',this.utilservice.userType)
      // this.ionViewWillEnter();
      if (this.utilservice.menuTitle == "Write NFC/QR") {
        this.userType = 2;
      } else if (this.utilservice.menuTitle == "Read NFC/QR") {
        this.userType = 1;
      }
    });






  }

  // hardwareDiagnostic(){
  //   
  // //   let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); }
  // // let errorCallback = (e) => console.error(e);



  // this.diagnostic.getLocationAuthorizationStatus()
  //   .then((state) => {
  //     alert(state)


  //     this.showLocationAlert()
  //     if (this.diagnostic.isLocationAuthorized){
  //       // alert()
  //       // do something
  //     } else {
  //       // do something else
  //       this.showLocationAlert()
  //     }
  //   }).catch(e => console.error(e));
  // }





  hardwareDiagnostic() {

    let a = window.localStorage.getItem('notification_enabled')
    if (this.router.url.includes('?')) {

      this.hideDashboardScreen = false;
    }

    if (window.localStorage.getItem('locationenabled') == '0' || window.localStorage.getItem('locationenabled') == undefined) {

      this.showLocationAlert()
    } else if (window.localStorage.getItem('locationenabled') == '1') {
      if (a == '1') {
        this.presentLoading('')

        this.showProductPage();
      } else {

        this.showNotificationAlert()
      }
    }

  }



  async showLocationAlert() {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      // header: 'Confirm!',
      message: 'Increase your chances of winning the lucky prize by sharing location.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            window.localStorage.setItem('locationenabled', '0')
            console.log('Confirm Cancel: blah');
            // this.showProductPage();


            let notification_enabled = window.localStorage.getItem("notification_enabled");
            if (notification_enabled == '0' || notification_enabled == undefined) {

              this.showNotificationAlert()
              
            } else {
              this.showProductPage()
            }



          }
        }, {
          text: 'Yes',
          handler: () => {

            this.askLocation()
          }
        }
      ]
    });
    await alert.present();
  }








  msg
  trackingData = {
    user_id: "",
    tag_id: "",
    product_id: "",
    device_id: "",
    otype: "",
    js_fcm: this.fcmData.js_fcm,
    // lat :this.data.lat,
    // long: this.data.long,
    meta_data: {
      mobile_number: "",
      lat: this.data.lat,
      long: this.data.long,
      js_fcm: this.fcmData.js_fcm
    },
  };
  askLocation() {
    

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          this.data.lat = resp.coords.latitude;
          this.data.long = resp.coords.longitude;
          console.log("==================================>")
          console.log("==================================>")

          this.trackingData.meta_data.lat = resp.coords.latitude;
          this.trackingData.meta_data.long = resp.coords.longitude;
          console.log(this.data.long)
          console.log(this.data.lat)

          console.log("==================================>")
          console.log("==================================>")

          
          window.localStorage.setItem('locationenabled', '1')
          this.showNotificationAlert()

          this.trackingevents('LOCATION_DATA')
        })

        .catch((error) => {
          
          // this.loading.dismiss();
          window.localStorage.setItem('locationenabled', '1')

          // this.showProductPage();
          this.showNotificationAlert()
          this.trackingevents('LOCATION_DATA')
          console.log("Error getting location", error);
        });


    });
  }



  trackingevents(otype) {
    // debugger
    // if (otype == 'NOTIFICATION_DATA') {
    //   this.presentLoading('')
    // }
    // debugger

    const _this = this;

    // this.trackingLinks(data)
    _this.trackingData.user_id = window.localStorage.getItem("userid");
    _this.trackingData.tag_id = window.localStorage.getItem("tagId");
    // _this.trackingData.product_id = this.utilservice.callgettagresult.product_id;
    (_this.trackingData.device_id = window.localStorage.getItem("device_id")),
      // _this.trackingData.mobile_number = this.mobile_number
      (_this.trackingData.otype = otype);

    _this.trackingData.meta_data.mobile_number = '';
    _this.trackingData.meta_data.js_fcm = this.fcmData.js_fcm
    
    this.apiSvc.reviewTracking(_this.trackingData).subscribe(
      //**charu Start */
      (res: any) => {
        if (res && otype == 'NOTIFICATION_DATA') {


          this.showProductPage();
          this.msg = `Congratualtions! You have been awarded Loaylty Point from the Brand ${res.data.brand} `;
          // this.loading.dismiss()
          // this.msg = `Congratualtions! You have been awarded ${res.data.loyalty} Loaylty Point from the Brand ${res.data.brand} `;
          // this.presentToast(this.msg);
          // this.openInappBrowser(data);
        } else {
          let notification_enabled = window.localStorage.getItem("notification_enabled");
          if (notification_enabled == '0' || notification_enabled == undefined) {
            // this.loading.dismiss()
            // this.showNotificationAlert()
          } else {
            // this.loading.dismiss()
            this.showProductPage();

          }

        }
      },
      //**charu Start */
      (err) => {
        // this.showProductPage();
        // this.loading.dismiss()
        // this.loading.dismiss()
        // this.loading.dismiss()

        alert(JSON.stringify(err));
      }
    );

  }







  hasToken() {
    let token = window.localStorage.getItem("token");
    this.generateToken(this.fcmData);
    // if (!token.length) {


    // }else{
    //   // this.hardwareDiagnostic()
    //   this.generateToken(this.fcmData);


    // }
  }

  hasBparams = false;
  // productData
  callRecordScan() {
    let locationUrl = window.location.href;
    this.route.queryParams.subscribe(params => {

      if (params.params) {

        this.url_parameter = params.params
        this.hasBparams = false
      } else {
        this.url_parameter = params.bparams
        this.hasBparams = true


      }
      this.data.tagId = this.url_parameter
      console.log("=======================")
      console.log((params))
      console.log("=======================")

      // if (params) {
      //   let queryParams = JSON.parse(params);
      //   console.log(queryParams)
      // }
    });
    this.apiSvc.callRecordScan(this.data).subscribe(
      (callrecordscanresult) => {
        window.localStorage.setItem('hasquizModal', '0')
        this.presentToast(["QR code scan successfully."]);

        this.hardwareDiagnostic()
        this.productData = callrecordscanresult

        console.log(callrecordscanresult);
        debugger
        window.localStorage.setItem('product_id', this.productData.data.meta_data.product_id)
        this.utilservice.callrecordscanresult = callrecordscanresult;
        // this.loading.dismiss();

        // this.router.navigateByUrl("/verifyit-product");
        //location
      },
      (err) => {
        // this.loading.dismiss();
        this.presentToast(["QR code scan went wrong.."]);

        // this.alertService.presentAlert("", "call record scan went wrong");
      }
    );
  }



  async showNotificationAlert() {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      // header: 'Confirm!',
      message: 'Increase your chances of winning the lucky prize by allowing notification.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            window.localStorage.setItem('notification_enabled', '0')
            console.log('Confirm Cancel: blah');
            // window.localStorage.setItem('locationenabled','0')

            this.showProductPage();
            // this.firebasePermission()
          }
        }, {
          text: 'Yes',
          handler: () => {

            // this.askLocation()
            window.localStorage.setItem('notification_enabled', '1')

            this.firebasePermission()
          }
        }
      ]
    });
    await alert.present();
  }



  firebasePermission() {
    
    // window.localStorage.setItem('notification_enabled','0')


    // let token = window.localStorage.getItem("token");






    this.messagingService.requestPermission().subscribe(
      async (token) => {
        this.fcmData.js_fcm = token;
        // this.generateToken(this.fcmData);
        window.localStorage.setItem('notification_enabled', '1')
        // this.loading.dismiss()
       
          this.presentLoading('')
        
        this.trackingevents('NOTIFICATION_DATA');

      },
      async (err) => {

        // this.generateToken(this.fcmData);
        // this.loading.dismiss()
        this.presentLoading('')

        this.trackingevents('NOTIFICATION_DATA')



      }
    );



  }
  ionViewDidLeave() {
    // this.navCtrl.pop();
    this.loading.dismiss()
  }

}
