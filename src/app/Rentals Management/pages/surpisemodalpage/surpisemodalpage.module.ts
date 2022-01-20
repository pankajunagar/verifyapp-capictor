import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { surpiseModalPage } from './surpisemodalpage';
import { SurpriseModalComponent } from '../../modals/removemodal/surprisemodal.component';

// import { surpiseModalPage } from './notice-create.page';

const routes: Routes = [
  {
    path: '',
    component: surpiseModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [surpiseModalPage,SurpriseModalComponent],
  entryComponents: [SurpriseModalComponent],
  providers:[SurpriseModalComponent]
})
export class surpiseModalPageModule {}
