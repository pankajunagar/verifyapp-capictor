import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

// import { HomePage } from './home.page';
// import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { SurpriseModalComponent } from './surprisemodal.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AdsenseModule } from 'ng2-adsense';

const routes: Routes = [
  {
    path: '',
    component: SurpriseModalComponent
  }
];

@NgModule({
  entryComponents: [],
  imports: [

    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 7259870550,
    }),
    CommonModule,
    FormsModule,
    ApplicationPageModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    // BarcodeScanner
  ],
  declarations: [SurpriseModalComponent],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
})
export class SurprisePageModule { }
