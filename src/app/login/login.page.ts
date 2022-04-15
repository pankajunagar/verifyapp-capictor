

import { NailaService } from './../Rentals Management/services/naila.service';
import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ModalController,
  LoadingController,
  AlertController,
  MenuController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import * as _ from 'lodash';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';
import { CountrycodemodalComponent } from './countrycodemodal/countrycodemodal.component';
import { LoginService } from '../common-services/login.service';
import { AlertServiceService } from '../common-services/alert-service.service';
// import { translateService } from '../common-services/translate /translate-service.service';
import { StorageService } from '../common-services/storage-service.service';
import { Router } from '@angular/router';
import { SelectOrganizationComponent } from '../common-components/select-organization/select-organization.component';
import { AddUserComponent } from '../common-components/add-user/add-user.component';
import { NeedHelpComponent } from '../common-components/need-help/need-help.component';
import { HTTP } from '@ionic-native/http/ngx'
import { Utils } from '../Rentals Management/services/utils.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { element } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  sendotpinput;
  registereduser;
  enterpassword;
  enterotp;
  newpassword;
  email_end_selected;
  // To store the form data
  loginData: any = {
    countryCode: '+91',
    loginType: 'login'
  };
  appSrc
  // To display error message when both the password is not correct while setting password
  passwordMismatch = false;
  showOtpCounter = false;
  timeLeft: number = 60;
  interval;
  eventCopy: any;
  showLogo
  /* This variable will decide which input block is visible on screen
  values are ['phoneInput', 'passwordInput', 'otpInput', 'passwordSetInput', 'sendOtpInput']
  */
  visibleBlock = 'phoneInput';

  // Only these user types are allowd to use this app
  allowedUsers = ['employee', 'admin', 'technician', 'housekeeper'];
  brand_id
  constructor(
    public loginService: LoginService,
    private loading: LoadingController,
    private router: Router,
    private alertService: AlertServiceService,
    private modalCtrl: ModalController,
    private http: HTTP,
    private toast: ToastController,
    public utils: Utils,
    private apiSvc: NailaService,
    private appSetting: MainAppSetting,
    public alertController: AlertController,
    private navCtrl: NavController,
    // private mixpanel: Mixpanel,
    // private smsRetriever: SmsRetriever,
    private MenuController: MenuController,
    private popover: PopoverController,
    private storageService: StorageService,

  ) {
    MenuController.enable(false)
    this.sendotpinput = true;
    this.registereduser = false;
    this.enterpassword = true;
    this.enterotp = true;
    this.newpassword = true;

    this.showLogo= true


this.email_end_selected="@gmail.com"


// this.brand_id

    // this.mixpanel.init('1350cf4808c3adbdd9ef79625d091dc7').then(success => {
    // }).catch(err => {
    // })

  }

  GoogleAuth = () => {
    this.loginService.GoogleAuth()
  }
  FacebookAuth = () => {
    this.loginService.FacebookAuth()
  }
  ionViewDidLeave() {
    this.MenuController.enable(true)
    this.loading.dismiss()
  }
  hideloginbox
  subscription1
  hidenshow
  brandImage
  ngOnInit() {
    debugger

    // this.hidenshow=true
    // if(window.localStorage.getItem('scan_flow')=='3'){
    //   this.hidenshow=false

    //   this.googleLoginText="Welcome to the myPAPERCLIP family. Get a chance to win iPhone 12, iWatch and exclusive offers on myPAPERCLIP products."
    // }else{
    //   this.googleLoginText="You are just one step away from your cashback. Provide your details so that your cashback can be credited to your Paytm number."
    // }




    this.hidenshow=true

    if(window.localStorage.getItem('brand_image').length > 2){

      this.brandImage=window.localStorage.getItem('brand_image')
    }else{
      this.brandImage=""
    }

    if(window.localStorage.getItem('brand_text').length > 2){
      this.googleLoginText=window.localStorage.getItem('brand_text')
    }else{
      this.googleLoginText="You are just one step away from your cashback. Provide your details so that your cashback can be credited to your Paytm number."
    }





    // if(window.localStorage.getItem('scan_flow')=='3'){
    //   this.hidenshow=false

    //   this.googleLoginText="Welcome to the myPAPERCLIP family. Get a chance to win iPhone 12, iWatch and exclusive offers on myPAPERCLIP products."
    // }
    
    // else{
    //   this.googleLoginText="You are just one step away from your cashback. Provide your details so that your cashback can be credited to your Paytm number."
    // }


    if (this.utils.newflow == true) {
      this.toggleSignup()
    }

    // let brand=window.localStorage.getItem('scan_flow')

          let config=['2']


config.forEach(element => {
  
  if(window.localStorage.getItem('scan_flow')==element){
  
    debugger
      this.showLogo= false
    
    }
});

    // this.newpassword=this.utils.newpassword


    console.log('=======================')
    console.log('=======================')
    console.log('=======================')

    console.log(this.utils.isProductInfo)
    console.log('=======================')

    console.log('=======================')

    console.log('=======================')

    this.hideloginbox = this.utils.isProductInfo


    if (this.router.url.includes("regon")) {
      this.toggleSignup()
    }
    // this.mixpanel.track('User entered on login screen');
    // this.presentAddUserModal();
    // this.showProductSelectionPopup()
  }

  setVisibleBlock(type) {
    this.visibleBlock = type;

    if (type === 'sendOtpInput') {
      this.loginData.action = 'resetPassword';
    } else {
      this.loginData.action = 'login';
    }

    console.log(this.visibleBlock);
  }


  // This function will display loading screen

  async presentLoading() {
    await this.loading.create({
      spinner: 'lines'
    }).then(loading => {
      loading.present()
    });

  }

  // This function will check for user's platform based on his phone number

  async checkPlatform() {

    this.loginData.accessCode = ''
    this.loginData.accessCode1 = ''
    this.loginData.accessCode2 = ''
    this.loginData.accessCode3 = ''
    this.loginData.accessCode4 = ''

    window.localStorage.removeItem('platform');
    await this.storageService.removeItem('platform')
    this.appSetting.platform = ''
    if (!this.verifyPhone()) {
      this.alertService.presentAlert("", 'Please enter a valid phone number');
    } else {

      localStorage.setItem('phoneNumber', this.loginData.phoneNumber);
      this.storageService.storeDataToIonicStorage("phoneNumber", this.loginData.phoneNumber)

      localStorage.setItem('countryCode', this.loginData.countryCode);
      this.storageService.storeDataToIonicStorage("countryCode", this.loginData.countryCode)

      this.presentLoading();

      if (this.appSetting.ORG == "Both") {
        this.loginService.checkPlatform(this.loginData)
          .subscribe(async (data: any) => {
            await this.loading.dismiss();
            console.log(data);
            if (data.type === 'multi') {
              this.showProductSelectionPopup(data);
            } else if (data.type === 'bm') {
              this.handleUser(data, 'bm');
            } else if (data.type === 'rm') {
              this.handleUser(data, 'rm');
            }

            // this.mixpanel.track('User called checkplatform service', {
            //   "userdata": this.loginData
            // })

          }, async err => {
            await this.loading.dismiss();
            // this.mixpanel.track(' checkplatform service error', {
            //   "userdata": this.loginData
            // })
            this.visibleBlock = 'onboardUser'
            // this.alertService.presentAlert("", err.error);

          });
      } else {
        this.verifyPhoneService()
      }

    }
  }


  // If user is found on multiple platforms this function will display a popup to select between platforms

  async showProductSelectionPopup(data?) {
    this.popover.create({
      component: SelectOrganizationComponent,
      mode: 'md',
      componentProps: { data: data },
      cssClass: 'select-org-popover'
    }).then(d => {
      d.present()
      d.onDidDismiss().then(async (data: any) => {
        if (data) {
          await this.handleUser(data.data, data.role, true);
        }
      })
    })
  }


  // Check id user is allowed to use this app

  async handleUser(data, type, hidethisotp?: boolean) {

    console.log("--------******-----------")
    console.log(data)
    console.log(type);
    this.loginData.action = data[type].action;
    this.loginData.loginType = data[type].action;
    console.log(this.loginData)
    console.log("--------******-----------")

    await this.appSetting.setPlatformAfterLogin(JSON.stringify(type))
    window.localStorage.setItem('platform', type);
    await this.alertService.saveToLocalStorage('platform', type)

    window.localStorage.setItem('types', data[type].types);
    this.alertService.saveToLocalStorage('types', data[type].types)


    if (type === 'bm') {
      window.localStorage.setItem('appSrc', 'building-management');
      this.alertService.saveToLocalStorage('appSrc', 'building-management');
    } else {
      window.localStorage.setItem('appSrc', 'rentals');
      this.alertService.saveToLocalStorage('appSrc', 'rentals')
    }

    if (this.isUserAllowed(data[type].types)) {
      // if (data[type].action === 'login') {
      //   this.visibleBlock = 'passwordInput';
      // } else {
      if (hidethisotp == true || data[type].action === 'login') {

        this.verifyPhoneService(true)
      } else {
        this.visibleBlock = 'otpInput';
      }
      // }
    } else {
      this.alertService.presentAlert("", 'You are not allowed to use this app');
    }
  }

  // thios method will check if user is alloued to use this app or not 

  isUserAllowed(types) {
    // this.alertService.presentAlert ('Alert',(_.intersection(this.allowedUsers, types).length > 0 ? true : false));
    return (_.intersection(this.allowedUsers, types).length > 0 ? true : false);
  }

  // Common function to set values to localstorage

  saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }


  saveToIonicStorage(key, value) {
    this.storageService.storeDataToIonicStorage(key, value)
  }


  public route: boolean = true
  keyup(val, next, prev, current) {
    // this.checkFocus(current,val)
    // console.log("------------------------")
    // console.log("val"+val);

    if (val == "") {
      // console.log("ionChange prev");
      if (this.route == true) {
        prev.setFocus()
      }

    } else {
      // console.log("ionChange text");
      if (val !== "") {
        next.setFocus()
      }

    }
    //       // }
    //       // console.log('prev');
    //     } else if (event.key !== 'Backspace') {
    //       this.checkFocus(current)
    //       next.setFocus()
    //     }
  }

  checkFocus(val) {
    // console.log("ionFocus" + val);
    if (val == "") {
      this.route = true

    } else {
      this.route = false

    }
  }

  next(el, prev, value) {

    this.eventCopy = event;

    // console.log("------------------")
    // console.log(typeof(value))
    // console.log(value)
    // console.log("-------------------")
    // console.log(el)
    // console.log(prev)
    // console.log(this.eventCopy)
    // console.log("------------------")

    if (value) {
      console.log("contains")
    } else {
      console.log("empty")
    }

    if (this.eventCopy.key == 'Backspace' && !value) {
      if (prev) {
        prev.setFocus();
      }
    }
    else if (this.eventCopy.key == 'Backspace' && value) {
      // DO nothing
    }
    else {
      el.setFocus();
    }
  }



  // }

  // onchange(val) { }
  // {

  //   if (current.value == '') {
  //     this.route = true
  //   } else {
  //     this.route = false
  //   }

  // }


  validatePassword() {
    console.log(this.loginData)
    if (this.loginData.password
      && this.loginData.passwordCheck
      && String(this.loginData.password) === String(this.loginData.passwordCheck)) {
      this.passwordMismatch = false;
    } else {
      this.passwordMismatch = true;
    }
  }

  validetPhoneNumber() {

    const phoneno = /^[6-9]\d{9}$/;

    if (this.loginData.phoneNumber) {

      // localStorage.setItem('phoneNumber', this.loginData.phoneNumber);
      // localStorage.setItem('countryCode', this.loginData.countryCode);

      if (this.loginData.countryCode === '+91') {

        return this.loginData.phoneNumber.match(phoneno) ? true : false;

      } else {

        return this.loginData.phoneNumber.length > 4 ? true : false;

      }
    } else {
      return false;
    }
  }

  async setValues(data) {

    await this.storageService.getDatafromIonicStorage('appSrc').then(data => {
      this.appSrc = data
    })

    window.localStorage.setItem('isLoggedIn', 'true');
    this.storageService.storeDataToIonicStorage('isLoggedIn', 'true');

    window.localStorage.setItem('user_id', data.uid);
    this.storageService.storeDataToIonicStorage('user_id', data.uid);

    window.localStorage.setItem('token', data.token);
    this.storageService.storeDataToIonicStorage('token', data.token);
    this.appSetting.setTokenAferLogin(data.token);

    // window.localStorage.setItem('ids', JSON.stringify(data.ids));
    // this.storageService.storeDataToIonicStorage('ids', JSON.stringify(data.ids))



    window.localStorage.setItem('currencyCode', data.currencyCode);
    this.storageService.storeDataToIonicStorage('currencyCode', data.currencyCode)

    // window.localStorage.setItem('homeId', data.ids[0].mId);
    // this.storageService.storeDataToIonicStorage('homeId', data.ids[0].mId);

    // window.localStorage.setItem('projectId', data.ids[0].prId);
    // this.storageService.storeDataToIonicStorage('projectId', data.ids[0].prId);

    // window.localStorage.setItem('type', data.type);
    // this.storageService.storeDataToIonicStorage('type', data.type);

    // window.localStorage.setItem('optedForDiscussion', data.ids[0].config.optedForDiscussion);
    // this.storageService.storeDataToIonicStorage('optedForDiscussion', data.ids[0].config.optedForDiscussion);


    // this.navCtrl.navigateRoot(`/${this.appSrc}-home`);
    this.navCtrl.navigateRoot(`/rentals-naila-search-page`);

    // this.router.navigateByUrl(`/${window.localStorage.getItem('appSrc')}-home`);


  }

  async login() {
    await this.presentLoading();

    this.loginService.login(this.loginData)
      .subscribe(async (data: any) => {
        await this.loading.dismiss();
        this.setValues(data);

      },
        async err => {
          await this.loading.dismiss();
          this.alertService.presentAlert("", err.error.error);
        }
      );
  }

  async verifyOtp() {

    await this.presentLoading();

    if (this.loginData.accessCode1 && this.loginData.accessCode2 && this.loginData.accessCode3 && this.loginData.accessCode4) {
      this.loginData.accessCode = this.loginData.accessCode1 + "" + this.loginData.accessCode2 + "" + this.loginData.accessCode3 + "" + this.loginData.accessCode4
    }

    this.loginService.verifyOtp(this.loginData)
      .subscribe(async (data: any) => {
        await this.loading.dismiss();
        this.showOtpCounter = false;
        this.visibleBlock = 'passwordSetInput';
        // this.alertService.presentAlert ('Alert',"otp verifies")
        // this.presentAddUserModal();
        // this.mixpanel.track('User called verify otp service', {
        //   "userdata": this.loginData,
        // });
      },
        async err => {
          await this.loading.dismiss();
          // this.mixpanel.track('verify otp service error', {
          //   "userdata": this.loginData,
          //   "error": err
          // });
          this.alertService.presentAlert("", err.error.errors[0]);
        }
      );
  }
  async presentAddUserModal() {
    await this.modalCtrl.create({
      component: AddUserComponent
    }).then(modal => {
      modal.present();
    });
  }

  async sendOtp() {

    // this.alertService.presentAlert ('Alert',"send otp called");
    if (!this.validetPhoneNumber()) {
      this.alertService.presentAlert("", 'Please enter a valid phone number');
    } else {
      localStorage.setItem('phoneNumber', this.loginData.phoneNumber);
      localStorage.setItem('countryCode', this.loginData.countryCode);
      await this.presentLoading();
      this.loginService.sendOtp(this.loginData)
        .subscribe(
          async (data: any) => {
            await this.loading.dismiss();
            // this.smsRetriever.startWatching()
            //   .then((res: any) => {
            //     // console.log(res)
            //     this.retrieveOtp(res.Message, 'verify')
            //   })
            //   .catch((error: any) => console.error(error));

            this.visibleBlock = 'verifyOtpInput';
            this.startTimer()
          },
          async err => {
            await this.loading.dismiss();
            this.alertService.presentAlert("", err.error.error);
            // this.mixpanel.track('OTP service error', {
            //   "userdata": this.loginData,
            //   "error": err
            // });
          }
        );
    }
  }

  async resetPassword() {
    await this.presentLoading();
    this.loginService.reserPassword(this.loginData)
      .subscribe(
        async (data: any) => {

          await this.loading.dismiss();
          this.setValues(data);


        },
        async err => {
          await this.loading.dismiss();
          // this.mixpanel.track('password reset service error', {
          //   "userdata": this.loginData,
          //   error: err
          // });
          this.alertService.presentAlert("", err.error.error);
        }
      );
  }

  async signIn() {
    await this.presentLoading();
    this.loginService.signIn(this.loginData)
      .subscribe(
        async (data: any) => {

          await this.loading.dismiss();
          this.setValues(data);


        },
        async err => {
          await this.loading.dismiss();
          // this.mixpanel.track('password reset service error', {
          //   "userdata": this.loginData,
          //   error: err
          // });
          this.alertService.presentAlert("", err.error.error);
        }
      );
  }

  // This function will user based on his phone number

  async verifyPhoneService(showlaoding?: boolean) {

    if (this.verifyPhone()) {
      if (showlaoding == true) {

        await this.presentLoading()
      }
      this.loginService.verifyPhone(this.loginData)
        .subscribe(
          async (data: any) => {
            await this.loading.dismiss()

            console.log("Sending otp");

            // this.smsRetriever.startWatching()
            //   .then((res: any) => {
            //     // console.log(res)
            //     this.retrieveOtp(res.Message, 'login')
            //   })
            //   .catch((error: any) => console.error(error));

            console.log("-------------------------");
            console.log(data.action);
            console.log("-------------------------");


            if (this.isUserAllowed(data.types)) {
              if (data.action == 'login') {

                window.localStorage.setItem("types", data.types);
                this.alertService.saveToLocalStorage("types", data.types)
                this.loginData.loginType = 'login'
                this.visibleBlock = 'passwordInput';

              }
              else {
                window.localStorage.setItem("types", data.types);
                this.alertService.saveToLocalStorage("types", data.types)
                this.loginData.loginType = 'register'
                this.visibleBlock = 'otpInput';
                this.startTimer()

              }

            }
            // else if (data.types.indexOf('owner') > -1) {
            //   this.alertService.presentAlert ('Alert','Owner login is coming soon');
            // }
            else {
              this.alertService.presentAlert("", 'You must be a resident to use this app');
            }
            // this.mixpanel.track('User tried calling varify phone service ', {
            //   "userdata": this.loginData,
            // });
          },
          async (err: any) => {
            await this.loading.dismiss()
            if (err.error.error == "User not found") {
              this.visibleBlock = 'onboardUser';
              // this.showProductSelectionPopup()
              // this.alertService.presentAlert("", "It seems you are not in our system")
            }
            else {
              this.alertService.presentAlert("", "Something went wrong")
            }
            // this.mixpanel.track("verify phone service error", {
            //   "userdata": this.loginData,
            //   "error": err
            // });
          })
    } else {
      this.alertService.presentAlert("", 'Please enter a valid phone number');
    }

  }

  //  This function will validate phone number on the basis of ragex phone number

  verifyPhone() {
    let phoneno = /^[6-9]\d{9}$/;

    if (this.loginData.phoneNumber) {
      // this._storage.set("phoneNumber", this.loginData.phoneNumber)
      // this._storage.set("countryCode", this.loginData.countryCode)

      if (this.loginData.countryCode === "+91") {
        return this.loginData.phoneNumber.match(phoneno) ? true : false;
      }
      else {
        return this.loginData.phoneNumber.length > 4 ? true : false;
      }
    }
    else {
      return false
    }

  }

  async showCountryCodeModal() {
    await this.modalCtrl.create({
      component: CountrycodemodalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: { 'value': this.loginData.countryCode }
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then((data: any) => {
        this.loginData.countryCode = data.data ? data.data : '+91';
        // console.log(data.data, "Data from country code modal");
      });
    })


  }

  startTimer() {
    this.timeLeft = 60
    this.showOtpCounter = true;
    this.interval = setInterval(() => {
      if (this.timeLeft == 0) {
        this.showOtpCounter = false;
        clearInterval(this.interval)
      } else {
        this.timeLeft--;
      }
    }, 1000)
  }

  retrieveOtp(string, action) {

    // console.log(string);

    const pattern = /\d{4}/;
    let messageData = string;
    try {
      let otp = (messageData.match(pattern)[0])
      if (otp) {
        this.loginData.accessCode = otp;
      }
      otp = otp.split("");
      otp.forEach((element, index) => {
        this.loginData[`accessCode${index + 1}`] = element;
        // console.log(element, index);
        // console.log(this.loginData)
      });
      if (action == 'login') {
        this.login();
      } else {
        this.verifyOtp()
      }
    } catch (err) {
      // console.log(err);
    }

  }

  needHelp() {
    this.modalCtrl.create({
      component: NeedHelpComponent,
    }).then(modal => {
      modal.present()
    })
  }





  // coded by harsh
  sendOtpInput
  userSignup() {
    this.sendOtpInput = false;
    this.enterotp = true;
    const data = {
      mobile: "+91" + this.loginData.phoneNumber
    }
    this.loginService.userSignup(data).subscribe(data => {
      if (data) {
        this.enterotp = false;
        this.sendotpinput = true;


      }
    }, err => {
      this.alertService.presentAlert("", err.error.errors[0]);

    })
  }

  toggleSignup() {
    this.sendotpinput = true;
    this.registereduser = true;
    this.enterotp = true;
    this.newpassword = false;
  }


  confirmOtp() {
    const data = {
      mobile: "+91" + this.loginData.phoneNumber,
      otp:
        this.loginData.accessCode1 +
        this.loginData.accessCode2 +
        this.loginData.accessCode3 +
        this.loginData.accessCode4
    }
    this.loginService.confirmOtp(data).subscribe(data => {
      if (data) {
        this.enterotp = true;
        this.sendotpinput = true;
        this.newpassword = false;



      }
    })
  }
  googleLoginText
  registerUser() {
    debugger
    this.loginService.presentLoading()
    const data = {

      "fullname": this.loginData.name,
      "email": this.loginData.phoneNumber,
      "password": '123',
      "repassword": '123',
      "gender": this.loginData.gender,
      "signup-as": 'user',
      "mobile": this.loginData.mobile,
      "brand_id": window.localStorage.getItem('brand_id')

    }

    // http://www.nowverifyit.com/index.php/register?email=sandeep25@vernacular.ai&signup-as=user&fullname=Sandeep Parihar&mobile=9910223580&password=123&repassword=123&gender=M



    this.loginService.registerUser(data).subscribe(data => {
      this.utils.newflow = false

      // this.registeredUsernewFlow()
      window.localStorage.setItem('token', data.data.token);


      window.localStorage.setItem('name', data.data.name);
      window.localStorage.setItem('email', data.data.email);
      window.localStorage.setItem('mobile', data.data.mobile);
      window.localStorage.setItem('user_upi', data.data.mobile);
      
      window.localStorage.setItem('userid', data.data.uid);
      this.utils.LoadPageOnrouteChange();
      if(window.localStorage.getItem('scan_flow')=='3'){


        this.utils.openQuizModal()
      }else if(window.localStorage.getItem('scan_flow')=='4'){

        this.utils.openQuizModal()

      }else if(window.localStorage.getItem('scan_flow')=='6'){

        this.utils.LoadSurpriseModal();

      }
      
      else{

        this.presentToast("We have received your details, you will receive your Paytm cashback back in 7-10 working days")
      }

      this.navCtrl.pop()
      // this.navCtrl.pop()


      let myCookie = Cookie.get('Cookies')
      console.log("===============>" + myCookie)


      if (data) {
        this.enterotp = true;
        this.sendotpinput = true;
        this.newpassword = true;
        this.registereduser = false;
      }



    }, err => {
      this.utils.newflow = false


      // this.registeredUsernewFlow()

      // this.navCtrl.pop()

      this.alertService.presentAlert("", err.error.errors[0]);

    })


  }
  firstname
  userrole

  registeredUser() {

    const data = {
      "email": this.loginData.phoneNumber,
      "password": this.loginData.password
    }
    this.loginService.registeredUser(data).subscribe(data => {




      this.presentToast('Login successfully')

      console.log("============>>" + JSON.stringify(data.headers))
      // let headers = data.headers;
      // let myCookie = Cookie.get('Set-Cookie')

      // alert(JSON.stringify(headers))

      // console.log("===============>" + myCookie)


      window.localStorage.setItem('name', data.data.name);
      window.localStorage.setItem('email', data.data.email);
      window.localStorage.setItem('mobile', data.data.mobile);
      window.localStorage.setItem('userid', data.data.id);

      // newbrandflow flow change


      // window.localStorage.setItem('token', data.data.token);

      // new brand flow change

      if (window.localStorage.getItem('name')) {
        //**charu start */
        if (this.loginService.isProductInfo) {
          this.loginService.isProductInfo = false;
          this.navCtrl.pop();//
          return;
        }
        //**charu end */

        if (data.data.userType == 4) {

          window.localStorage.setItem('showDeactivate', '4');

          data.data.userType = 2
          window.localStorage.setItem('userType', data.data.userType);



        } else {

          window.localStorage.setItem('userType', data.data.userType);
        }

        this.utils.userType = window.localStorage.getItem('userType')
        window.localStorage.setItem('userType', data.data.userType);




        this.router.navigateByUrl('/verifyit-dashboard')

        // this need to be condition based




      }

      this.utils.LoadPageOnrouteChange();
      if (data.description.length) {
        this.loginService.loginUserInfo().subscribe((data) => {
          // alert('helloooooo1')
          console.log('fhgfhgfghfghfhgfhgfhg========================')

          console.log(data)

          console.log('fhgfhgfghfghfhgfhgfhg========================')
          // this.alertService.presentAlert(" user info data", this.utils.userType=window.localStorage.getItem('userType'));


          // this.router.navigateByUrl('/verifyit-dashboard')


        }, err => {
          // alert('helloooooo2')
          console.log('errorrrrrr===========================>>>>>>>>>>>>>>>>>>>>', err)
          console.log(err)
          console.log('errorrrrrr===========================>>>>>>>>>>>>>>>>>>>>', err)


          // this.alertService.presentAlert(" userinfo data error", err.error.errors[0]);
        })
      }



    }, err => {
      // alert('hello login'+ err.error.errors)

      this.alertService.presentAlert("", err.error.errors[0]);

    })

  }
  editNumber() {
    this.enterotp = true;
    this.sendotpinput = true;
    this.newpassword = true;
    this.registereduser = false;
    this.enterpassword = true;
    this.forgetpassword = true;

  }
  togglesubmitpassword() {

    // this.enterotp = true;
    // this.sendotpinput = true;
    // this.newpassword = true;
    // this.registereduser = true;
    // this.enterpassword = false;
    // this.forgetpassword = true;

    let shareData = {
      user_id: localStorage.getItem("userid"),
      tag_id: localStorage.getItem("tagId"),
      product_id: this.utils.productId,

      device_id: localStorage.getItem("device_id"),
      otype: "Login",

    };
    this.apiSvc.reviewTracking(shareData).subscribe(
      (res: any) => {

        if (res) {

          this.enterotp = true;
          this.sendotpinput = true;
          this.newpassword = true;
          this.registereduser = true;
          this.enterpassword = false;
          this.forgetpassword = true;
        }

      },
      //**charu end */
      err => {
        alert(JSON.stringify(err));
      }
    );

  }

  toggelLoginClicked() {
    // this.enterotp = true;
    // this.sendotpinput = true;
    // this.newpassword = true;
    // this.registereduser = false;
    // this.enterpassword = true;
    // this.forgetpassword = true;
    let shareData = {
      user_id: localStorage.getItem("userid"),
      tag_id: localStorage.getItem("tagId"),
      product_id: this.utils.productId,

      device_id: localStorage.getItem("device_id"),
      otype: "Login",

    };
    this.apiSvc.reviewTracking(shareData).subscribe(
      (res: any) => {

        if (res) {

          this.enterotp = true;
          this.enterotp = true;
          this.sendotpinput = true;
          this.newpassword = true;
          this.registereduser = false;
          this.enterpassword = true;
          this.forgetpassword = true;

        }

      },
      //**charu end */
      err => {
        alert(JSON.stringify(err));
      }
    );

  }

  togglereset() {
    this.enterotp = true;
    this.sendotpinput = true;
    this.newpassword = true;
    this.registereduser = true;
    this.enterpassword = true;
    this.forgetpassword = false;
  }


  editresendNumber() {
    this.sendotpinput = false;
    this.registereduser = true;
    this.enterotp = true;
    this.newpassword = true;
    this.forgetpassword = true;

  }




  resendOtp() {
    const data = {
      mobile: "+91" + this.loginData.phoneNumber
    }
    this.loginService.resendOtp(data).subscribe(data => {

    }, err => {
      this.alertService.presentAlert("", err.error.errors[0]);

    })
  }
  forgetpassword = true;
  forgotPassword() {
    const data = {
      "contact": "+91" + this.loginData.phoneNumber,
      "password": this.loginData.password
    }
    this.loginService.forgotPassword(data).subscribe(data => {

      this.enterotp = true;
      this.sendotpinput = true;
      this.newpassword = true;
      this.registereduser = false;
      this.enterpassword = true;
      this.forgetpassword = true;


    }, err => {

      this.alertService.presentAlert("", err.error.errors[0]);

    })
  }



  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async presentToast(data) {
    const toast = await this.toast.create({
      message: data,
      duration: 5000
    });
    toast.present();
  }


  registeredUsernewFlow() {

    this.loginService.loginUserInfo().subscribe((data) => {
      // alert('helloooooo1')
      console.log('fhgfhgfghfghfhgfhgfhg========================')

      console.log(data)

      console.log('fhgfhgfghfghfhgfhgfhg========================')



      window.localStorage.setItem('name', 'nnhjhkjhj');
      window.localStorage.setItem('email', 'ghfghfghfh');
      window.localStorage.setItem('mobile', 'ghfghfghfgh');
      // this.alertService.presentAlert(" user info data", this.utils.userType=window.localStorage.getItem('userType'));


      // this.router.navigateByUrl('/verifyit-dashboard')


    }, err => {

      window.localStorage.setItem('name', 'nnhjhkjhj');
      window.localStorage.setItem('email', 'ghfghfghfh');
      window.localStorage.setItem('mobile', 'ghfghfghfgh');
      // alert('helloooooo2')
      console.log('errorrrrrr===========================>>>>>>>>>>>>>>>>>>>>', err)
      console.log(err)
      console.log('errorrrrrr===========================>>>>>>>>>>>>>>>>>>>>', err)


      // this.alertService.presentAlert(" userinfo data error", err.error.errors[0]);
    })
  }

  changeEmailEnd(event){
    debugger
    this.email_end_selected=event.detail.value
    // alert(value)
  }
  
}
