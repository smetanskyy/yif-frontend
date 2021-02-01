import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { tap } from "rxjs/operators";
import { BASE_URL, CLIENT_REFRESHTOKEN, CLIENT_TOKEN } from "./const"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(user: any) {
    let loginUrl: string = BASE_URL + "api/Authentication/LoginUser";
    return this.http.post(loginUrl, user).pipe(
      tap(this.setTokens));
  }

  private async refreshTokens(model: any) {
    let refreshTokenUrl: string = BASE_URL + "api/Authentication/RefreshToken";
    return await this.http.post(refreshTokenUrl, model).toPromise();
  }

  private setTokens(response: any): void {
    console.log("SET TOKENS AUTH SERVICE: ", response);
    if (response === null) {
      localStorage.clear();
      return;
    }
    localStorage.setItem(CLIENT_TOKEN, response.token);
    localStorage.setItem(CLIENT_REFRESHTOKEN, response.refreshToken);
  }

  public getToken(): string | null {
    return localStorage.getItem(CLIENT_TOKEN);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(CLIENT_REFRESHTOKEN);
  }

  public async updateTokenIfExpired(): Promise<boolean> {
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();

    if (token === null || refreshToken === null)
      return false;

    const decoded: any = jwt_decode(token);
    const expData = new Date(decoded.exp * 1000);

    if (new Date() > expData) {
      await this.refreshTokens({ token, refreshToken }).then(res => {
        this.setTokens(res);
      }).catch(() => {
        this.setTokens(null);
      });
    }
    console.log("is token fresh: ", !!this.getToken(), " ", new Date().toTimeString());
    return !!this.getToken();
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public logout(): void {
    this.setTokens(null);
  }
}