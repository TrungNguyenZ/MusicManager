import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { CookieService } from 'ngx-cookie-service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` })
};


@Injectable({
  providedIn: 'root'
})
export class UserdApiService {
  constructor(private http: HttpClient,
    public _cookiesService: CookieService) { }
 
  changePassword(input:any): Observable<any> {
    const headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')}
    return this.http.post(GlobalComponent.API_URL + 'User/ChangePassword', input, {  headers: headerToken, responseType: 'json' });
  }
  resetPassword(input:any): Observable<any> {
    const headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')}
    return this.http.post(GlobalComponent.API_URL + 'User/ResetPassword', input, {  headers: headerToken, responseType: 'json' });
  }
  getList(): Observable<any> {
    const headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')}
    return this.http.get(GlobalComponent.API_URL + 'User/GetList' , {  headers: headerToken, responseType: 'json' });
  }
  create(input:any): Observable<any> {
    const headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')}
    return this.http.post(GlobalComponent.API_URL + 'User/create' ,input, {  
      headers: headerToken, 
      responseType: 'json'
    });
  }
  update(input:any): Observable<any> {
    const headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')}
    return this.http.post(GlobalComponent.API_URL + 'User/update' ,input, {  headers: headerToken, responseType: 'json' });
  } 
   delete(id:any): Observable<any> {
    const headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')}
    return this.http.get(GlobalComponent.API_URL + 'User/delete?id=' + id, {  headers: headerToken, responseType: 'json' });
  }

}
