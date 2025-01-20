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
export class DataService {
  constructor(private http: HttpClient) { }
 
  exportExcel(quarter: any, year: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(GlobalComponent.API_URL + `Data/export-excel`, {
      headers,
      params: { quarter, year },
      responseType: 'blob', // Sử dụng blob cho file hoặc JSON trả về từ API
      observe: 'response', // Để truy cập cả body và headers
    });
  }


}
