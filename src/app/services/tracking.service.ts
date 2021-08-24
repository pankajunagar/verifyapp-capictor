import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainAppSetting } from '../conatants/MainAppSetting';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private http:HttpClient,private appSettings: MainAppSetting) { }

  trackingApi(data): Observable<any> {
    return this.http.post(`${this.appSettings.getApi()}/api/tracking`, data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        })
      });
  }

  getQuestion(data){
   
    return this.http.post(`${this.appSettings.getApi()}/PopupQuestions/getQuestion`,data,{
     headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'), 
           
}),
withCredentials:true,
})
}
saveAnswers(data){
   
  return this.http.post(`${this.appSettings.getApi()}/PopupQuestions/saveAnswers`,data,{
   headers: new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('token'), 
         
}),
withCredentials:true,
})
}

}
