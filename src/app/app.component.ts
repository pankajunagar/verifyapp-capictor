import { Component, OnInit, NgZone, AfterViewInit, HostListener } from "@angular/core";
// import { Device } from "@ionic-native/device/ngx";

import { Platform, NavController, LoadingController, AlertController, ToastController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { StorageService } from "./common-services/storage-service.service";
import { Storage } from "@ionic/storage";
import { RentalsUserService } from "./Rentals Management/services/rentals-user.service";
import { AlertServiceService } from "./common-services/alert-service.service";
import { BuildingUserService } from "./Building-Management/services/building-user.service";
import { Utils } from "./Rentals Management/services/utils.service";
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Console } from '@angular/core/src/console';
import { VerifyitAccountsPage } from './Rentals Management/pages/verifyitaccountspage/verifyitaccountspage';
import { NailaService } from './Rentals Management/services/naila.service';
import { SettingsService } from "./settings.service";
import { Plugins } from '@capacitor/core';
// import { MessagingService } from '../services/messaging.service';

const { Device } = Plugins;
declare var wkWebView: any;

import {
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { AutocloseOverlaysService } from "./Rentals Management/services/autoclose.service";
import { MessagingService } from "./services/messaging.service";

const { PushNotifications } = Plugins;

interface DeeplinkMatch {
  $myparam: string;
}
@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  userrole;

  selectedTheme: String = 'red-theme';


  public appPages = {
    name: "",

    phoneNumber: localStorage.getItem("phoneNumber"),
    pages: [
      //     {
      //   title: "Home",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/home.svg",
      //   userrole: 'default'
      // },
      {
        title: "Read NFC/QR",
        url: `verifyit-dashboard`,
        src: "/assets/imgs/whitenfc.png",
        userrole: 'default'
      },
      {
        title: "Write NFC/QR",
        url: `verifyit-dashboard`,
        src: "/assets/imgs/whitenfc.png",
        userrole: '2'
      },
      // {
      //   title: "Read QR",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/whiteqrcode.jpg",
      //   userrole: window.localStorage.getItem("userType")
      // },
      // {
      //   title: "Write QR",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/whiteqrcode.jpg",
      //   userrole: window.localStorage.getItem("userType")
      // },
      {
        title: "Account",
        url: `verifyit-account`,
        src: "assets/imgs/profile1.svg",
        userrole: "default"
      },
      // {
      //   title: 'Tickets',
      // url: `rentals-naila-ticket-page`,
      //   src: '/assets/imgs/business.svg'
      // },
      // {
      //   title: 'app-component.contact-us',
      // url: `-contact-us`,
      //   src: '/assets/icon/phone.png'
      // },
      // {
      //   title: 'Project ',
      // url: `-my-data-project`,
      //   src: '/assets/icon/phone.png'
      // },
      // {
      //   title: 'Bookings',
      //   url: `rentals-naila-beaut-booking-page`,
      //   src: '/assets/imgs/bookings.svg',
      //   userrole:'Beautician'
      // },
      // {
      //   title: 'Attendance',
      //   url: `rentals-naila-beaut-attendance-page`,
      //   src: '/assets/imgs/business.svg',
      //   userrole:'Beautician'


      {
        title: 'Rewards',
        url: `verifyit-rewards`,
        src: '/assets/imgs/offers.svg',
        userrole: 'default'

      },
      {
        title: 'Offers',
        url: `verifyit-offer`,
        src: '/assets/imgs/commerce-and-shopping.svg',
        userrole: 'default'

      },
      // {
      //   title: 'Log Out',
      //   // url: `rentals-naila-cart-page`,
      //   src: '/assets/imgs/logoutsearch.svg'
      // }
    ]
  };


  public appPages2 = {
    name: "",

    phoneNumber: localStorage.getItem("phoneNumber"),
    pages: [
      //     {
      //   title: "Home",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/home.svg",
      //   userrole: 'default'
      // },
      {
        title: "Read QR",
        url: `verifyit-dashboard`,
        src: "/assets/imgs/whiteqrcode.png",
        userrole: 'default'
      },
      {
        title: "Write QR",
        url: `verifyit-dashboard`,
        src: "/assets/imgs/whiteqrcode.png",
        userrole: '2'
      },
      // {
      //   title: "Read QR",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/whiteqrcode.jpg",
      //   userrole: window.localStorage.getItem("userType")
      // },
      // {
      //   title: "Write QR",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/whiteqrcode.jpg",
      //   userrole: window.localStorage.getItem("userType")
      // },
      {
        title: "Account",
        url: `verifyit-account`,
        src: "assets/imgs/profile1.svg",
        userrole: "default"
      },
      {
        title: 'Rewards',
        url: `verifyit-rewards`,
        src: '/assets/imgs/dollar.svg',
        userrole: 'default'

      },
      
      {
        title: 'Offers',
        url: `verifyit-offer`,
        src: '/assets/imgs/commerce-and-shopping.svg',
        userrole: 'default'

      },
      // {
      //   title: 'Tickets',
      // url: `rentals-naila-ticket-page`,
      //   src: '/assets/imgs/business.svg'
      // },
      // {
      //   title: 'app-component.contact-us',
      // url: `-contact-us`,
      //   src: '/assets/icon/phone.png'
      // },
      // {
      //   title: 'Project ',
      // url: `-my-data-project`,
      //   src: '/assets/icon/phone.png'
      // },
      // {
      //   title: 'Bookings',
      //   url: `rentals-naila-beaut-booking-page`,
      //   src: '/assets/imgs/bookings.svg',
      //   userrole:'Beautician'
      // },
      // {
      //   title: 'Attendance',
      //   url: `rentals-naila-beaut-attendance-page`,
      //   src: '/assets/imgs/business.svg',
      //   userrole:'Beautician'

      // },
      // {
      //   title: 'Log Out',
      //   // url: `rentals-naila-cart-page`,
      //   src: '/assets/imgs/logoutsearch.svg'
      // }
    ]
  };

  username = '';
  showMenulist;

  deferredPrompt: any;
  showButton = false;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }
  ngOnInit() {

    // this.requestPermission();
   
    // if (localStorage.getItem('addtohomescreen') !== '1') {
    //   setTimeout(() => {
    //     this.presentAlertConfirm();
    //   }, 5000)
    // }
    this.utils.LoadPage.subscribe(data => {
      if (window.localStorage.getItem("userType")) {
        this.userrole = window.localStorage.getItem("userType");
        this.username = window.localStorage.getItem("name");
        this.showMenulist = true;
        this.ionViewDidLoad()
      } else {
        this.showMenulist = false;
        this.ionViewDidLoad();
      }
    });

    if (!window.localStorage.getItem("userType")) {
      this.userrole = window.localStorage.setItem("userType", "1");
    }
    this.username = window.localStorage.getItem("name");
    this.userrole = window.localStorage.getItem("userType");
    this.initializeApp();
  }


  public appSrc;
  // options: PushOptions = {
  //   android: {},
  //   ios: {
  //   },
  // }
  // pushObject: PushObject = this.push.init(this.options);

  constructor(
    private zone: NgZone,
    private messagingService: MessagingService,
    protected deeplinks: Deeplinks,
    private nfc: NFC,
    private ndef: Ndef,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private device:Device,
    private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController,
    public translate: TranslateService,
    private storageService: StorageService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private rentalsUserService: RentalsUserService,
    private alertService: AlertServiceService,
    private buildingUserService: BuildingUserService,
    private autocloseOverlaysService:AutocloseOverlaysService,
    private utils: Utils,
    private verifyitservice: NailaService,
    private settings: SettingsService,
    private alertCtrl: AlertController
  ) // private push: Push
  {
    // this.listenForMessages();
    // this.requestPermission()

    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

    this.router.events.subscribe((event: any): void => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.autocloseOverlaysService.trigger();
        }
      }
    });
  }


  // async presentAlertConfirm() {
  //   const alert = await this.alertCtrl.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Add to home Screen',
  //     // message: 'Message <strong>text</strong>!!!',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Add',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //           localStorage.setItem('addtohomescreen', '1');
  //           this.addToHomeScreen();
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }


  // ionViewWillEnter(){
  //   this.toggleRole('');
  // }
  populatemenu = true;
  p = {
    userrole: ""
  };
  toggleRole(role, title) {
    // this.populatemenu=!this.populatemenu

    if (role == "2") {
      this.p.userrole = "1";
    } else if (role == "1") {
      this.p.userrole = "2";
    }
    // if (title != "Account") {

    //   this.utils.LoadPageOnrouteChange();
    // }else
    if (title == 'Read NFC/QR') {
    
      this.utils.menuTitle = 'Read NFC/QR'
      this.utils.LoadPageOnrouteChange();

    } else if (title == 'Write NFC/QR') {
      this.utils.menuTitle = 'Write NFC/QR'
      this.utils.LoadPageOnrouteChange();
    } else if (title == 'Write QR') {
      this.utils.menuTitle = 'Write NFC/QR'
      this.utils.LoadPageOnrouteChange();
    } else if (title == 'Read QR') {
    
      this.utils.menuTitle = 'Read NFC/QR'
      this.utils.LoadPageOnrouteChange();

    }


  }

  firstname;
  async ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.nfc
        .enabled()
        .then(resolve => {
          this.canNFC = true;

        })
        .catch(reject => {
          this.canNFC = false;

        });
    });



  }

  async presentLoading() {
    await this.loadingCtrl
      .create({
        spinner: "lines"
      })
      .then(loading => {
        loading.present();
      });
  }

  async routeForword(url) {
    await this.storageService.getDatafromIonicStorage("appSrc").then(val => {
      this.appSrc = val;
      console.log("-----------------", val);
      this.router.navigateByUrl(`${url}`);
      // this.router.navigateByUrl(`${this.appSrc}${url}`)
    });
  }
  canNFC = false;
  async initializeApp() {
    const device = await Device.getInfo();
    window.localStorage.setItem('device_id', device.uuid)
    // alert(device.uuid)
    console.log("device id=================>"+ device.uuid)

    if (!window.localStorage.getItem('token')) {

      window.localStorage.setItem('token', '');
      this.storageService.storeDataToIonicStorage('token', '');
    }

    await this.ionViewDidLoad()
    let isLoggedIn: string;
    this.platform.ready().then(async () => {

      this.setupDeeplinks()
      this.generateToken()
      // this.setupDeeplinks();


      // if (this.platform.is('ios')) {


      //   console.log('trueeeeeeeeeeeeeee====================================')
      //   wkWebView.injectCookie('http://www.nowverifyit.com/');
      //   console.log('trueeeeeeeeeeeeeee====================================')

      // }
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString("#ffffff");
      this._initTranslate();
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.redirectToHomeOrLogin(isLoggedIn);


      // await this.storageService.getDatafromIonicStorage('isLoggedIn').then(val => {
      //   isLoggedIn = val;
      //   console.log(typeof val);

      // })
      // await this.storageService.getDatafromIonicStorage('appSrc').then(val => {
      //   this.appSrc = val;
      // })
      // await isLoggedIn == 'true' ? this.navCtrl.navigateRoot('/rentals-naila-search-page') : this.navCtrl.navigateRoot('/login');
      // await isLoggedIn == 'true' ? this.navCtrl.navigateRoot(`/${this.appSrc}-naila-search-page`) : this.navCtrl.navigateRoot('/login');
      // if(isLoggedIn){

      //   // this.redirectToHomeOrLogin(isLoggedIn);
      // }
    });

    // this.pushNotificationInit()
  }
  redirectToHomeOrLogin(isLoggedIn) {
    window.localStorage.getItem("uid");
    const registereduser = window.localStorage.getItem("registereduser");
    if (window.localStorage.getItem("user_type") == "Beautician") {
      registereduser == "true"
        ? this.navCtrl.navigateRoot("/rentals-naila-beaut-booking-page")
        : this.navCtrl.navigateRoot("/login");
    } else if (window.localStorage.getItem("user_type") == "Customer") {
      registereduser == "true"
        ? this.navCtrl.navigateRoot("/rentals-naila-search-page")
        : this.navCtrl.navigateRoot("/login");
    }

    if (
      window.localStorage.getItem("cartitem") &&
      window.localStorage.getItem("cartitemcount")
    ) {
      this.utils.cartitem = JSON.parse(window.localStorage.getItem("cartitem"));
      this.utils.cartdata = window.localStorage.getItem("cartitemcount");
    }
  }
  // logout() {
  //   window.localStorage.clear()
  //   this.storage.clear()
  //   this.router.navigateByUrl('/login')
  // }

  async logOut() {
    await this.presentLoading();

    window.localStorage.clear();
    this.router.navigateByUrl("/login");
    await this.loadingCtrl.dismiss();

    //   this.storage.clear()
    //   this.router.navigateByUrl('/login')
    // let userId;
    // await this.storageService.getDatafromIonicStorage('user_id').then(val => {
    //   userId = val;
    // })
    // this.storageService.getDatafromIonicStorage('appSrc').then(val => {
    //   if (val == 'rentals') {
    //     this.rentalsUserService.getUserById(userId).subscribe(async data => {
    //       if (data.businessAppDevice.pushToken) {
    //         delete data.businessAppDevice
    //         console.log(data);
    //         this.updateUser(val, data)
    //       } else {
    //         await this.loadingCtrl.dismiss()
    //         window.localStorage.clear();
    //         await this.storageService.emptyStorage()
    //         this.navCtrl.navigateRoot('/login');
    //       }

    //     })
    //   } else if (val == 'building-management') {
    //     this.buildingUserService.getUserById(userId).subscribe(async data => {
    //       if (data.businessAppDevice.pushToken) {
    //         delete data.businessAppDevice
    //         console.log(data);
    //         this.updateUser(val, data)
    //       } else {
    //         await this.loadingCtrl.dismiss()
    //         window.localStorage.clear();
    //         await this.storageService.emptyStorage()
    //         this.navCtrl.navigateRoot('/login');
    //       }
    //     })
    //   }

    // })
    // window.localStorage.clear();
    // await this.storage.clear()
    // this.navCtrl.navigateRoot('/login');
  }

  async updateUser(val, data) {
    if (val == "rentals") {
      this.rentalsUserService.updateUser(data).subscribe(
        async (data: any) => {
          await this.loadingCtrl.dismiss();
          window.localStorage.clear();
          await this.storage.clear();
          this.navCtrl.navigateRoot("/login");
        },
        async err => {
          await this.loadingCtrl.dismiss();
          this.alertService.presentAlert("", "Error while logging out");

        }
      );
    } else if (val == "building-management") {
      this.buildingUserService.updateUser(data).subscribe(
        async (data: any) => {
          await this.loadingCtrl.dismiss();
          window.localStorage.clear();
          await this.storage.clear();
          this.navCtrl.navigateRoot("/login");
        },
        async err => {
          await this.loadingCtrl.dismiss();
          this.alertService.presentAlert("", "Error while logging out");
        }
      );
    }
  }

  private _initTranslate() {
    this.translate.setDefaultLang("en");
    this.translate.use("en"); // Set your language here
  }

  navigatetologinpage() {
    this.router.navigateByUrl("/login");
  }


  async setupDeeplinks() {
    this.deeplinks.route('/').subscribe(
      match => {
        console.log('Successfully matched route', JSON.stringify(match));
        console.log("=======================>")
        console.log(match.$args)
        console.log("=======================>")

        // Create our internal Router path by hand
        const internalPath = `/${match.$route}/${match.$args['slug']}`;

        // Run the navigation in the Angular zone
        this.zone.run(() => {
          this.router.navigateByUrl(internalPath);
        });
      },
      nomatch => {
        // nomatch.$link - the full link data
        console.error("Got a deeplink that didn't match", JSON.stringify(nomatch));
      }
    );

  }

  ngAfterViewInit() {
    this.platform.ready().then(async () => {
      // await this.initDeepLinking();
      // await this.setupDeeplinks()
    });
  }

  // private async initDeepLinking(): Promise<void> {
  //   if (this.platform.is('cordova')) {
  //     await this.initDeepLinkingBranchio();
  //   } else {
  //     await this.initDeepLinkingWeb();
  //   }
  // }

  // private async initDeepLinkingWeb(): Promise<void> {
  //   const myparam: string =
  //     this.platform.getQueryParam('$myparam') ||
  //     this.platform.getQueryParam('myparam') ||
  //     this.platform.getQueryParam('%24myparam');
  //   console.log('Parameter', myparam);
  // }

  // private async initDeepLinkingBranchio(): Promise<void> {
  //   try {
  //     const branchIo = window['Branch'];

  //     if (branchIo) {
  //       const data: DeeplinkMatch =
  //         await branchIo.initSession();

  //       if (data.$myparam !== undefined) {
  //         console.log('Parameter', data.$myparam);
  //         this.router.navigateByUrl('/verifyit-account')
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }


  generateToken() {
    let token = (window.localStorage.getItem('token'))
    if (!token.length) {
    this.verifyitservice.genToken().subscribe(
      async (data: any) => {
                 window.localStorage.setItem('token', data.data.token)
     
      },
      async err => {
        await this.loadingCtrl.dismiss();
        this.alertService.presentAlert("", "Error while logging out");
      }
    );
      }
  }


  pushNotificationInit(){
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        this.alertService.presentAlert("", 'Something went wrong in push notification registration')
      }
    });


    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        // alert('Push registration success, token: ' + token.value);
        console.log('=====================>')
        console.log('Push registration success, token: '+ token.value)
        console.log('=====================>')

      },
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        // this.router.navigateByUrl('/verifyit-product-info' )
        this.router.navigate(["/verifyit-product-info"], {
          queryParams: { brand: 'openquiz' },
        });
        // alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        // this.router.navigateByUrl('/verifyit-rewards')
        // alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }
  
// pwa push notification





listenForMessages() {
  
  this.messagingService.getMessages().subscribe(async (msg: any) => {
    const alert = await this.alertCtrl.create({
      header: msg.notification.title,
      subHeader: msg.notification.body,
      message: msg.data.info,
      buttons: ['OK'],
    });

    await alert.present();
  });
}

requestPermission() {
  this.messagingService.requestPermission().subscribe(
    async token => {
      const toast = await this.toastCtrl.create({
        message: 'Got your token',
        duration: 2000
      });
      alert(token)
      console.log(token)
      toast.present();
    },
    async (err) => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: err,
        buttons: ['OK'],
      });

      await alert.present();
    }
  );
}


async deleteToken() {
  this.messagingService.deleteToken();
  const toast = await this.toastCtrl.create({
    message: 'Token removed',
    duration: 2000
  });
  toast.present();
}

}
