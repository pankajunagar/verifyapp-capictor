import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { NailaService } from '../../services/naila.service';

import { Browser } from '@capacitor/browser';
import { Utils } from '../../services/utils.service';
@Component({
  selector: 'app-verifyloadingextlink',
  templateUrl: './verifyloadingextlink.html',
  styleUrls: ['./verifyloadingextlink.scss'],
})


export class VerifyloadingextlinkPage  {

  trackingData = {
    user_id: "",
    tag_id: "",
    not_id:"",
    product_id: "",
    device_id: "",
    otype: "",
    meta_data: {
      mobile_number: "",
      not_id:""
    },
  };



  constructor(private alertController:AlertController,
    private apiSvc:NailaService,
    private utils:Utils
  
    ) {




    }
  ngOnInit() {
    const _this = this;
      _this.trackingData.user_id = window.localStorage.getItem("userid");
      _this.trackingData.not_id=this.utils.notification_id;

      _this.trackingData.meta_data.not_id=this.utils.notification_id;
      _this.trackingData.tag_id = window.localStorage.getItem("tagId");
      (_this.trackingData.device_id = window.localStorage.getItem("device_id")),
        (_this.trackingData.otype = "NOTIFICATION_CLICK");

      this.apiSvc.reviewTracking(_this.trackingData).subscribe(
        (res: any) => {
          let result=res
          this.openInappBrowser(result.data.redirect_link)
        },
        (err) => {
          alert(JSON.stringify(err));
        }
      );
  

  }




  async openInappBrowser(data) {
    // alert(data)
    await Browser.open({
      url: data,
      windowName: "_self",
      toolbarColor: "	#FF0000"
    });
  }



  
}
