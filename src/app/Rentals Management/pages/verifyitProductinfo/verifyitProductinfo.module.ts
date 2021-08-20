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
// import { QuizModalComponent2 } from 'src/app/quiz-modal2/quiz-modal.component';
import { HideHeaderDirective } from './../../../hide-header.directive';
import { WarrantycardComponent } from '../../modals/warrantycard/warrantycard.component';
import { PanoimageComponent } from '../../modals/panoimage/panoimage.component';
import { QuizModalComponent2 } from 'src/app/quiz-modal2/quiz-modal.component';



const routes: Routes = [
  {
    path: '',
    component: VerifyitProductInfoPage
  }
];

@NgModule({
  entryComponents: [CreateNoticeComponent,TellUsifyouBuyitComponent,WarrantycardComponent,PanoimageComponent, CertificateModalComponent,Userrole5modalComponent,UserroleinfoModalComponent,QuizModalComponent2],
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
    TellUsifyouBuyitComponent,WarrantycardComponent,PanoimageComponent, CertificateModalComponent,Userrole5modalComponent,UserroleinfoModalComponent
  ],
  declarations: [PanoimageComponent,WarrantycardComponent,VerifyitProductInfoPage,TellUsifyouBuyitComponent,CertificateModalComponent,Userrole5modalComponent,HideHeaderDirective,
    UserroleinfoModalComponent,QuizModalComponent2]
  //declarations: [VerifyitProductInfoPage,TellUsifyouBuyitComponent,WarrantycardComponent,PanoimageComponent, CertificateModalComponent,Userrole5modalComponent,UserroleinfoModalComponent,QuizModalComponent2]
})
export class VerifyitProductInfoPageModule { }
