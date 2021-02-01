import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BASE_URL } from './const';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getClientProfile(): Observable<any> {
    let getClientProfileUrl: string = BASE_URL + "api/Users/Current";
    return this.http.get(getClientProfileUrl);
  }

  setClientProfile(model: any): Observable<any> {
    let setClientProfileUrl: string = BASE_URL + "api/Users/Current/SetProfile";
    return this.http.post(setClientProfileUrl, model);
  }
}
