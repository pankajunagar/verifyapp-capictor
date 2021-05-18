import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { VerifyitProductInfoPage } from './verifyitProductinfo.page';
import { TellUsifyouBuyitComponent } from '../../modals/tellusifyoubuyit/tellusifyoubuyit.component';
import { CertificateModalComponent } from '../../modals/certificatemodal/certificatemodal.component';
import { Userrole5modalComponent } from '../../modals/userrole5modal/userrole5modal.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { UserroleinfoModalComponent } from '../../modals/userroleinfomodal/userroleinfomodal.component';
import { QuizModalComponent } from 'src/app/quiz-modal/quiz-modal.component';



const routes: Routes = [
  {
    path: '',
    component: VerifyitProductInfoPage
  }
];

@NgModule({
  entryComponents: [CreateNoticeComponent,TellUsifyouBuyitComponent,CertificateModalComponent,Userrole5modalComponent,UserroleinfoModalComponent,QuizModalComponent],
  imports: [
    CommonModule,
    IonicSelectableModule,
    FormsModule,
    ApplicationPageModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    // BarcodeScanner
    TellUsifyouBuyitComponent,CertificateModalComponent,Userrole5modalComponent,UserroleinfoModalComponent
  ],
  declarations: [VerifyitProductInfoPage,TellUsifyouBuyitComponent,CertificateModalComponent,Userrole5modalComponent,UserroleinfoModalComponent,QuizModalComponent]
})
export class VerifyitProductInfoPageModule { }
