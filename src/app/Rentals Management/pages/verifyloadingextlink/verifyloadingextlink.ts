import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { NailaService } from '../../services/naila.service';

import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-verifyloadingextlink',
  templateUrl: './verifyloadingextlink.html',
  styleUrls: ['./verifyloadingextlink.scss'],
})


export class VerifyloadingextlinkPage  {

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



  constructor(private alertController:AlertController,
    private apiSvc:NailaService
  
    ) {




    }
  ngOnInit() {
    const _this = this;
      _this.trackingData.user_id = window.localStorage.getItem("userid");
      _this.trackingData.tag_id = window.localStorage.getItem("tagId");
      (_this.trackingData.device_id = window.localStorage.getItem("device_id")),
        (_this.trackingData.otype = "NOTIFICATION_CLICK");

      this.apiSvc.reviewTracking(_this.trackingData).subscribe(
        (res: any) => {
          this.openInappBrowser()
        },
        (err) => {
          alert(JSON.stringify(err));
        }
      );
  

  }




  async openInappBrowser() {
    
    await Browser.open({
      url: 'https://www.instagram.com/p/CWBCMGklcLo/',
      windowName: "_self",
      toolbarColor: "	#FF0000"
    });
  }



  
}
