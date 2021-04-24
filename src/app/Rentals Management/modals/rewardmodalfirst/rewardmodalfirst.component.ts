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

@Component({
  selector: 'app-rewardmodalfirst',
  templateUrl: './rewardmodalfirst.component.html',
  styleUrls: ['./rewardmodalfirst.component.scss'],
})
export class RewardmodalfirstComponent implements OnInit {

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
  ) { }
  royaltyData
  ngOnInit() { 
    this.royaltyData=this.utils.royaltyData
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
}



