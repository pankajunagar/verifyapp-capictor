import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx'
import * as moment from 'moment';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { translateService } from 'src/app/common-services/translate/translate-service.service';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
import { Storage } from '@ionic/storage';
import { RentalsUserService } from '../../services/rentals-user.service';
import { Device } from '@ionic-native/device/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ViewChild } from '@angular/core';
import { NailaService } from '../../services/naila.service';
import { RewardmodalfirstComponent } from '../../modals/rewardmodalfirst/rewardmodalfirst.component';
import { Utils } from '../../services/utils.service';
// import { Rewardmodal1Component } from '../../modals/rewardmodal1/rewardmodal1.component';
// import { Slides } from 'ionic-angular';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'
import { ScratchmodalComponent } from '../../modals/scratchmodal/scratchmodal.component';

@Component({
  selector: 'app-verifyitrewards',
  templateUrl: './verifyitrewards.html',
  styleUrls: ['./verifyitrewards.scss'],
})


export class Verifyitrewards {




  constructor(private nailaservice: NailaService, private modalController:ModalController,
    private utils:Utils) {

  }
  searchTerm
  listbanner:any;


  ngOnInit() {

    // this.scratchModal()

    // this.createNewScratchCard();

    let data;
    this.nailaservice.getLoyaltyPointByuser(data).subscribe(data => {
    this.listbanner=data;
    // this.items=this.listbanner.data
      // this.listbanner.data.forEach(element => {
        
      //   element.name= element.product_name
      // });
      let obj = {}
      this.listbanner.data.forEach((item)=>{
        if(obj[item.brand]){
             obj[item.brand].loyalty_points = Number(obj[item.brand].loyalty_points) + Number (item.loyalty_points)
        }else{
            obj[item.brand] = item
        }
      })
      this.items=(Object.values(obj))
    })


    

  }
  items=[]
  setFilteredItems() {
    this.items = this.listbanner.data;
    this.items = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }


  async presentModal2(data) {
    debugger
    this.utils.royaltyData=data
    let modal = await this.modalController.create({
      component: RewardmodalfirstComponent,
      cssClass: "custome-refer-modal",
    });
    return await modal.present();
  }


  async scratchModal() {
    debugger
    // this.utils.royaltyData=data
    let modal = await this.modalController.create({
      component: ScratchmodalComponent,
      cssClass: "scratch-modal",
    });
    return await modal.present();
  }

  

  createNewScratchCard() {
    const scContainer = document.getElementById('js--sc--container')
    const sc = new ScratchCard('#js--sc--container', {
      scratchType: SCRATCH_TYPE.CIRCLE,
      containerWidth: 300,//scContainer.offsetWidth,
      containerHeight: 300,
      imageForwardSrc: 'assets/scanqrcode.png',
      //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
      htmlBackground: '<div class="cardamountcss"><div class="won-amnt">30</div><div class="won-text">Points<br>Won!</div></div>',
      clearZoneRadius: 40,
      nPoints: 30,
      pointSize: 4,
      callback: () => {
        console.log('Now the window will reload !')
      }
    })
    // Init
    sc.init();
  }
}