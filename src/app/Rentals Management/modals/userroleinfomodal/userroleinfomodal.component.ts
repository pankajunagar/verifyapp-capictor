import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from '../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { ProjectSearchPage } from '../../pages/project-search/project-search.page';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { translateService } from 'src/app/common-services/translate/translate-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Utils } from '../../services/utils.service';
import { IonicSelectableComponent } from 'ionic-selectable';
// import { PopoverComponent } from '../../component/popover/popover.component';

// import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'
// import { userrole5modalComponent } from '../../modals/userrole5modal/userrole5modal.component';
class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'app-userroleinfomodal',
  templateUrl: './userroleinfomodal.component.html',
  styleUrls: ['./userroleinfomodal.component.scss'],
})
export class UserroleinfoModalComponent implements OnInit {
  port1
hasLogin
dealer
  notice: any = {
    discussionBelongsTo: 'Project',
    discussionType: 'Notice',
    raisedByEmployee: true,
  };
  flag: boolean = false;
  public images: any[] = [];
  ports: Port[
    
  ];
  port: Port;
  constructor(
    private modalController: ModalController,
    private utils:Utils,
    private toast:ToastController,
    private loadingCtrl: LoadingController,
    public popoverController: PopoverController,
    private noticeService: NoticeService,
    private router: Router,
    private alertCtrl:AlertController,
    private alertService: AlertServiceService,
    private route: ActivatedRoute,
    public webView: WebView,
    public transService: TranslateServiceService,
    private actionSheet: ActionSheetController
  ) {
    this.dealer={
      name:window.localStorage.getItem('dealerName')
    }
    if(window.localStorage.getItem('dealerName')){

      this.port1={
        id: window.localStorage.getItem('dealerId'), 
        name:window.localStorage.getItem('dealerName'), 
      }
    }else{
      this.port1={
        id: 1, 
        name: "Sandeep"}
    }

    this.hasLogin=false
    this.ports = [
      { id: 1, name: 'Sandeep' },
      { id: 2, name: 'Smit' },
      { id: 3, name: 'Seikh Jarah' },
      { id: 4, name: 'Hamas' },
      { id: 5, name: 'Navjot' },
      { id: 6, name: 'Israel' },
      
    ];
   }
  royaltyData
  ngOnInit() { 
    // this.createNewScratchCard()
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
    await this.modalController.dismiss();
  }



  redeemNow(){
    // alert('Coming soon.')
    // this.presentAlertConfirm();
    // this.alertService.presentAlert('Coming soon','Login to secure your loyalty point.')
  }


  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      // header: 'Confirm!',
      message: 'Are you sure you want to deactivate the coupon?',
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
          
          text: 'Deactivate',
          // cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast()
            this.router.navigateByUrl('/verifyit-dashboard')
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
  //     htmlBackground: '<div class="cardamountcss"><div class="won-amnt">30</div><div class="won-text">Points<br>Won!</div></div>',
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

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
    window.localStorage.setItem('dealerName',event.value.name)
    window.localStorage.setItem('dealerId',event.value.id)

    
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Your coupon has been deactivated.',
      duration: 3000
    });
    toast.present();
  }

  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: ,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }


  
  
}



