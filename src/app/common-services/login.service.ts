import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jsonFile from '../conatants/organization.json';
import { MainAppSetting } from '../conatants/MainAppSetting.js';
import {  HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Utils } from '../Rentals Management/services/utils.service';
const appFor = jsonFile.connectTo;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isProductInfo:boolean=false;

  constructor(
    public navCtrl:NavController,
    public http: HttpClient,
    private utils:Utils,
    private loading:LoadingController,
    public appSettings: MainAppSetting,
    public afAuth: AngularFireAuth,   private router: Router,
  ) {
  }
  public appFor = appFor;

  checkPlatform(data): Observable<any> {
    return this.http.post(`${this.appSettings.getApi()}/shared-resource/authentication/common-auth`, data, this.appSettings.getHttpHeades());
  }

  needHelp(data): Observable<any> {
    let API = ''
    if (this.appFor == 'alpha') {
      API = 'https://alpha.thehousemonk.com';
    } else if (this.appFor == 'production') {
      API = 'https://admin.grexter.in';
    }
    return this.http.post(`${API}/shared-resource/webhook/support/email`, data, this.appSettings.getHttpHeades());
  }

  signIn(data): Observable<any> {
    return this.http.post(`${this.appSettings.getApi()}/api/login`, data, this.appSettings.getHttpHeades());
  }

  login(data): Observable<any> {
    return this.http.post(`${this.appSettings.getApi()}/api/v2/login`, data, this.appSettings.getHttpHeades());
  }

  verifyOtp(data): Observable<any> {
    return this.http.post(`${this.appSettings.getApi()}/api/verify-otp`, data, this.appSettings.getHttpHeades());
  }

  sendOtp(data): Observable<any> {
    return this.http.post(`${this.appSettings.getApi()}/api/send-otp`, data, this.appSettings.getHttpHeades());
  }

  reserPassword(data): Observable<any> {
    return this.http.post(`${this.appSettings.getApi()}/api/reset-password`, data, this.appSettings.getHttpHeades());
  }

  verifyPhone(data) {
    console.log("Step 6 --------- verify phone service called----")
    return this.http.post(`${this.appSettings.getApi()}/api/verify-phone`, data, this.appSettings.getHttpHeades());
  }

  userSignup(data: any): Observable<any> {
    return this.http.post(
      `${this.appSettings.getApi()}/api/v1/user/send_otp`,data,this.appSettings.getHttpHeades()
    );



    
  }
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
    }
  GoogleAuth() {
    this.presentLoading()
    return this.AuthLogin(new auth.GoogleAuthProvider());
  } 
  GoogleAuthDB(data) {
    return this.http.post(
      `${this.appSettings.getApi()}/UserSetting/google_login`,data,this.appSettings.getHttpHeades()
    );
  } 
  AuthLogin(provider) {

    return this.afAuth.auth.signInWithPopup(provider)
    .then((result:any) => {

      
      
        console.log('You have been successfully logged in!' +result.additionalUserInfo.profile.name)
       if (result){
         
         let obj={
          
            "localId": result.additionalUserInfo.profile.id,
            "email": result.additionalUserInfo.profile.email,
            "displayName": result.additionalUserInfo.profile.name,
            "photoUrl": result.additionalUserInfo.profile.picture,
            "emailVerified": true,
            "providerUserInfo": [
              {
                "providerId":  result.credential.idToken,
                "displayName": result.additionalUserInfo.profile.name,
                "photoUrl": result.additionalUserInfo.profile.picture,
                "federatedId":  result.additionalUserInfo.providerId,
                "email": result.additionalUserInfo.profile.email,
                "rawId":  result.additionalUserInfo.profile.id,
              }
            ],
            "validSince": "1625847485",
            "lastLoginAt": "1627407260952",
            "createdAt": "1625847485962",
            "lastRefreshAt": "2021-07-27T17:34:20.952Z",
            "brand_id":window.localStorage.getItem('brand_id')
         

         }
         this.GoogleAuthDB(obj).subscribe((data:any)=>{
           if(data){
            window.localStorage.setItem('name', data.data.name);
            window.localStorage.setItem('email', data.data.email);
            window.localStorage.setItem('mobile', data.data.mobile);
            window.localStorage.setItem('userid', data.data.id);
      
            debugger
            window.localStorage.setItem('token', data.data.token);
          //   if(this.isProductInfo){

          //     this.utils.LoadSurpriseModal();
          //     this.isProductInfo=false;
          //     this.utils.LoadPageOnrouteChange();

          //     this.loading.dismiss()

          //     this.navCtrl.pop()
          //   //  this.navCtrl.pop();//
          //   return;
          // }else{
            this.utils.LoadSurpriseModal();
            this.utils.LoadPageOnrouteChange();

            this.loading.dismiss()

            this.navCtrl.pop()
          // }

            // this.router.navigateByUrl("/verifyit-product"); 

            // alert('You have been successfully logged in!')
            // this.router.navigateByUrl("/verifyit-account");

 

            }
         })
        //  alert('You have been successfully logged in!')
   
       } 
        // this.router.navigateByUrl("/verifyit-product-info"); //charu

    }).catch((error) => {
        console.log(error)
    })
  }
      confirmOtp(data:any): Observable<any> {
        return this.http.post(
          `${this.appSettings.getApi()}/api/v1/user/verify_otp`,data,this.appSettings.getHttpHeades()
        );
      }


      registerUser(data:any): Observable<any> {
        return this.http.post(
          `${this.appSettings.getApi()}/register?email=${data.email}&signup-as=${data.signupas}&fullname=${data.fullname}&mobile=${data.mobile}&password=${data.password}&repassword=${data.password_confirmation}&gender=${data.gender};`,data,this.appSettings.getHttpHeades()
        );
      }




      loginUserInfo(): Observable<any> {

        return this.http.get(`${this.appSettings.getApi()}/login/userinfo`,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              credentials: 'include',
              Authorization: localStorage.getItem('token'),
              
            }),
            
            withCredentials:true,
          }
          );
      }


      


      // registeredUser(id): Observable<any> {

      //   return this.http.get(`${this.appSettings.getApi()}/login?email=${id.email}&password=${id.password}`,
      //     {
      //       headers: new HttpHeaders({
              
      //         'Content-Type': 'application/json',
      //         'Access-Control-Allow-Credentials': 'true',
      //         credentials: 'include',
      //         Authorization: localStorage.getItem('token')
              
      //       }),
      //       withCredentials:true,

      //     }
      //     );
      // }



      registeredUser(data:any): Observable<any> {
        return this.http.post(
          `${this.appSettings.getApi()}/login`,data,this.appSettings.getHttpHeades()
        );
      }

      resendOtp(data:any): Observable<any> {
        return this.http.post(
          `${this.appSettings.getApi()}/api/v1/user/resend_otp`,data,this.appSettings.getHttpHeades()
        );
      }

      // forgotPassword(data)


      forgotPassword(data:any): Observable<any> {
        return this.http.post(
          `${this.appSettings.getApi()}/api/v1/user/reset_password`,data,this.appSettings.getHttpHeades()
        );
      }


      // registerUser(data:any): Observable<any> {
      //   return this.http.post(
      //     `${this.appSettings.getApi()}/api/v1/auth/`,data,this.appSettings.getHttpHeades()
      //   );
      // }


      async presentLoading() {
        const loading = await this.loading.create({
          message: '',
          duration: 2000,

        });
        await loading.present();
      }
      
}


