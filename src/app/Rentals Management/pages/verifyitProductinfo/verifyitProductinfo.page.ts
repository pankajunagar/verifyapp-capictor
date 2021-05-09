import { Component, OnInit, NgZone } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
// import { Plugins } from '@capacitor/core';

import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import {
  Platform,
  ModalController,
  ActionSheetController,
  ToastController
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

import { Plugins } from '@capacitor/core';
import * as WebVPPlugin from 'capacitor-video-player';
const { CapacitorVideoPlayer,Device } = Plugins;
const { Browser } = Plugins;
import {
  InAppBrowser,
  InAppBrowserOptions,
  InAppBrowserEvent
} from "@ionic-native/in-app-browser/ngx";

// import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

@Component({
  selector: "app-verifyitProductinf",
  templateUrl: "./verifyitProductinfo.page.html",
  styleUrls: ["./verifyitProductinfo.page.scss"]
})
export class VerifyitProductInfoPage implements OnInit{

  private _videoPlayer: any;
  private _url: string;
  private _handlerPlay: any;
  private _handlerPause: any;
  private _handlerEnded: any;
  private _handlerReady: any;
  private _handlerExit: any;
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
    private toastController:ToastController,
    private router: Router,
    public alertController: AlertController,
    private apiSvc: NailaService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {
    this.hasLogin = window.localStorage.getItem("name");
    // alert('=================='+this.hasLogin)
    // this.ionViewDidLoad()
    this.callgettagresult = this.utilservice.callgettagresult;

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


  async ngOnInit() {
    // define the plugin to use
    const info = await Device.getInfo();
    if (info.platform === "ios" || info.platform === "android") {
      this._videoPlayer = CapacitorVideoPlayer;
    } else {
      this._videoPlayer = WebVPPlugin.CapacitorVideoPlayer
    }
    // define the video url
    this._url = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    // add listeners to the plugin
    this._addListenersToPlayerPlugin();
  }


  async showProductVideo(data) {

    const res:any  = await this._videoPlayer.initPlayer({mode:"fullscreen",url:data,playerId:"fullscreen",componentTag:"app-verifyitProductinf"});
 

  }


  

  // ionViewDidLoad() {


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
  //       this.alertService.presentAlert('','Connecting with Server..');
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
      subHeader: `Enter your number for cash back
      Your cash back will credit in 2-5 working days after approval of review.`,
      message: '',
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
            if(alertData.mobile_number.length>9){

              console.log(alertData.mobile_number);
              this.mobile_number = alertData.mobile_number
              // data.push('mobile_number')
              this.trackingReview(data)
            }else{
              this.presentToast()
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Mobile number is not valid.',
      duration: 3000
    });
    toast.present();
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
}else if(data.key=='purchase online'){
this.trackingOnlinePurchase(element)
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
  trackingOnlinePurchase(element){
    // this.shortToken= window.localStorage.getItem('token')
    // let lastFourWord =this.shortToken.slice(-10)
    // let lastTentoken= lastFourWord
    // this.trackingData.meta_data.mobile_number = this.mobile_number
    let shareData={
    user_id:window.localStorage.getItem('userid'),
    tag_id:window.localStorage.getItem('tagId'),
    product_id:this.callgettagresult.product_id,
    device_id:'xxxx',
    otype : 'ONLINE_LINK_CLICK',
    // source_token:lastTentoken
  
  }
    this.apiSvc.reviewTracking(shareData).subscribe((res) => {
  
      // this.openInappBrowser(data)
      alert('tracking online done')
  
  
    }, err => {
      alert(JSON.stringify(err))
    }
    );
  }


  async openInappBrowser(element) {

    await Browser.open({ url: element.link ,windowName:'_self',toolbarColor:'	#FF0000'});
    Browser.addListener('browserPageLoaded',()=>{
      debugger
   alert('hello===========>')
    })
    setTimeout(function() { window.opener.location.href='http://redirect.address';
  }, 5000);
    
    //   const _this = this
  //   // this.browser = this.iab.create(element.link, "_blank", this.options);
  //   this.browser = this.iab.create(element.link, "_self", this.options);//charu
  //   this.browser.addEventListener('loadstop', function(){
  //     alert('hello');
  //     this.browser.close()
  //     // this.browser.executeScript({code: "(function() { alert(123); })()"});
  // })




  //  let myWindow= this.browser.on("loadstart").subscribe((event: InAppBrowserEvent) => {



  //     setInterval(function(){ 
      
  //       let event=  window.location.href
          
  //       myWindow.executeScript({
  //         code: "(function() { alert('hello'); })()"
  //     }



  //       if (event.includes("thankyou")) {
    
  //         alert('Review submitted succesfully')
    
  //       }
  //         alert("Hello"); }, 3000);

  //     // setInterval(function () {
  //       if (event.url.includes("thankyou")) {

  //         alert('Review submitted succesfully')

  // //       }
     

  // //   });
  //   this.browser.on("exit").subscribe(

  //     async data => {
     
  //       if (_this.routemessage == 'thankyou') {
  //         _this.trackingData.user_id = window.localStorage.getItem('userid')
  //         _this.trackingData.tag_id = window.localStorage.getItem('tagId');
  //         _this.trackingData.product_id = this.callgettagresult.product_id;
  //         _this.trackingData.device_id = "xxx"

  //         this.apiSvc.reviewTracking(_this.trackingData).subscribe((res) => {

  //         }, err => {
  //           alert(JSON.stringify(err))
  //         }
  //         );


  //         // _this.router.navigateByUrl('/verifyit-message')

  //       } else {

  //         // _this.router.navigateByUrl('/verifyit-account')
  //         // alert('Review not submitted.')
  //       }
  //     },

  //     err => {
  //       // alert(err);
  //     }
  //   );
  //   return true;
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

  async socialShare() {
    this.product_title = this.callgettagresult.product_name;
    this.brand = this.callgettagresult.brand;
    this.product_link= "https://nowverifycap.web.app?params="+window.localStorage.getItem('tagId')+'&source='+window.localStorage.getItem('token').slice(-10);

    // this.jsonToBeUsed.forEach(element => {
    //   if (element.key == "purchase online") {
    //     console.log(element);
    //     this.product_link = element.value[0].link;
    //   }
    // });
    let shareRet = await Share.share({
      title: this.product_title,
      text: "Hey, Checkout" + " from " + this.brand
     
      ,
      url: this.product_link,
      // dialogTitle: 'Share with buddies'
      
    });
    this.shareTracking()

    // let options: StreamingVideoOptions = {
    //   successCallback: () => { console.log('=======================>Video played==================>') },
    //   errorCallback: (e) => { console.log('Error streaming') },
    //   orientation: 'portrait',
    //   shouldAutoClose: true,
    //   controls: false
    // };
    // this.streamingMedia.playVideo('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', options);

    // console.log('kkkkkkk=================',this.brand_color)

    // this.socialSharing
    //   .share(
        // "Hey, Checkout" +
        // " " +
        // this.product_title +
        // " from " +
        // this.brand +
        // "." +
        // "\n",
        // "",
        // "",
        // this.product_link
    //   )
    //   .then(() => {
    //     console.log(
    //       "===============shared================== to whatsapp========"
    //     );
    //   })
    //   .catch(() => {
    //     console.log(
    //       "===============shared===========not======= to whatsapp========"
    //     );
    //   });
  }
  async navigateTomsgPage() {
    this.router.navigateByUrl('/verifyit-message')
  }
  shortToken
  shareTracking(){
  this.shortToken= window.localStorage.getItem('token')
  let lastFourWord =this.shortToken.slice(-10)
  let lastTentoken= lastFourWord
  this.trackingData.meta_data.mobile_number = this.mobile_number
  let shareData={
  user_id:window.localStorage.getItem('userid'),
  tag_id:window.localStorage.getItem('tagId'),
  product_id:this.callgettagresult.product_id,
  device_id:'xxxx',
  otype : 'SHARE_LINK_CLICK',
  source_token:lastTentoken

}
  this.apiSvc.reviewTracking(shareData).subscribe((res) => {

    // this.openInappBrowser(data)
    alert('tracking done')


  }, err => {
    alert(JSON.stringify(err))
  }
  );
  

  }



  private _addListenersToPlayerPlugin() {
    this._handlerPlay = this._videoPlayer.addListener('jeepCapVideoPlayerPlay', (data:any) => {
      console.log('Event jeepCapVideoPlayerPlay ', data);
      
    }, false);
    this._handlerPause = this._videoPlayer.addListener('jeepCapVideoPlayerPause', (data:any) => {
      console.log('Event jeepCapVideoPlayerPause ', data);
      
    }, false);
    this._handlerEnded = this._videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data:any) => {
      console.log('Event jeepCapVideoPlayerEnded ', data);
      
    }, false);
    this._handlerExit = this._videoPlayer.addListener('jeepCapVideoPlayerExit', async (data:any) => {
      console.log('Event jeepCapVideoPlayerExit ', data)
      
      }, false);
    this._handlerReady = this._videoPlayer.addListener('jeepCapVideoPlayerReady', async (data:any) => {
      console.log('Event jeepCapVideoPlayerReady ', data)
      console.log("testVideoPlayerPlugin testAPI ",this._testApi);
      console.log("testVideoPlayerPlugin first ",this._first);
      if(this._testApi && this._first) {
        // test the API
        this._first = false;
        console.log("testVideoPlayerPlugin calling isPlaying ");
        const isPlaying = await this._videoPlayer.isPlaying({playerId:"fullscreen"});
        console.log('const isPlaying ', isPlaying)
        this._apiTimer1 = setTimeout(async () => {
          const pause = await this._videoPlayer.pause({playerId:"fullscreen"});
          console.log('const pause ', pause)
          const isPlaying = await this._videoPlayer.isPlaying({playerId:"fullscreen"});
          console.log('const isPlaying after pause ', isPlaying)
          let currentTime = await this._videoPlayer.getCurrentTime({playerId:"fullscreen"});
          console.log('const currentTime ', currentTime);
          let muted = await this._videoPlayer.getMuted({playerId:"fullscreen"});
          console.log('initial muted ', muted);
          const setMuted = await this._videoPlayer.setMuted({playerId:"fullscreen",muted:!muted.value});
          console.log('setMuted ', setMuted);
          muted = await this._videoPlayer.getMuted({playerId:"fullscreen"});
          console.log('const muted ', muted);
          const duration = await this._videoPlayer.getDuration({playerId:"fullscreen"});
          console.log("duration ",duration);
          // valid for movies havin a duration > 25
          const seektime = currentTime.value + 0.5 * duration.value < duration.value -25 ? currentTime.value + 0.5 * duration.value
                          : duration.value -25;
          const setCurrentTime = await this._videoPlayer.setCurrentTime({playerId:"fullscreen",seektime:(seektime)});
          console.log('const setCurrentTime ', setCurrentTime);
          const play = await this._videoPlayer.play({playerId:"fullscreen"});
          console.log("play ",play);
          this._apiTimer2 = setTimeout(async () => {
            const setMuted = await this._videoPlayer.setMuted({playerId:"fullscreen",muted:false});
            console.log('setMuted ', setMuted);
            const setVolume = await this._videoPlayer.setVolume({playerId:"fullscreen",volume:0.5});
            console.log("setVolume ",setVolume);
            const volume = await this._videoPlayer.getVolume({playerId:"fullscreen"});
            console.log("Volume ",volume);
            this._apiTimer3 = setTimeout(async () => {
              const pause = await this._videoPlayer.pause({playerId:"fullscreen"});
              console.log('const pause ', pause);
              const duration = await this._videoPlayer.getDuration({playerId:"fullscreen"});
              console.log("duration ",duration);
              const volume = await this._videoPlayer.setVolume({playerId:"fullscreen",volume:1.0});
              console.log("Volume ",volume);
              const setCurrentTime = await this._videoPlayer.setCurrentTime({playerId:"fullscreen",seektime:(duration.value - 3)});
              console.log('const setCurrentTime ', setCurrentTime);
              const play = await this._videoPlayer.play({playerId:"fullscreen"});
              console.log('const play ', play);
            }, 10000);
          }, 10000);

        }, 5000);
      }
    }, false);

  }
  



}




