import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../models/user';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { GlobalConfigService } from '../services/global-config.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static curUser?: User;

  constructor(private cookieService: CookieService,
              private http: HttpClient,
              private globalConfig: GlobalConfigService,
              private router: Router) {
  }
  login(userName: string, password: string): Observable<Boolean> {
    if (!this.isLoggedIn()) {
      const  ob = {'username': userName, 'password': password};
      return this.http.post<any>(this.globalConfig.apiUrl + '/api/token/post', ob).pipe(
        map(tkn => {
        if (tkn.token) {
          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1000);
          this.cookieService.set('trose', tkn.token,expireDate,'/');
          return true;
        }
        return false;
      }), catchError((err) => {
         return of(false);
      }));
    } else {
      return of(true);
    }
  }
  logout() {
    this.cookieService.delete('trose', '/');
    AuthService.curUser = undefined;
    this.router.navigate(['/login']);
  }

  getCurrentToken(): string {
    return this.cookieService.get('trose');
  }

  isLoggedIn(): boolean {
    if (AuthService.curUser) {
      return true;
    }
    const uo = this.cookieService.get('trose');
    return (uo != undefined && uo !== '');
  }
}
