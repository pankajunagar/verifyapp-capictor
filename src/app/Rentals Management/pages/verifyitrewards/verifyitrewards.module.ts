import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { NailasearchPage } from './nailasearchpage';
import { Verifyitrewards } from './verifyitrewards';
import { RewardmodalfirstComponent } from '../../modals/rewardmodalfirst/rewardmodalfirst.component';
// import { ScratchmodalComponent } from '../../modals/scratchmodal/scratchmodal.component';


const routes: Routes = [
  {
    path: '',
    component: Verifyitrewards
  }
];


@NgModule({
  entryComponents: [CreateNoticeComponent,RewardmodalfirstComponent],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationPageModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    // BarcodeScanner,
    RewardmodalfirstComponent
    
  ],
  declarations: [Verifyitrewards,RewardmodalfirstComponent]
})
export class VerifyitRewardsModule { }

