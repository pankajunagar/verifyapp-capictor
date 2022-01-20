import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from '../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { ProjectSearchPage } from '../../pages/project-search/project-search.page';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { translateService } from 'src/app/common-services/translate/translate-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Utils } from '../../services/utils.service';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'
import { Browser } from '@capacitor/browser';
import * as confetti from 'canvas-confetti';
import { NailaService } from '../../services/naila.service';

@Component({
  selector: 'app-surpisemodalpage',
  templateUrl: './surpisemodalpage.html',
  styleUrls: ['./surpisemodalpage.scss'],
})
export class surpiseModalPage implements OnInit {

  hasLogin
  user_name=''
  upi_detail
  flipmodal:any;
  usernotwon:any;
    notice: any = {
      discussionBelongsTo: 'Project',
      discussionType: 'Notice',
      raisedByEmployee: true,
    };
    flag: boolean = false;
    public images: any[] = [];
    hasLoginData=''
    constructor(
      private navCtrl:NavController,
      private modalController: ModalController,
      private utils:Utils,
      private loadingCtrl: LoadingController,
      private noticeService: NoticeService,
      private apiSvc:NailaService,
      private router: Router,
      // private toast:ToastController,
      private alertCtrl:AlertController,
      private alertService: AlertServiceService,
      private route: ActivatedRoute,
      public webView: WebView,
      public transService: TranslateServiceService,
      private actionSheet: ActionSheetController
    ) {

     
      this.hasLogin=false;
  
  this.user_name= window.localStorage.getItem('name')
      this.hasLoginData=window.localStorage.getItem('user_upi')
  
      if(window.localStorage.getItem('user_upi')){
        this.showALgomessage=true;
        this.notShowPhoneInput=false
  
  
      }

  
     }
    royaltyData
    cashbackAmount
    subscription2
    ngOnInit() { 
// if(window.localStorage.getItem('user_upi')){
//   debugger
//   if(this.utils.winLossAlgoData.win==1){
  
//     this.frame();
//   }
// }

      // if(window.localStorage.getItem('user_upi')){

      // }else{

      // }


      // this.subscription2 = this.utils.celebration.subscribe((data) => {

        if((this.utils.winLossAlgoData.win==1) && (window.localStorage.getItem('user_upi'))){
  
          this.frame();
        }

      // });


  
      // $('head').append('<script async src="assets/js/search.js"></script>');
  
  
      this.upi_detail=''
  
      this.flipmodal=true
  
      this.utils.flipsurprise_modal.subscribe(data => {
  
  
        // this.checkWinnerStatus()
  
      this.flipmodal =false
  
  
      })
  
      // this.createNewScratchCard()
      this.royaltyData=this.utils.royaltyData
      if(window.localStorage.getItem('name')){
        this.hasLogin=true;
      }
  
      // this.cashbackAmount=this.utils.cashbackAmount
  



    }
  
  
    ionViewDidEnter(){


   
  
  
      console.log('===============================')
  
      // this.flipsurpriseModal =this.utils.flipsurpriseModal
  
      // console.log(this.flipsurpriseModal)
      console.log('===============================')
  
  
    }
  
    async presentLoading() {
      this.loadingCtrl.create({
        spinner: "lines"
  
      }).then(loading => {
        loading.present();
      });
    }
    async closeModal() {
      
      // this.router.navigate(['/login'], { queryParams: { reg: 'regon' }})
      // this.openInappBrowser()
      this.navCtrl.pop();

      await this.modalController.dismiss();
    }
  
  
  
    redeemNow(){
      // alert('Coming soon.')
      this.presentAlertConfirm();
      // this.alertService.presentAlert('Coming soon','Login to secure your loyalty point.')
    }
  
  
    async presentAlertConfirm() {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        // header: 'Confirm!',
        message: 'Coming soon.',
        buttons: [
          {
            text: 'Skip',
            role: 'cancel',
            handler: () => {
              console.log('Confirm Okay');
              this.modalController.dismiss();
            }
          },
          {
            
            text: 'Login to secure points.',
            // cssClass: 'secondary',
            handler: (blah) => {
              this.router.navigateByUrl('/login')
              this.modalController.dismiss();
            }
          },
        ]
      });
  
      await alert.present();
    }
  
    LoginNow(){
      this.modalController.dismiss();
      this.router.navigateByUrl('/login')
    }
    // createNewScratchCard() {
    //   const scContainer = document.getElementById('js--sc--container')
    //   const sc = new ScratchCard('#js--sc--container', {
    //     scratchType: SCRATCH_TYPE.CIRCLE,
    //     // containerWidth: 200,//scContainer.offsetWidth,
    //     // containerHeight: 200,
    //     imageForwardSrc: 'assets/scratch.png',
    //     //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
    //     // htmlBackground: '<div class="cardamountcss"><div class="won-amnt">  Hurray! <br>You have won Rs. 20 Cashback <br> Head to your Rewards page and claim your cashback.</div><div class="won-text"><br> <b></b>  </div></div>',
  
  
  
    //     htmlBackground: '<div class="cardamountcss"><div class="won-amnt">  Hurray! <br>you won 10% discount coupon on FirstCare products. <br> <b> Coupon code: BABYCARE2021</b> </div><div > <br> <small></small></div></div>',
    //     clearZoneRadius: 40,
    //     nPoints: 30,
    //     pointSize: 4,
    //     callback: () => {
    //       console.log('Now the window will reload!')
    //     }
    //   })
    //   // Init
    //   sc.init();
      
    // }
    async openInappBrowser() {
      
      await Browser.open({
        url: 'https://buddsbuddy.com/buddsbuddy-cucumber-based-skincare-baby-wet-wipes-80-pieces.html',
        windowName: "_blank",
        toolbarColor: "	#FF0000"
      });
    }
  
  
    socialShare(){
      this.utils.shareProduct();
      this.navCtrl.pop();
    }
   
    showALgomessage=false;
    notShowPhoneInput=true;
    submitUPI(){
      if(this.utils.winLossAlgoData.win==1){
  
        this.frame();
      }
  
      this.showALgomessage=true
      this.utils.user_upi= this.upi_detail
      window.localStorage.setItem('user_upi',this.upi_detail)
      this.utils.user_name=this.user_name
      this.utils.submitUpi();
      this.notShowPhoneInput=false

    }
  
  
    async openLink(data){
      await Browser.open({
        url: data,
        windowName: "_blank",
        toolbarColor: "	#FF0000",
      });
  
      Browser.addListener("browserFinished", () => {
        // this.presentToast("Review submitted successfully.");
      });
      Browser.addListener("browserPageLoaded", () => {
        // ;
        // alert("hello===========>");
        // console.log("hello===========>")
      });
      // this.closeModal();
      this.navCtrl.pop();
    }
  
    msg
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
    trackingReview() {
      const _this = this;
     
        // this.trackingLinks(data)
        _this.trackingData.user_id = window.localStorage.getItem("userid");
        _this.trackingData.tag_id = window.localStorage.getItem("tagId");
        _this.trackingData.product_id = this.utils.callgettagresult.product_id;
        (_this.trackingData.device_id = window.localStorage.getItem("device_id")),
          // _this.trackingData.mobile_number = this.mobile_number
          (_this.trackingData.otype = "REVIEW_LINK_CLICK");
  
        _this.trackingData.meta_data.mobile_number = '';
        this.apiSvc.reviewTracking(_this.trackingData).subscribe(
          //**charu Start */
          (res: any) => {
            if (res) {
              this.msg = `Congratualtions! You have been awarded Loaylty Point from the Brand ${res.data.brand} `;
              // this.msg = `Congratualtions! You have been awarded ${res.data.loyalty} Loaylty Point from the Brand ${res.data.brand} `;
              // this.presentToast(this.msg);
              // this.openInappBrowser(data);
            }
          },
          //**charu Start */
          (err) => {
            alert(JSON.stringify(err));
          }
        );
      
    }
  
    frame() {
      var myConfetti = confetti.create(document.getElementById('canvas'), {
        resize: true,
        useWorker: true
      });
  
      myConfetti({
        particleCount: 400,
        spread: 200,
        angle: 135,
        origin: { x: 0 },
      });
      
  
      var myConfetti2 = confetti.create(document.getElementById('canvas2'), {
        resize: true,
        useWorker: true
      });
  
      myConfetti2({
        particleCount: 400,
        spread: 200,
        angle: 45,
        origin: { x: 1 },
      });
  
    }
  
  
    closeModalPage(){
      this.navCtrl.pop();
    }
  
}
