import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCALSTORAGE_CONSTANTS } from '../../constants/local-storage.constants';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { REFRESH_TOKEN_API } from '../../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private apiService: ApiService) {}
  logout() {
    this.removeLocalStorageData();
    this.router.navigate(['/auth/sigin']);
  }

  isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }

  getToken() {
    return localStorage.getItem(LOCALSTORAGE_CONSTANTS.TOKEN ?? null);
  }

  getRefreshToken() {
    return localStorage.getItem(LOCALSTORAGE_CONSTANTS.REFRESH_TOKEN ?? null);
  }

  getUserObject() {
    try {
      const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONSTANTS.USER) ?? 'null');

      return user;
    } catch (e) {
      return null;
    }
  }

  getAccessTokenFromRefreshToken(): Observable<any> {
    const refreshTokenPath = environment.apiHost + environment.version + REFRESH_TOKEN_API;
    return this.apiService.post(refreshTokenPath, {
      refreshToken: this.getRefreshToken(),
    });
  }

  setToken(token: string) {
    localStorage.setItem(LOCALSTORAGE_CONSTANTS.TOKEN, token ?? null);
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem(LOCALSTORAGE_CONSTANTS.REFRESH_TOKEN, refreshToken ?? null);
  }

  setUserObject(user: any) {
    localStorage.setItem(LOCALSTORAGE_CONSTANTS.USER, JSON.stringify(user ?? 'null'));
  }

  removeLocalStorageData() {
    localStorage.removeItem(LOCALSTORAGE_CONSTANTS.TOKEN);
    // localStorage.removeItem(LOCALSTORAGE_CONSTANTS.REFRESH_TOKEN)
  }
}
