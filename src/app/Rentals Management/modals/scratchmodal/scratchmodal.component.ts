import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { ProjectSearchPage } from '../../pages/project-search/project-search.page';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { translateService } from 'src/app/common-services/translate/translate-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Utils } from '../../services/utils.service';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'
import { Browser } from '@capacitor/browser';
import {
  InAppBrowser,
  InAppBrowserOptions,
  InAppBrowserEvent
} from "@ionic-native/in-app-browser/ngx";
// import { ScratchmodalComponent } from '../../modals/scratchmodal/scratchmodal.component';
@Component({
  selector: 'app-scratchmodal',
  templateUrl: './scratchmodal.component.html',
  styleUrls: ['./scratchmodal.component.scss'],
})
export class ScratchmodalComponent implements OnInit {
hasLogin
  notice: any = {
    discussionBelongsTo: 'Project',
    discussionType: 'Notice',
    raisedByEmployee: true,
  };
  flag: boolean = false;
  public images: any[] = [];

  constructor(
    private modalController: ModalController,
    private utils:Utils,
    private loadingCtrl: LoadingController,
    private noticeService: NoticeService,
    private router: Router,
    private alertCtrl:AlertController,
    private alertService: AlertServiceService,
    private route: ActivatedRoute,
    public webView: WebView,
    public transService: TranslateServiceService,
    private actionSheet: ActionSheetController
  ) {
    this.hasLogin=false
   }
  royaltyData
  ngOnInit() { 
    this.createNewScratchCard()
    this.royaltyData=this.utils.royaltyData
    if(window.localStorage.getItem('name')){
      this.hasLogin=true;
    }
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
  createNewScratchCard() {
    const scContainer = document.getElementById('js--sc--container')
    const sc = new ScratchCard('#js--sc--container', {
      scratchType: SCRATCH_TYPE.CIRCLE,
      // containerWidth: 200,//scContainer.offsetWidth,
      // containerHeight: 200,
      imageForwardSrc: 'assets/scratch.png',
      //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
      // htmlBackground: '<div class="cardamountcss"><div class="won-amnt">  Hurray! <br>You have won Rs. 20 Cashback <br> Head to your Rewards page and claim your cashback.</div><div class="won-text"><br> <b></b>  </div></div>',



      htmlBackground: '<div class="cardamountcss"><div class="won-amnt">  Hurray! <br>you won 10% discount coupon on FirstCare products. <br> <b> Coupon code: BABYCARE2021</b> </div><div > <br> <small></small></div></div>',
      clearZoneRadius: 40,
      nPoints: 30,
      pointSize: 4,
      callback: () => {
        console.log('Now the window will reload!')
      }
    })
    // Init
    sc.init();
    
  }
  async openInappBrowser() {
    
    await Browser.open({
      url: 'https://buddsbuddy.com/buddsbuddy-cucumber-based-skincare-baby-wet-wipes-80-pieces.html',
      windowName: "_blank",
      toolbarColor: "	#FF0000"
    });
  }

}



