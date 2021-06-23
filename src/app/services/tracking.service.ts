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
    // http://develop.nowverifyit.com/tracking/tracking"
    return this.http.post(`${this.appSettings.getApi()}/tracking/tracking`, data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        })
      });
  }
}
