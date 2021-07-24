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
// import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { ProjectSearchPage } from "../../pages/project-search/project-search.page";
import { WebView } from "@ionic-native/ionic-webview/ngx";
// import { translateService } from "src/app/common-services/translate/translate-service.service";
import { TranslateServiceService } from "src/app/common-services/translate_/translate-service.service";
// import { Utils } from "../../services/utils.service";
// import { IonicSelectableComponent } from "ionic-selectable";
// import { Camera, CameraResultType } from '@capacitor/camera';
// // import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

// import { Plugins, CameraResultType } from "@capacitor/core";
import { DomSanitizer } from "@angular/platform-browser";


import { NFC, Ndef } from "@ionic-native/nfc/ngx";

import { NailaService } from "../../services/naila.service";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { Utils } from "../../services/utils.service";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
// import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
// import { AlertController } from "@ionic/angular";
import { TellUsifyouBuyitComponent } from "../../modals/tellusifyoubuyit/tellusifyoubuyit.component";
import { CertificateModalComponent } from "../../modals/certificatemodal/certificatemodal.component";
// Userrole5modalComponent
import { Plugins } from "@capacitor/core";
import * as WebVPPlugin from "capacitor-video-player";
const { CapacitorVideoPlayer, Device } = Plugins;
const { Browser } = Plugins;
const Viewer = require('photo-sphere-viewer');

const { Camera } = Plugins;

@Component({
  selector: "app-panoimage",
  templateUrl: "./panoimage.component.html",
  styleUrls: ["./panoimage.component.scss"],
})
export class PanoimageComponent implements OnInit {
  productDetail;
  private _videoPlayer: any;
  private _apiTimer1: any;
  private _apiTimer2: any;
  private _apiTimer3: any;
  private _testApi: boolean = true;


  // private _videoPlayer: any;
  private _url: string;
  private _handlerPlay: any;
  private _handlerPause: any;
  private _handlerEnded: any;
  private _handlerReady: any;
  private _handlerExit: any;

  
  private _first: boolean = false;
  // private _apiTimer1: any;
  // private _apiTimer2: any;
  // private _apiTimer3: any;
  // private _testApi: boolean = true;
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
  async ngOnInit() {
    const info = await Device.getInfo();
    if (info.platform === "ios" || info.platform === "android") {
      this._videoPlayer = CapacitorVideoPlayer;
    } else {
      this._videoPlayer = WebVPPlugin.CapacitorVideoPlayer;
    }
    // define the video url
    this._url =
      "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
    // add listeners to the plugin
    this._addListenersToPlayerPlugin();
  }




  ionViewDidEnter(){
    
    this.showProductVideo('https://nowverityit-img.s3.ap-south-1.amazonaws.com/img/indigo/Indigo.mp4')
    // this._addListenersToPlayerPlugin();

  }	

  

  opena(){
     


    // this.apiSvc.getHtml('https://develop.nowverifyit.com/welcome/goodwyntea').subscribe(
    //   res => {
    //     this.panoramaimage
    //     // this.openInappBrowser(data)
    //     // alert(' online done')
    //   },
    //   err => {
    //     alert(JSON.stringify(err));
    //   }
    // );


    const viewer = new Viewer({
      container: document.querySelector('#viewer'),
      panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg'
    });
  }


  async showProductVideo(data) {
    const res: any = await this._videoPlayer.initPlayer({
      mode: "fullscreen",
      url: data,
      playerId: "fullscreen",
      componentTag: "app-panoimage"
    });
  }
  private _addListenersToPlayerPlugin() {
    this._handlerPlay = this._videoPlayer.addListener(
      "jeepCapVideoPlayerPlay",
      (data: any) => {
        // console.log('Event jeepCapVideoPlayerPlay ', data);
        // this.hasvideoPlay=true;
        // this.trackingVideoCompletion("VIDEO_LINK_CLICK");
      },
      false
    );
    this._handlerPause = this._videoPlayer.addListener(
      "jeepCapVideoPlayerPause",
      (data: any) => {
        console.log("Event jeepCapVideoPlayerPause ", data);
      },
      false
    );
    this._handlerEnded = this._videoPlayer.addListener(
      "jeepCapVideoPlayerEnded",
      async (data: any) => {
        console.log("Event jeepCapVideoPlayerEnded ", data);
        // this.hasvideoPlay=false;
        this.opena();
        // this.trackingVideoCompletion("VIDEO_PLAY_COMPLETE");

        // alert('<=========================ended=========================>')
      },
      false
    );
    this._handlerExit = this._videoPlayer.addListener(
      "jeepCapVideoPlayerExit",
      async (data: any) => {
        // this.hasvideoPlay=false;
        console.log("Event jeepCapVideoPlayerExit ", data);
      },
      false
    );
    this._handlerReady = this._videoPlayer.addListener(
      "jeepCapVideoPlayerReady",
      async (data: any) => {
        console.log("Event jeepCapVideoPlayerReady ", data);
        console.log("testVideoPlayerPlugin testAPI ", this._testApi);
        console.log("testVideoPlayerPlugin first ", this._first);
        if (this._testApi && this._first) {
          // test the API
          this._first = false;
          console.log("testVideoPlayerPlugin calling isPlaying ");
          const isPlaying = await this._videoPlayer.isPlaying({
            playerId: "fullscreen"
          });
          console.log("const isPlaying ", isPlaying);
          this._apiTimer1 = setTimeout(async () => {
            const pause = await this._videoPlayer.pause({
              playerId: "fullscreen"
            });
            console.log("const pause ", pause);
            const isPlaying = await this._videoPlayer.isPlaying({
              playerId: "fullscreen"
            });
            console.log("const isPlaying after pause ", isPlaying);
            let currentTime = await this._videoPlayer.getCurrentTime({
              playerId: "fullscreen"
            });
            console.log("const currentTime ", currentTime);
            let muted = await this._videoPlayer.getMuted({
              playerId: "fullscreen"
            });
            console.log("initial muted ", muted);
            const setMuted = await this._videoPlayer.setMuted({
              playerId: "fullscreen",
              muted: !muted.value
            });
            console.log("setMuted ", setMuted);
            muted = await this._videoPlayer.getMuted({
              playerId: "fullscreen"
            });
            console.log("const muted ", muted);
            const duration = await this._videoPlayer.getDuration({
              playerId: "fullscreen"
            });
            console.log("duration ", duration);
            // valid for movies havin a duration > 25
            const seektime =
              currentTime.value + 0.5 * duration.value < duration.value - 25
                ? currentTime.value + 0.5 * duration.value
                : duration.value - 25;
            const setCurrentTime = await this._videoPlayer.setCurrentTime({
              playerId: "fullscreen",
              seektime: seektime
            });
            console.log("const setCurrentTime ", setCurrentTime);
            const play = await this._videoPlayer.play({
              playerId: "fullscreen"
            });
            console.log("play ", play);
            this._apiTimer2 = setTimeout(async () => {
              const setMuted = await this._videoPlayer.setMuted({
                playerId: "fullscreen",
                muted: false
              });
              console.log("setMuted ", setMuted);
              const setVolume = await this._videoPlayer.setVolume({
                playerId: "fullscreen",
                volume: 0.5
              });
              console.log("setVolume ", setVolume);
              const volume = await this._videoPlayer.getVolume({
                playerId: "fullscreen"
              });
              console.log("Volume ", volume);
              this._apiTimer3 = setTimeout(async () => {
                const pause = await this._videoPlayer.pause({
                  playerId: "fullscreen"
                });
                console.log("const pause ", pause);
                const duration = await this._videoPlayer.getDuration({
                  playerId: "fullscreen"
                });
                console.log("duration ", duration);
                const volume = await this._videoPlayer.setVolume({
                  playerId: "fullscreen",
                  volume: 1.0
                });
                console.log("Volume ", volume);
                const setCurrentTime = await this._videoPlayer.setCurrentTime({
                  playerId: "fullscreen",
                  seektime: duration.value - 3
                });
                console.log("const setCurrentTime ", setCurrentTime);
                const play = await this._videoPlayer.play({
                  playerId: "fullscreen"
                });
                console.log("const play ", play);
              }, 10000);
            }, 10000);
          }, 5000);
        }
      },
      false
    );
  }
}
