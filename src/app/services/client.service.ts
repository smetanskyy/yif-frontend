import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BASE_URL } from './const';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getClientProfile(){
    let getClientProfileUrl: string = BASE_URL + "api/Users/Current";
    return this.http.get(getClientProfileUrl);
  }
}
