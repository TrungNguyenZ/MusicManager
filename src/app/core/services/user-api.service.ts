import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { CookieService } from 'ngx-cookie-service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` })
};
const headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')}


@Injectable({
  providedIn: 'root'
})
export class UserdApiService {
  constructor(private http: HttpClient,
    public _cookiesService: CookieService) { }
 
  changePassword(input:any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + 'User/ChangePassword', input, {  headers: headerToken, responseType: 'text' });
  }
  resetPassword(input:any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + 'User/ResetPassword', input, {  headers: headerToken, responseType: 'text' });
  }
  getList(): Observable<any> {
    return this.http.get(GlobalComponent.API_URL + 'User/GetList' , {  headers: headerToken, responseType: 'json' });
  }

}
