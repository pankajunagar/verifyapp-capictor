import { Component, OnInit, NgZone } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import { Platform } from "@ionic/angular";
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
  BarcodeScannerOptions
} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-verifyitsuccessmessage",
  templateUrl: "./verifyitsuccessmessage.page.html",
  styleUrls: ["./verifyitsuccessmessage.page.scss"]
})
export class VerifyItSuccessMessagePage implements OnInit {
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
      strap: null
    },
    how_to_use_it: { english: null, spanish: null, portugues: null }
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
    key13: null
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
  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private platform: Platform,
    private loading: LoadingController,
    private ngZone: NgZone,
    private qrScanner: QRScanner,
    private utilservice: Utils,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private alertService: AlertServiceService,
    private geolocation: Geolocation,

    private apiSvc: NailaService
  ) {
    this.ionViewDidLoad();
    this.userType = window.localStorage.getItem("userType");
    // this.alertService.presentthis.alertService.presentAlert(''," user info data",window.localStorage.getItem('userType'));
  }
  data = {
    lat: 0,
    long: 0,
    tagId: ""
  };
  ngOnInit() {
    // this.geolocation
    //   .getCurrentPosition()
    //   .then(resp => {
    //     this.data.lat = resp.coords.latitude;
    //     this.data.long = resp.coords.longitude;
    //   })
    //   .catch(error => {
    //     console.log("Error getting location", error);
    //   });

    this.utilservice.LoadPage.subscribe(data => {
      // this.alertService.presentAlert('',this.utilservice.userType)
      // this.ionViewWillEnter();
      if (this.userType == 1) {
        this.userType = 2;
      } else {
        this.userType = 1;
      }
    });
  }
  async presentLoading() {
    const loading = await this.loading.create({});
    await loading.present();
  }

  ionViewDidLoad() {
     ;
    this.userType = window.localStorage.getItem("userType");

    this.platform.ready().then(() => {
      this.nfc
        .enabled()
        .then(resolve => {
          this.canNFC = true;
          // this.setStatus("NFC Compatable.");
          this.tagListenerSuccess();
        })
        .catch(reject => {
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
      .then(resp => {
        this.data.lat = resp.coords.latitude;
        this.data.long = resp.coords.longitude;
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
    this.subscriptions.push(
      this.nfc.addNdefListener().subscribe(
        data => {
          if (this.readingTag) {
            let payload = data.tag.ndefMessage[0].payload;
            let tagId = this.nfc.bytesToString(payload).substring(3);
            this.readingTag = false;
            this.presentLoading();
            this.apiSvc.callGetTag(tagId).subscribe(callgettagresult => {
              this.utilservice.callgettagresult = callgettagresult;
              this.res = callgettagresult;

              this.cred.product_name = this.res.product_name;
              // this.alertService.presentAlert('',this.cred.product_name)
              this.cred.verified = this.res.verified;
              this.cred.tagId = tagId;
              this.data.tagId = tagId;

              this.apiSvc.callRecordScan(this.data).subscribe(
                callrecordscanresult => {
                  this.utilservice.callrecordscanresult = callrecordscanresult;
                  this.loading.dismiss();
                  this.router.navigateByUrl("/verifyit-product-info");
                  //location
                },
                err => {
                  this.loading.dismiss();
                  this.alertService.presentAlert(
                    "",
                    "call record scan went wrong"
                  );
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
        },
        err => {
          this.loading.dismiss();
          this.alertService.presentAlert("", "Something went wrong!");
        }
      )
    );
  }

  setStatus(message) {
    this.alertService.presentAlert("", message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  readTag() {
    if (this.canNFC) {
      setTimeout(() => {
        this.alertService.presentAlert(
          "",
          "Please place your mobile near NFC tag."
        );
        this.readingTag = true;
        this.tagListenerSuccess();
      }, 100);
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
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  tagId;

  scanqrcode() {
    this.options = {
      prompt: "Scan your barcode "
    };
    this.barcodeScanner.scan(this.options).then(
      barcodeData => {
        console.log(barcodeData);
        this.tagId = barcodeData.text;

        this.gettag(this.tagId);
      },
      err => {
        console.log("Error occured : " + err);
      }
    );
  }

  async gettag(tagId) {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.data.lat = resp.coords.latitude;
        this.data.long = resp.coords.longitude;
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
    await this.presentLoading();

    this.apiSvc.callGetTag(tagId).subscribe(callgettagresult => {
      this.utilservice.callgettagresult = callgettagresult;

      this.res = callgettagresult;

      this.cred.product_name = this.res.product_name;
      // this.alertService.presentAlert('',this.cred.product_name)
      this.cred.verified = this.res.verified;
      this.cred.tagId = tagId;
      this.data.tagId = tagId;
      this.apiSvc.callRecordScan(this.data).subscribe(
        callrecordscanresult => {
          this.utilservice.callrecordscanresult = callrecordscanresult;
          this.loading.dismiss();
          this.router.navigateByUrl("/verifyit-product-info");
          //location
        },
        err => {
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
}
