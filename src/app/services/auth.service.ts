import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://localhost:5000";
  constructor(private http: HttpClient) { }

  login(user: any) {
    let loginUrl: string = this.baseUrl + "/api/Authentication/LoginUser";
    return this.http.post(loginUrl, user);
  }
}
