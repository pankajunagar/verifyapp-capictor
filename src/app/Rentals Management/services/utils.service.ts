import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';

@Injectable({
  providedIn: 'root'
})
export class Utils {
    storage:any;
    cartdata:any
    bookingdata:any;
    NFCsuccessmsg:any;
    menuTitle;
    isProductInfo;
    user_upi;
    cashbackAmount;
    source_token;
    // scratchModal;
    user_name;
    winMessage;
    notification_id;
    brand_id;
    winLossAlgoData;
    usernotwon
    callgettagresult:any;
    callrecordscanresult:any
    certificateData:any;
    cartitem:any;
    userrole:any;
    productId;
    royaltyData;
    productCatalogInfo;
    hidenfc
    userType:any;
    flipsurprise_modal :EventEmitter<boolean> = new EventEmitter();;
    LoadPage:EventEmitter<boolean> = new EventEmitter();
    LoadModal: EventEmitter<boolean> = new EventEmitter();
    share_product:EventEmitter<boolean> = new EventEmitter();
    submit_upi:EventEmitter<boolean> = new EventEmitter();
    trigger_location:EventEmitter<boolean> = new EventEmitter();
    otpScreen: EventEmitter<boolean> = new EventEmitter();
    scratchModal: EventEmitter<boolean> = new EventEmitter();
    
    warrantyInformation
  constructor(
    private http: HttpClient,
    private appSettings: MainAppSetting
  ) { 
    this.cartitem=[];
    this.cartdata=0;
  }
  

  

  LoadPageOnrouteChange(){
    console.log('ios working and verifyit')
    this.LoadPage.next(true)
  }


  LoadSurpriseModal(){
    // console.log('ios working and verifyit')
    this.LoadModal.next(true)
  }
  shareProduct(){
    this.share_product.next(true)
  }

  submitUpi(){
    this.submit_upi.next(true)

  }
  flipsurpriseModal(){
    this.flipsurprise_modal.next(true)
  }

  triggerLocation(){

    this.trigger_location.next(true)

  }

  loadOtpScreen(){

    this.otpScreen.next(true)

  }

  loadScratchModal(){

    this.scratchModal.next(true)

  }
}
