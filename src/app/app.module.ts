import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Push } from '@ionic-native/push/ngx';
import { MainAppSetting } from './conatants/MainAppSetting';
// import { BuildingManagementModule } from './Building-Management/building-management.module';
import { RentalsManagementModule } from './Rentals Management/rental-management.module';
import { UserSearchPipe } from './Rentals Management/pipes/user-search-pipe';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader"
import { StorageService } from './common-services/storage-service.service';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { OrgModalComponent } from './common-components/org-modal/org-modal.component';
import { CountrycodemodalComponent } from './login/countrycodemodal/countrycodemodal.component';
import { FilterPipe } from './login/countrycodemodal/Filter.pipe';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { Device } from '@ionic-native/device/ngx'
import { OrderModule } from 'ngx-order-pipe'
import { PictureComponent } from './common-components/picture/picture.component';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ApprovalpopupComponent } from './Rentals Management/modals/approvalpopup/approvalpopup.component';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// import { VideoPlayer } from '@ionic-native/video-player/ngx';
// import { ApprovalpopupComponent } from '../../modals/approvalpopup/approvalpopup.component';
// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { ScratchmodalComponent } from './Rentals Management/modals/scratchmodal/scratchmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    OrgModalComponent,ScratchmodalComponent,
    CountrycodemodalComponent,
    PictureComponent,
    FilterPipe,
    ApprovalpopupComponent
  ],
  entryComponents: [OrgModalComponent,ScratchmodalComponent, CountrycodemodalComponent, PictureComponent,ApprovalpopupComponent],
  imports: [
    // NgxQRCodeModule,
    IonicSelectableModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AvatarModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md'
    }),
    OrderModule,
    AppRoutingModule,
    // BuildingManagementModule,
    RentalsManagementModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: true })
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
  ],
  providers: [
    InAppBrowser,
    SocialSharing,
    Deeplinks,
    QRScanner,
    Camera,
    // VideoPlayer,
    Screenshot,
    StreamingMedia,
    Geolocation,
    BarcodeScanner,
    Ndef,
    StatusBar,
    SplashScreen,
    MainAppSetting,
    FileTransfer,
    FileTransferObject,
    HTTP,
    NFC,
    StorageService,
    Push,
    Device,
    WebView,
    FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
