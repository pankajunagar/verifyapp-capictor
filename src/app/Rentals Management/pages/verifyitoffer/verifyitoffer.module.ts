import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { NailasearchPage } from './nailasearchpage';
// import { verifyitOffer } from './verifyitOffer';
// import {  } from '../../modals/rewardmodalfirst/rewardmodalfirst.component';
// import { ScratchmodalComponent } from '../../modals/scratchmodal/scratchmodal.component';
import { verifyitOffer } from './verifyitoffer';


const routes: Routes = [
  {
    path: '',
    component: verifyitOffer
  }
];


@NgModule({
  entryComponents: [CreateNoticeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationPageModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    // BarcodeScanner,
  
    
  ],
  declarations: [verifyitOffer]
})
export class VerifyitOfferModule { }

