import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GlobalConfigService } from './global-config.service';

@Injectable({
    providedIn: 'root'
  })
export class UserService {

  constructor (private http: HttpClient, private configService: GlobalConfigService ) {
  }
//    getCurrentUser(): Observable<User>  {
//     const str = '' + '/api/token/GetLoggedUser';
//     return this.http.get<User>(str);
//   } 

public getList() : Observable<Array<User>> 
{
  const urlStr = this.configService.apiUrl + "/api/user/Get";
  return this.http.get<Array<User>>(urlStr);
}

public getSingle(id: number): Observable<User> {
  const urlStr = this.configService.apiUrl + `/api/user/get/${id}`;
  return this.http.get<User>(urlStr);
}
public Post(user: User): Observable<boolean> {
  const urlStr = this.configService.apiUrl + "/api/user/post";
  return this.http.post<boolean>(urlStr, user);
}

public Put(user: User): Observable<boolean> {
  const urlStr = this.configService.apiUrl + `/api/user/put`;
  return this.http.put<boolean>(urlStr, user);
}
public Delete(id: number): Observable<boolean> {
  const urlStr = this.configService.apiUrl + `/api/user/delete/${id}`;
  return this.http.delete<boolean>(urlStr);
}

}