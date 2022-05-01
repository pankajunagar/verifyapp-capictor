import { LoginService } from "src/app/common-services/login.service";
import { Component, OnInit, NgZone, ViewChild } from "@angular/core";

import { Subscription } from "rxjs/Subscription";
// import { Plugins } from '@capacitor/core';

import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import {
  Platform,
  ModalController,
  ActionSheetController,
  ToastController,
  NavController,
  LoadingController,
} from "@ionic/angular";
import { NailaService } from "../../services/naila.service";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { Utils } from "../../services/utils.service";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { AlertController } from "@ionic/angular";
import { TellUsifyouBuyitComponent } from "../../modals/tellusifyoubuyit/tellusifyoubuyit.component";
import { CertificateModalComponent } from "../../modals/certificatemodal/certificatemodal.component";
// Userrole5modalComponent
import { Plugins } from "@capacitor/core";
import * as WebVPPlugin from "capacitor-video-player";
// const { CapacitorVideoPlayer, Device } = Plugins;

import { Browser } from "@capacitor/browser";
// import { Content } from "ionic-angular";
import {
  InAppBrowser,
  InAppBrowserOptions,
  InAppBrowserEvent,
} from "@ionic-native/in-app-browser/ngx";
import { DomSanitizer } from "@angular/platform-browser";
import { Userrole5modalComponent } from "../../modals/userrole5modal/userrole5modal.component";
// import { QuizModalComponent2 } from "src/app/quiz-modal2/quiz-modal.component";
import { AutocloseOverlaysService } from "../../services/autoclose.service";
// import { WarrantycardComponent } from "../../modals/warrantycard/warrantycard.component";
// import { PanoimageComponent } from "../../modals/panoimage/panoimage.component";

import { ScratchCard, SCRATCH_TYPE } from "scratchcard-js";
import { ScratchmodalComponent } from "../../modals/scratchmodal/scratchmodal.component";
// import { Plugins } from '@capacitor/core';
// const { Share } = Plugins;
import { Share } from "@capacitor/share";
// import { Device } from "@capacitor/device";
import { CapacitorVideoPlayer } from "capacitor-video-player";

// const PhotoSphereViewer = require("photo-sphere-viewer");
// import 'photo-sphere-viewer/dist/plugins/markers.css'

// import { IonContent } from '@ionic/angular';

import MarkersPlugins from "photo-sphere-viewer/dist/plugins/markers";
import { MainAppSetting } from "src/app/conatants/MainAppSetting";
import { browser } from "protractor";
import { QuizModalComponent } from "../../modals/quiz-modal/quiz-modal.component";
// import { SurpriseModalComponent } from "../../modals/surprisemodal/surprisemodal.component";

@Component({
  selector: "app-verifyitproductpage",
  templateUrl: "./verifyitproductpage.html",
  styleUrls: ["./verifyitproductpage.scss"],
})
export class Verifyitproductpage {
  @ViewChild("content") private Content: any;
  hassurpriseModal;
  hasquizModal;
  helpUrl: any;
  msg: string = "Mobile number is not valid.";

  private _videoPlayer: any;
  private _url: string;
  private _handlerPlay: any;
  private _handlerPause: any;
  private _handlerEnded: any;
  private _handlerReady: any;
  private _handlerExit: any;

  sliderConfig = {
    slidesPerView: 2,
    spaceBetween: 5,
    // centeredSlides: true
  };

  sliderConfig2 = {
    initialSlide: 0,
    slidesPerView: 1,
    // autoplay:true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    }
  };
  showmore = true;

  private _first: boolean = false;
  private _apiTimer1: any;
  private _apiTimer2: any;
  private _apiTimer3: any;
  private _testApi: boolean = true;

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
        main: null,
      },
    },
    product_details: {
      water_resistant: null,
      display_type: null,
      series: null,
      occassion: null,
      strap: null,
    },
    how_to_use_it: { english: null, spanish: null, portugues: null },
  };
  trackingData = {
    user_id: "",
    tag_id: "",
    product_id: "",
    device_id: "",
    otype: "",
    meta_data: {
      mobile_number: "",
    },
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
  unsubscribeutilloadpage;
  brand_color: any;
  browser;
  hasvideoPlay = false;
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
    product_id: "",
    model_number: "",
    manufactured: "",
  };
  showDeactivate;
  hideBrand = true;
  subscription;
  subscription1;
  subscription2;
  readingTag: boolean = false;
  writingTag: boolean = false;
  haspano: boolean;
  isWriting: boolean = false;
  writtenInput = "";
  ndefMsg: any;
  hasLogin;
  subscription3
  subscriptions: Array<Subscription> = new Array<Subscription>();
  initialProdImage = '';
  constructor(
    private appSettings: MainAppSetting,
    private nfc: NFC,
    private ndef: Ndef,
    private autocloseOverlaysService: AutocloseOverlaysService,
    private navCtrl: NavController,
    private platform: Platform,
    private route: ActivatedRoute,
    private iab: InAppBrowser,
    private ngZone: NgZone,
    private socialSharing: SocialSharing,
    private qrScanner: QRScanner,
    private loadingCtrl: LoadingController,
    private utilservice: Utils,
    private alertService: AlertServiceService,
    private toastController: ToastController,
    private router: Router,
    private sanitizer: DomSanitizer,
    public alertController: AlertController,
    private apiSvc: NailaService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private loginService: LoginService
  ) // private actionSheetController: ActionSheetController
  {
    this.loginService.presentLoading()

    // window.localStorage.setItem('flow','flow3')
    // window.localStorage.setItem('save_answer','false')
    // window.localStorage.setItem('user_upi','false')

    this.showRelatedProduct();
    this.haspano = false;

    this.router.events.subscribe((event: any): void => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === "popstate") {
          // this.autocloseOverlaysService.trigger();

          if (this.hasvideoPlay) {
            window.history.forward();
          }
        }
      }
    });

    // this.hardwareBackbutton();

    this.showDeactivate = false;

    this.sanitizer = sanitizer;

    // this.unsubscribeutilloadpage = this.utilservice.LoadPage.subscribe(
    //   (data) => {
    //     // this.ngOnInit();
    //   }
    // );

    this.subscription = this.utilservice.LoadModal.subscribe((data) => {
      if (window.localStorage.getItem('scan_flow') == "3" && ((window.localStorage.getItem('save_answer') != 'true') || (window.localStorage.getItem('save_answer') == undefined))) {
        // this.openQuiz("default");
        this.getQuestions()
      } else {
        // this.checkWinnerStatus()

        this.checkWinnerStatus();
      }
    });

    this.subscription1 = this.utilservice.share_product.subscribe((data) => {
      this.socialShare();
    });

    this.subscription2 = this.utilservice.submit_upi.subscribe((data) => {
      this.SubmitUPI();
    });
    this.subscription3 = this.utilservice.presentLoader.subscribe((data) => {
      // this.SubmitUPI();
      if (window.localStorage.getItem('scan_flow') == "2" && !window.localStorage.getItem('name')) {
        this.loginService.presentLoading()
      }
    });
  }

  hasComingsoon
  hasScratchCard
  hasPopup
  brandFlow
  hasProductCatalogue
  ngOnInit() {
    // new logic for flow construct
    switch (window.localStorage.getItem('scan_flow')) {
      case "0":

        break;
      case "1":
        this.flowOperation1("1")
        // code block
        break;
      case "2":
        this.flowOperation2("2")
        break;
      case "3":
        this.flowOperation3("3")
        break;
      case "4":
        this.flowOperation4("4")
        break;
      case "5":
        this.flowOperation5("5")
        break;
      default:
      // code block
    }

    this.productInformation()

  }


  ionViewDidLeave() {
    // this.navCtrl.pop();
    this.loadingCtrl.dismiss()
  }

  // async ionViewDidEnter() {
  //   // this.openPanoImage()
  //   // this.showProductVideo('https://nowverityit-img.s3.ap-south-1.amazonaws.com/img/Personalized+Video+GoodWynTea.mp4')
  // }

  async showProductVideo(data) {
    // alert("hello")
    // this.openQuiz();
    const res: any = await this._videoPlayer.initPlayer({
      mode: "fullscreen",
      url: data,
      playerId: "fullscreen",
      componentTag: "app-verifyitproductpage",
    });
  }


  res: any = {};


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
          max: 10,
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (alertData) => {
            //takes the data
            console.log(alertData.Mobile);
          },
        },
      ],
    });
    await alert.present();
  }

  showCatalog(id) {
    let shareData = {
      user_id: window.localStorage.getItem("userid"),
      tag_id: window.localStorage.getItem("tagId"),
      product_id: this.callgettagresult.product_id,
      device_id: window.localStorage.getItem("device_id"),
      otype: "PRODUCT_INFOPAGE_SHOW_CATALOG_CLICK",
    };
    this.apiSvc.reviewTracking(shareData).subscribe(
      (res: any) => {
        if (res) {
          this.utilservice.productId = id;
          this.router.navigateByUrl("/verifyit-product-catalog");
        }
      },
      //**charu end */
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  ionViewWillLeave() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }



  async boughtIt(tagId) {
    this.apiSvc.callPostBoughtIt(tagId).subscribe((res) => {
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
  }

  async presentModal() {
    let modal = await this.modalController.create({
      component: CertificateModalComponent,
    });
    return await modal.present();
  }

  options: InAppBrowserOptions = {
    hidden: "no", //Or  'yes'
    // clearcache : 'yes',
    // clearsessioncache : 'yes',
    // zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback: "yes",
    mediaPlaybackRequiresUserAction: "no",
    shouldPauseOnSuspend: "no", //Android only
    closebuttoncaption: "Close", //iOS only
    // toolbar : 'yes', //iOS only
    // enableViewportScale : 'yes', //iOS only
    allowInlineMediaPlayback: "no", //iOS only
    // disallowoverscroll : 'no', //iOS only
    presentationstyle: "fullscreen", //iOS only
    fullscreen: "no", //Windows only
    hideurlbar: "yes",
    toolbar: "yes",
    location: "no",
    hidenavigationbuttons: "yes",
    zoom: "no",
  };

  routemessage;

  mobile_number;
  async trackingLinks(data) {
    let alert = await this.alertController.create({
      header: "Please Enter your mobile number for cash back.",
      message:
        'Once you submit review please take a screenshot of review and share it with <a href="tel:+91-8527934125">+91-8527934125 </a> (customer care number) on WhatsApp. You will receive cash back after verification process.',
      inputs: [
        {
          name: "mobile_number",
          type: "number",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Submit",
          handler: (alertData) => {
            //takes the data
            if (alertData.mobile_number.length > 9) {
              console.log(alertData.mobile_number);
              this.mobile_number = alertData.mobile_number;
              // data.push('mobile_number')
              this.trackingReview(data);
            } else {
              this.presentToast(this.msg);
              return false;
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: this.msg,
      duration: 3000,
    });
    toast.present();
  }

  async presentActionSheet(data) {
    let buttons = [];
    const _this = this;

    data.value.forEach((element) => {
      let button = {
        text: element.text,
        // icon:data.icon,
        handler: () => {
          // console.log('setting icon ' + this.data.icon);
          // const browser = this.iab.create(element.link);
          if (this.callgettagresult.brand == "RRC" && data.key == "review") {
            this.trackingLinks(element);
          } else {
            this.trackingOnlinePurchase(element);
            this.openInappBrowser(element);
          }
        },
      };

      buttons.push(button);
    });
    //**Charu Start */
    let buttonReview = {
      text: "Customer Review",
      // icon:data.icon,
      handler: () => {
        this.router.navigate([
          "/customer-review",
          { callgettagresult: JSON.stringify(this.callgettagresult) },
        ]);
      },
    };
    buttons.push(buttonReview);
    //**Charu End */
    const actionSheet = await this.actionSheetController.create({
      header: "Useful Links ",
      cssClass: "my-custom-class",

      buttons: buttons,
    });

    await actionSheet.present();
  }

  thankyouRedirect() {
    this.browser.close();
    this.router.navigateByUrl("/verifyit-message");
  }

  async openInappBrowser(element) {
    await Browser.open({
      url: element.link,
      windowName: "_blank",
      toolbarColor: "	#FF0000",
    });

    Browser.addListener("browserFinished", () => {
      this.presentToast("Review submitted successfully.");
    });
    Browser.addListener("browserPageLoaded", () => {
      // ;
      // alert("hello===========>");
      // console.log("hello===========>")
    });
  }

  async presentModal2() {
    let modal = await this.modalController.create({
      component: TellUsifyouBuyitComponent,
    });
    return await modal.present();
  }
  product_title = this.callgettagresult.product_name;
  brand = this.callgettagresult.brand;
  product_link = "";


  async socialShare() {
    this.subscription1.unsubscribe();
    let pTagId;
    let referraltext;
    if (
      (window.localStorage.getItem('scan_flow') == "1" || window.localStorage.getItem('scan_flow') == "3") &&
      window.localStorage.getItem("name")
    ) {
      pTagId = 5019;
      referraltext =
        window.localStorage.getItem("name") +
        " " + this.utilservice.winLossAlgoData.link_data.msg;
    } else {
      pTagId = window.localStorage.getItem("tagId");
      referraltext = "Hey, Checkout" + " from " + this.callgettagresult.brand;
    }
    // whatsapp message
    this.product_title = this.callgettagresult.product_name;
    this.brand = this.callgettagresult.brand;
    this.product_link =
      this.appSettings.getPWALink() +
      "?params=" +
      window.localStorage.getItem('params') +
      "&source=" +
      window.localStorage.getItem("token").slice(-10);

    // this.jsonToBeUsed.forEach(element => {
    //   if (element.key == "purchase online") {
    //     console.log(element);
    //     this.product_link = element.value[0].link;
    //   }
    // });
    let shareRet = await Share.share({
      title: this.product_title,
      text: referraltext,

      url: this.product_link,
      // dialogTitle: 'Share with buddies'
    });
    this.shareTracking();


  }
  async navigateTomsgPage() {
    this.router.navigateByUrl("/verifyit-message");
  }
  shortToken;

  private _addListenersToPlayerPlugin() {
    this._handlerPlay = this._videoPlayer.addListener(
      "jeepCapVideoPlayerPlay",
      (data: any) => {
        // console.log('Event jeepCapVideoPlayerPlay ', data);
        this.hasvideoPlay = true;
        this.trackingVideoCompletion("VIDEO_LINK_CLICK");
      },
      false
    );
    this._handlerPause = this._videoPlayer.addListener(
      "jeepCapVideoPlayerPause",
      (data: any) => {
        console.log("Event jeepCapVideoPlayerPause ", data);
      },
      false
    );
    this._handlerEnded = this._videoPlayer.addListener(
      "jeepCapVideoPlayerEnded",
      async (data: any) => {
        console.log("Event jeepCapVideoPlayerEnded ", data);
        this.hasvideoPlay = false;
        //  await this.destroy()

        // this.opena();
        this.trackingVideoCompletion("VIDEO_PLAY_COMPLETE");

        // alert('<=========================ended=========================>')
      },
      false
    );
    this._handlerExit = this._videoPlayer.addListener(
      "jeepCapVideoPlayerExit",
      async (data: any) => {
        this.hasvideoPlay = false;
        console.log("Event jeepCapVideoPlayerExit ", data);
      },
      false
    );
    this._handlerReady = this._videoPlayer.addListener(
      "jeepCapVideoPlayerReady",
      async (data: any) => {
        console.log("Event jeepCapVideoPlayerReady ", data);
        console.log("testVideoPlayerPlugin testAPI ", this._testApi);
        console.log("testVideoPlayerPlugin first ", this._first);
        if (this._testApi && this._first) {
          // test the API
          this._first = false;
          console.log("testVideoPlayerPlugin calling isPlaying ");
          const isPlaying = await this._videoPlayer.isPlaying({
            playerId: "fullscreen",
          });
          console.log("const isPlaying ", isPlaying);
          this._apiTimer1 = setTimeout(async () => {
            const pause = await this._videoPlayer.pause({
              playerId: "fullscreen",
            });
            console.log("const pause ", pause);
            const isPlaying = await this._videoPlayer.isPlaying({
              playerId: "fullscreen",
            });
            console.log("const isPlaying after pause ", isPlaying);
            let currentTime = await this._videoPlayer.getCurrentTime({
              playerId: "fullscreen",
            });
            console.log("const currentTime ", currentTime);
            let muted = await this._videoPlayer.getMuted({
              playerId: "fullscreen",
            });
            console.log("initial muted ", muted);
            const setMuted = await this._videoPlayer.setMuted({
              playerId: "fullscreen",
              muted: !muted.value,
            });
            console.log("setMuted ", setMuted);
            muted = await this._videoPlayer.getMuted({
              playerId: "fullscreen",
            });
            console.log("const muted ", muted);
            const duration = await this._videoPlayer.getDuration({
              playerId: "fullscreen",
            });
            console.log("duration ", duration);
            // valid for movies havin a duration > 25
            const seektime =
              currentTime.value + 0.5 * duration.value < duration.value - 25
                ? currentTime.value + 0.5 * duration.value
                : duration.value - 25;
            const setCurrentTime = await this._videoPlayer.setCurrentTime({
              playerId: "fullscreen",
              seektime: seektime,
            });
            console.log("const setCurrentTime ", setCurrentTime);
            const play = await this._videoPlayer.play({
              playerId: "fullscreen",
            });
            console.log("play ", play);
            this._apiTimer2 = setTimeout(async () => {
              const setMuted = await this._videoPlayer.setMuted({
                playerId: "fullscreen",
                muted: false,
              });
              console.log("setMuted ", setMuted);
              const setVolume = await this._videoPlayer.setVolume({
                playerId: "fullscreen",
                volume: 0.5,
              });
              console.log("setVolume ", setVolume);
              const volume = await this._videoPlayer.getVolume({
                playerId: "fullscreen",
              });
              console.log("Volume ", volume);
              this._apiTimer3 = setTimeout(async () => {
                const pause = await this._videoPlayer.pause({
                  playerId: "fullscreen",
                });
                console.log("const pause ", pause);
                const duration = await this._videoPlayer.getDuration({
                  playerId: "fullscreen",
                });
                console.log("duration ", duration);
                const volume = await this._videoPlayer.setVolume({
                  playerId: "fullscreen",
                  volume: 1.0,
                });
                console.log("Volume ", volume);
                const setCurrentTime = await this._videoPlayer.setCurrentTime({
                  playerId: "fullscreen",
                  seektime: duration.value - 3,
                });
                console.log("const setCurrentTime ", setCurrentTime);
                const play = await this._videoPlayer.play({
                  playerId: "fullscreen",
                });
                console.log("const play ", play);
              }, 10000);
            }, 10000);
          }, 5000);
        }
      },
      false
    );
  }

  // tracking apis

  shareTracking() {
    this.shortToken = window.localStorage.getItem("token");
    let lastFourWord = this.shortToken.slice(-10);
    let lastTentoken = lastFourWord;
    this.trackingData.meta_data.mobile_number = this.mobile_number;
    let shareData = {
      user_id: window.localStorage.getItem("userid"),
      tag_id: window.localStorage.getItem("tagId"),
      product_id: this.callgettagresult.product_id,
      device_id: window.localStorage.getItem("device_id"),
      otype: "SOCIAL_SHARE_CLICK",
      source_token: lastTentoken,
    };
    this.apiSvc.reviewTracking(shareData).subscribe(
      (res: any) => {
        // this.openInappBrowser(data)
        //**charu Start */
        if (res) {
          // this.msg=`Congratualtions! You have been awarded ${res.data.loyalty} Loaylty Point from the Brand ${res.data.brand} `;
          // this.presentToast(this.msg)
        }
      },
      //**charu end */
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  trackingReview(data) {
    const _this = this;
    if (this.callgettagresult.brand == "RRC") {
      // this.trackingLinks(data)
      _this.trackingData.user_id = window.localStorage.getItem("userid");
      _this.trackingData.tag_id = window.localStorage.getItem("tagId");
      _this.trackingData.product_id = this.callgettagresult.product_id;
      (_this.trackingData.device_id = window.localStorage.getItem("device_id")),
        // _this.trackingData.mobile_number = this.mobile_number
        (_this.trackingData.otype = "REVIEW_LINK_CLICK");

      _this.trackingData.meta_data.mobile_number = this.mobile_number;
      this.apiSvc.reviewTracking(_this.trackingData).subscribe(
        //**charu Start */
        (res: any) => {
          if (res) {
            this.msg = `Congratualtions! You have been awarded Loaylty Point from the Brand ${res.data.brand} `;
            // this.msg = `Congratualtions! You have been awarded ${res.data.loyalty} Loaylty Point from the Brand ${res.data.brand} `;
            this.presentToast(this.msg);
            this.openInappBrowser(data);
          }
        },
        //**charu Start */
        (err) => {
          alert(JSON.stringify(err));
        }
      );
    }
  }

  trackingOnlinePurchase(element) {
    // this.shortToken= window.localStorage.getItem('token')
    // let lastFourWord =this.shortToken.slice(-10)
    // let lastTentoken= lastFourWord
    // this.trackingData.meta_data.mobile_number = this.mobile_number
    let shareData = {
      user_id: window.localStorage.getItem("userid"),
      tag_id: window.localStorage.getItem("tagId"),
      product_id: this.callgettagresult.product_id,
      device_id: window.localStorage.getItem("device_id"),
      otype: "PURCHASE_LINK_CLICK",
      // source_token:lastTentoken
    };
    this.apiSvc.reviewTracking(shareData).subscribe(
      //**charu Start */
      (res: any) => {
        // this.openInappBrowser(data)
        if (res) {
          // this.msg=`Congratualtions! You have been awarded ${res.data.loyalty} Loaylty Point from the Brand ${res.data.brand} `;
          // this.presentToast(this.msg)
        }
      },
      //**charu end */
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
    modal.onDidDismiss().then((requestTo: any) => {
      if (requestTo !== null) {
        console.log(requestTo);
        requestTo.data["requestFrom"] == "video"
          ? this.showProductVideo(requestTo.data["data"])
          : "";
      }
    });

    /** Charu  */
    return await modal.present();
    //showProductVideo(list.link)
    // modal.close
  }

  // otype:LAND_THROUGH_SOCIAL_SHARING

  trackingVideoCompletion(data) {
    let shareData = {
      user_id: window.localStorage.getItem("userid"),
      tag_id: window.localStorage.getItem("tagId"),
      product_id: this.callgettagresult.product_id,
      device_id: window.localStorage.getItem("device_id"),
      otype: data,
      // source_token:lastTentoken
    };
    this.apiSvc.reviewTracking(shareData).subscribe(
      //**charu Start */
      (res: any) => {
        // this.openInappBrowser(data)
        if (res) {
          this.msg = `Congratualtions! You have been awarded Loaylty Point from the Brand ${res.data.brand} `;
          // this.msg = `Congratualtions! You have been awarded ${res.data.loyalty} Loaylty Point from the Brand ${res.data.brand} `;
          this.presentToast(this.msg);
        }
      },
      //**charu end */
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  async openUserModal() {
    let modal = await this.modalController.create({
      component: Userrole5modalComponent,
      cssClass: "user-modal",
    });
    return await modal.present();
  }

  hardwareBackbutton() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      // console.log('Handler was called!');
      // alert("hi")
      // this.router.navigateByUrl('/verifyit-product-info')
      // this._handlerExit = this._videoPlayer.addListener('jeepCapVideoPlayerExit', async (data:any) => {
      //   console.log('Event jeepCapVideoPlayerExit ', data)

      // }, false);
      this.autocloseOverlaysService.trigger();
    });
  }







  createNewScratchCard() {
    const scContainer = document.getElementById("js--sc--container");
    const sc = new ScratchCard("#js--sc--container", {
      scratchType: SCRATCH_TYPE.CIRCLE,
      containerWidth: 300, //scContainer.offsetWidth,
      containerHeight: 300,
      imageForwardSrc: "assets/scratch.png",
      //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
      htmlBackground:
        '<div class="cardamountcss"><div class="won-amnt">30</div><div class="won-text">Points<br>Won!</div></div>',
      clearZoneRadius: 40,
      nPoints: 30,
      pointSize: 4,
      callback: () => {
        console.log("Now the window will reload !");
      },
    });
    // Init
    sc.init();
  }

  async scratchModal() {
    // this.utils.royaltyData=data
    let modal = await this.modalController.create({
      component: ScratchmodalComponent,
      cssClass: "scratch-modal",
      backdropDismiss: false
    }
    );
    return await modal.present();
  }













  getQuestions() {
    
    // this.subscription.unsubscribe();
    let data = {
      brand_id: window.localStorage.getItem('brand_id'),
      // brand_id: "38",
    };

    this.apiSvc.getQuestion(data).subscribe(
      (res: any) => {
        
        if (res.data.question.length > 0) {

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







  //new flow constructs

  flowOperation1(data) {

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

    if (!window.localStorage.getItem('name')) {
      this.checkWinnerStatus2()

    } else {
      this.getQuestions()
    }
  }

  flowOperation3(data) {
    
    window.localStorage.setItem('user_upi', 'xxxxxxx')

    if (window.localStorage.getItem('name') && data == '3') {
      this.loginService.isProductInfo = true;
      this.utilservice.isProductInfo = true;
      window.localStorage.setItem("hasquizModal", "1");
      this.getQuestions()
    } else {

      this.utilservice.newflow = true

      this.router.navigateByUrl('/login')
    }

  }

  flowOperation4(data) {
    if (!window.localStorage.getItem('name')) {
      this.checkWinnerStatus2()

    } else {
      this.getQuestions()
    }
  }
  async flowOperation5(data) {


    this.platform.ready().then(() => {

      let link = this.utilservice.callgettagresult.meta_data.Website



      this.browser = this.iab.create(link, '_self');
      this.browser.show();

      this.browser.on('loaderror').subscribe(event => {

        this.browser.hide();
        this.presentToast('Something Wnt Wrong');
      });


    });


  }

  checkWinnerStatus2() {
    let winnerData = {
      product_id: this.utilservice.callgettagresult.product_id,
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

  // static code

  showHide() {
    this.showmore = !this.showmore;
  }

  showmore2 = true;
  showHide2() {
    this.showmore2 = !this.showmore2;
  }

  listofBanner = [];
  listbanner;
  showRelatedProduct() {
    this.apiSvc
      .listRelatedProducts(this.utilservice.callgettagresult.product_id)
      .subscribe((data) => {
        this.listbanner = data;

        for (let i = 0; i < this.listbanner.data.length; i++) {
          this.listofBanner.push(this.listbanner.data[i]);
        }

        // this.listofBanner = this.listbanner.data[0];

        // this.brandName=this.listbanner.data[0].brand

        // if (this.listbanner.data[0].meta_data.category) {
        //   this.groupBy(this.listbanner.data, "category");

        //   console.log('=================================>===============')
        //   this.groupedProducts.push(this.result)

        //   Object.keys(this.result).forEach(e => this.jsonToBeUsed.push({ key: e, value: this.result[e] }))
        //   console.log(this.jsonToBeUsed)
        //   console.log('=================================>===============')
        // }

        // this.items = this.listbanner.data
        // this.listbanner.data.forEach(element => {
        //   element.name = element.product_name
        // });
        console.log("======================fast===========>===============");

        console.log(this.listofBanner);

        console.log("======================fast===========>===============");
      });
  }

  checkWinnerStatus() {
    let winnerData = {
      product_id: this.utilservice.callgettagresult.product_id,
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


  SubmitUPI() {
    this.subscription2.unsubscribe();
    let bankData = {
      user_upi: this.utilservice.user_upi,
      user_id: window.localStorage.getItem("userid"),
      name: this.utilservice.user_name
    };

    this.apiSvc.submitBankDetail(bankData).subscribe(
      //**charu Start */
      (res: any) => {
        this.utilservice.flipsurpriseModal();
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  async openQuizBigApple() {
    const modal = await this.modalController.create({
      component: QuizModalComponent,
      cssClass: "my-quiz-class",

      componentProps: {
        requestFrom: "",
        data: "",
      },
    });
  }

  purchaseOnline(data) {

    let linkData = {
      link: data
    }
    this.openInappBrowser(linkData);
  }


  /// not used code
  // async secPlay() {
  //   let sequence = ["scratch_card"];

  //   // let obj = this.jsonToBeUsed.find(o => o.name === 'sequence');

  //   sequence.forEach((element) => {
  //     switch (element) {
  //       case "scratch_card":
  //         let obj = this.jsonToBeUsed.find((o) => o.key == "scratch_card");
  //         console.log("seq play==================>" + JSON.stringify(obj));
  //         this.scratchModal();

  //         break;
  //       case "product-video":
  //         obj = this.jsonToBeUsed.find((o) => o.key == "product-video");
  //         this.showProductVideo(obj.value);
  //         console.log("seq play2==================>" + JSON.stringify(obj));

  //       default:
  //         break;
  //     }

  //   });
  // }


  // 360 view image

  // panoramaimage

  // async openPanoImage() {
  //   this.utilservice.warrantyInformation = this.callgettagresult;
  //   let modal = await this.modalController.create({
  //     component: PanoimageComponent,
  //   });
  //   return await modal.present();
  // }

  // opena() {
  //   var viewer = new PhotoSphereViewer.Viewer({
  //     panorama: "assets/testp.jpg",
  //     container: "viewer",
  //     loadingImg:
  //       "https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif",
  //     caption: "GOODWYN TEA ESTATES",
  //     defaultLat: 0.3,
  //     touchmoveTwoFingers: true,
  //     mousewheelCtrlKey: true,

  //     plugins: [
  //       [
  //         MarkersPlugins,
  //         {

  //           markers: [
  //             {

  //               id: "image",
  //               longitude: 0.32,
  //               latitude: 0.11,
  //               image: "https://photo-sphere-viewer.js.org/assets/pin-blue.png",
  //               width: 32,
  //               height: 32,
  //               anchor: "bottom center",
  //               tooltip: "BLACK/RED TEA",
  //               content: `Black tea – which Kasim Ali, Owner of Waterloo Tea and Founder of the Tea Brewers Cup, tells me is sold as “red tea” in the Chinese market – is the most oxidised of all teas. The moment the leaves are picked, they begin to wilt and oxidation begins. They are often then crushed or rolled to speed up the process.

  //               The flavour profile is strong, with plenty of depth and body. As the most oxidised tea, you would also brew it at the highest temperatures. Kasim Ali recommends 95–100℃/203–212℉. And much like coffee, the greater the temperature, the more bitter you can expect the brew to taste.

  //               Some of the most famous black teas include the English Breakfast blend and Earl Grey, which is flavoured with bergamot.`,
  //             },
  //             {
  //               id: "image2",
  //               longitude: 1.42,
  //               latitude: 0.21,
  //               image: "https://photo-sphere-viewer.js.org/assets/pin-blue.png",
  //               width: 32,
  //               height: 32,
  //               anchor: "bottom center",
  //               tooltip: "OOLONG/WULONG TEA",
  //               content: `The only difference between oolong and wulong tea is the name. Oolong is the most recognised in Western countries, yet linguists would say that wulong is a more accurate romanisation of the original Chinese kanji.

  //               Oolong tea is also perhaps one of the widest categories of tea: according to Max Falkowitz in Serious Eats, oxidation can run between 8 and 85%. This means you will also come across vastly different flavours.

  //               All oolong tea processing begins with some form of encouraging oxidation, such as bruising the edges of the leaves. It also ends with a form of “fixing”, the process by which oxidation is paused. This could be pan firing, steaming, baking, or some other way of adding heat. However, Gebely states that the process between the initial oxidation and the fixing will vary because of the different oxidation levels.

  //               When brewing, Kasim suggests that medium oxidised teas are brewed at 85℃/185℉, while lower oxidised teas should be brewed at 80℃/176℉.`,
  //             },
  //             {
  //               id: "image3",
  //               longitude: 2.82,
  //               latitude: 0.11,
  //               image: "https://photo-sphere-viewer.js.org/assets/pin-blue.png",
  //               width: 32,
  //               height: 32,
  //               anchor: "bottom center",
  //               tooltip: "GREEN TEA",
  //               content: `Green tea is only very lightly oxidised. After the initial withering, the leaves must be quickly fixed. This tends to give it a lighter profile, and it will also lose its flavour much quicker than black or oolong tea.

  //               While associated with Asia, there are significant differences between the offerings from the different Asian countries. To start with, Mary Lou and Robert J. Heiss emphasise that Chinese and Japanese green tea tastes vastly different thanks to the varieties and terroir (The Tea Enthusiast’s Handbook: A Guide to the World’s Best Teas).

  //               Then you have the way the green teas are processed, prepared, and brewed. This results in categories such as sencha, matcha, longjing and bilochun.

  //               Matcha, which is ground into a powder, is perhaps the most well-known green tea thanks to Starbucks “matcha lattes”. Japan’s highest-quality green tea category, it is ground into a powder (meaning it quickly becomes stale). It’s consumed in the traditional Japanese tea ceremony.

  //               Ali recommends brewing Chinese green teas at 75℃/167℉, but Japanese green teas at 65℃/149℉. “Some Japanese greens will brew closer to 50℃ (122℉),” he adds.

  //               `,
  //             },
  //           ],
  //         },
  //       ],
  //     ],
  //   });

  //   var markersPlugin = viewer.getPlugin(MarkersPlugins);


  //   viewer.on("click", function (e, data) {
  //     if (!data.rightclick) {
  //       markersPlugin.addMarker({
  //         id: "#" + Math.random(),
  //         longitude: data.longitude,
  //         latitude: data.latitude,
  //         image: "https://photo-sphere-viewer.js.org/assets/pin-red.png",
  //         width: 32,
  //         height: 32,
  //         anchor: "bottom center",
  //         tooltip: "Generated pin",
  //         data: {
  //           generated: true,
  //         },
  //       });
  //     }
  //   });


  //   markersPlugin.on("select-marker", function (e, marker, data) {
  //     if (marker.data && marker.data.generated) {
  //       if (data.dblclick) {
  //         markersPlugin.removeMarker(marker);
  //       } else if (data.rightclick) {
  //         markersPlugin.updateMarker({
  //           id: marker.id,
  //           image: "https://photo-sphere-viewer.js.org/assets/pin-blue.png",
  //         });
  //       }
  //     }
  //   });

  //   this.haspano = true;
  // }

  // destroy() {
  //   const viewer = document.querySelector("#viewer");

  //   document.getElementById("viewer").style.display = "none";
  //   this.haspano = false;

  // }


  // scrollToTopOnInit() {
  //   this.Content.scrollToTop();
  // }


  // async generateEwarrantyCard() {
  //   this.utilservice.warrantyInformation = this.callgettagresult;
  //   let modal = await this.modalController.create({
  //     component: WarrantycardComponent,
  //   });
  //   return await modal.present();
  // }
  websiteLink
  productInformation() {
    
    Object.keys(this.utilservice.callgettagresult.meta_data).forEach((e) =>
      this.jsonToBeUsed.push({
        key: e,
        value: this.utilservice.callgettagresult.meta_data[e],
      })
    );

    

    this.platform.ready().then((readysource) => {
      console.log('===================brand=================')
      console.log('===================brand=================')

      console.log(this.utilservice.brand_id)


      console.log('===================brand=================')

      console.log('===================brand=================')



      if (window.localStorage.getItem("showDeactivate") == "4") {
        this.showDeactivate = true;
      } else {
        this.showDeactivate = false;
      }

      // this.jsonToBeUsed = [];
      this.hasLogin = window.localStorage.getItem("name");

      this.callgettagresult = this.utilservice.callgettagresult;
      this.hasScratchCard = this.utilservice.callgettagresult.meta_data.scratch_card
      this.hasPopup = this.utilservice.callgettagresult.meta_data.pop_up
      this.hasProductCatalogue = this.utilservice.callgettagresult.meta_data.product_catalogue
      this.hasComingsoon = this.utilservice.callgettagresult.meta_data.coming_soon
      this.websiteLink=this.utilservice.callgettagresult.meta_data.Website

      if((this.callgettagresult as any)?.meta_data?.images.length > 1){
        this.initialProdImage = (this.callgettagresult as any).meta_data.images[0]
      }
      // if(this.callgettagresult.brand == "RRC"){
      //   
      //   this.hideBrand=true
      //   // this.secPlay()

      // }else{
      //   
      //   this.hideBrand=false
      //   // this.secPlay()

      // }
      this.brandFlow = window.localStorage.getItem('scan_flow');



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

      this.jsonToBeUsed.forEach((element) => {
        if (element.key == "brand_color") {
          this.brand_color = element.value;
        }
      });

      if ("") {
        this._videoPlayer = CapacitorVideoPlayer;
      } else {
        this._videoPlayer = WebVPPlugin.CapacitorVideoPlayer;
      }

      this._url =
        "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";

      this._addListenersToPlayerPlugin();

    })
  }
}
