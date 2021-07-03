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
import { Router } from "@angular/router";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { LoadingController } from "@ionic/angular";
// import { LoadingController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation/ngx";

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


// import { Viewer } from 'photo-sphere-viewer'
// import { Viewer } from 'photo-sphere-viewer';

const Viewer = require('photo-sphere-viewer');
// declare var Viewer: any;

// import {PhotoSphereViewer} from 'photo-sphere-viewer/dist/photo-sphere-viewer';

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
  // trying
  readingTag: boolean = false;
  writingTag: boolean = false;
  isWriting: boolean = false;
  writtenInput = "";
  ndefMsg: any;
  scanData: {};
  options: BarcodeScannerOptions;
  subscriptions: Array<Subscription> = new Array<Subscription>();
  canvasElement: any;
  canvasContext: any;
  selectedTheme: any;
  constructor(
    private iab: InAppBrowser,
    private nfc: NFC,
    private ndef: Ndef,
    private platform: Platform,
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

  ionViewDidEnter() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext("2d");
    console.log(this.videoElement);
  }

  data = {
    lat: 0,
    long: 0,
    tagId: "",
    source_token: "",
  };
  source_token;
  hideDashboardScreen = true;
  ngOnInit() {
    // window.localStorage.setItem('product-link',this.router.url)
    if (
      this.router.url.includes("params") &&
      !this.router.url.includes("source")
    ) {
      this.hideDashboardScreen = false;
      this.gettag(this.router.url.split("=")[1]);
    } else if (
      this.router.url.includes("brand") &&
      !this.router.url.includes("source")
    ) {
      this.hideDashboardScreen = false;
      let brand = this.router.url.split("=")[1];
      this.router.navigate(["/verifyit-product-catalog"], {
        queryParams: { brand: brand },
      });
    } else if (this.router.url.includes("product_id")) {
      this.hideDashboardScreen = false;
      let product_id = this.router.url.split("=")[1];
      this.router.navigate(["/verifyit-product-catalog"], {
        queryParams: { product_id: product_id },
      });
    } else if (
      this.router.url.includes("params") &&
      this.router.url.includes("source")
    ) {
      this.hideDashboardScreen = false;
      this.source_token = this.router.url.split("=")[2];
      window.localStorage.setItem("source_token", this.source_token);
      this.data.source_token = this.source_token;
      this.gettag(this.router.url.split("=")[1].split("&")[0]);
      // this.router.navigateByUrl('/verifyit-product-info')
    }
     // this.gettag('4516') 4925
    //  for multiple image 4516
    // for vedio link      4573
    //for customer review  4517
    // 4534 for reward
    //4507  //for scratchcard
    this.gettag('4516')
    

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          this.data.lat = resp.coords.latitude;
          this.data.long = resp.coords.longitude;
        })
        .catch((error) => {
          console.log("Error getting location", error);
        });
    });

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
  async presentLoading(data) {
    const loading = await this.loading.create({
      message: data,
    });
    await loading.present();
  }

  //**Charu Start */
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
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.data.lat = resp.coords.latitude;
        this.data.long = resp.coords.longitude;
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });

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
            this.loading.dismiss();
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
      this.loading.dismiss();
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
      this.loading.dismiss();
      this.presentLoading("Processing data from NFC Tag.");

      this.cred.product_name = this.res.product_name;
      // this.alertService.presentAlert('',this.cred.product_name)
      this.cred.verified = this.res.verified;
      this.cred.tagId = tagId;
      this.data.tagId = tagId;

      this.apiSvc.callRecordScan(this.data).subscribe(
        (callrecordscanresult) => {
          this.utilservice.callrecordscanresult = callrecordscanresult;
          this.loading.dismiss();
          this.router.navigateByUrl("/verifyit-product-info");
          //location
        },
        (err) => {
          this.loading.dismiss();
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

  // boughtIt(tagId){
  //       this.apiSvc.callPostBoughtIt(tagId).subscribe((res) => {
  //         this.alertService.presentAlert('',res);
  //         // this.helperSvc.hideLoading();
  //   });
  //   // this.navCtrl.push(ThankyouPage,{})
  //   this.alertService.presentAlert('','thank you')

  // }

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
            tagId = tagId.split("=")[1];
            //  alert(tagId)
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
      this.scanIOS();
    }

    // this.options = {
    //   prompt: "Scan your barcode "
    // };
    // this.barcodeScanner.scan(this.options).then(
    //   barcodeData => {
    //     console.log(barcodeData);

    //     // logic for existing and new qr code

    //     this.tagId = (barcodeData.text).toString();

    //     if(this.tagId.includes("myparam")){
    //
    //      this.tagId= this.tagId.split('=')[1]
    //      alert(this.tagId)
    //      this.gettag(this.tagId);
    //     }else{
    //       this.gettag(this.tagId);

    //     }
    //     // this.tagId= (JSON.parse( this.tagId))

    //     // this.productData = this.strToObj(this.tagId)

    //     // let variabletype = typeof (this.tagId)
    //     // if (variabletype == "number") {
    //     //
    //     //   alert('number')
    //     //   this.gettag(this.tagId);

    //     // } else {
    //     //
    //     //   this.gettag(this.productData.tagId);

    //     //   // alert('string')
    //     // }

    //   },
    //   err => {
    //     console.log("Error occured : " + err);
    //   }
    // );
  }

  async gettag(tagId) {
    window.localStorage.setItem("tagId", tagId);
    let locationUrl = window.location.href;

    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.data.lat = resp.coords.latitude;
        this.data.long = resp.coords.longitude;
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
    await this.presentLoading("");

    this.apiSvc.callGetTag(tagId).subscribe((callgettagresult) => {
      this.utilservice.callgettagresult = callgettagresult;

      this.res = callgettagresult;

      this.cred.product_name = this.res.product_name;
      // this.alertService.presentAlert('',this.cred.product_name)
      this.cred.verified = this.res.verified;
      this.cred.tagId = tagId;
      this.data.tagId = tagId;
      this.apiSvc.callRecordScan(this.data).subscribe(
        (callrecordscanresult) => {
          if(locationUrl.includes("pwa") || locationUrl.includes("nowverifycap") || locationUrl.includes("noeverifycaptest") ){

          }else{

            this.presentToast(["QR code scan successfully."]);
          }

          console.log(callrecordscanresult);
          this.utilservice.callrecordscanresult = callrecordscanresult;
          this.loading.dismiss();
          this.router.navigateByUrl("/verifyit-product-info");
          //location
        },
        (err) => {
          this.loading.dismiss();
          this.presentToast(["QR code scan went wrong.."]);

          // this.alertService.presentAlert("", "call record scan went wrong");
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

  strToObj(str) {
    var obj = {};
    if (str && typeof str === "string") {
      var objStr = str.match(/\{(.)+\}/g);
      eval("obj =" + objStr);
    }
    //
    return obj;
  }

  scanIOS() {
    this.options = {
      prompt: "Scan your barcode ",
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






}
