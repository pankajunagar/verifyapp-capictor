import { Router, ActivatedRoute } from "@angular/router";
import { NoticeService } from "../../services/notice.service";
import {
  ModalController,
  LoadingController,
  ActionSheetController,
  AlertController,
  ToastController,
  PopoverController,
} from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { ProjectSearchPage } from "../../pages/project-search/project-search.page";
import { WebView } from "@ionic-native/ionic-webview/ngx";
// import { translateService } from "src/app/common-services/translate/translate-service.service";
import { TranslateServiceService } from "src/app/common-services/translate_/translate-service.service";
import { Utils } from "../../services/utils.service";
// import { IonicSelectableComponent } from "ionic-selectable";
// import { Camera, CameraResultType } from '@capacitor/camera';
// // import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer } from "@angular/platform-browser";

// const { Camera } = Plugins;

@Component({
  selector: "app-warrantycard",
  templateUrl: "./warrantycard.component.html",
  styleUrls: ["./warrantycard.component.scss"],
})
export class WarrantycardComponent implements OnInit {
  productDetail;
  constructor(
    private modalController: ModalController,
    private utils: Utils,
    private toast: ToastController,
    private sanitizer:DomSanitizer,
    // private camera: Camera,
    private loadingCtrl: LoadingController,
    public popoverController: PopoverController,
    private route: ActivatedRoute,
    public webView: WebView,
    public transService: TranslateServiceService
  ) {
    this.productDetail = {
      name: this.utils.warrantyInformation.product_name,
      serial_number: this.utils.warrantyInformation.serial_number,
      product_image: this.utils.warrantyInformation.img1,
      description: this.utils.warrantyInformation.Description
    };
  }

  //  options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }


  royaltyData;
  ngOnInit() {}
  async presentLoading() {
    this.loadingCtrl
      .create({
        spinner: "lines",
      })
      .then((loading) => {
        loading.present();
      });
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: "Your coupon has been deactivated.",
      duration: 3000,
    });
    toast.present();
  }
  warranty_image;
  product_receipt_image;
  async takePicture(data) {
    if(data=='product_receipt_image'){

      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
      });
      console.log(image);
      this.product_receipt_image=(image.webPath)
    }else{
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
      });
      console.log(image);
      this.warranty_image= (image.webPath)

    }
    }

  step1 = true;
  step2 = false;
  step3 = false;

  toggle1() {
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }
  toggle2() {
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
  }

  toggle3() {
    this.step1 = false;
    this.step2 = false;
    this.step3 = true;
  }
}
