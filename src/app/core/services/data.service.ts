import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalComponent } from "../../global-component";
import { CookieService } from "ngx-cookie-service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }),
};

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  exportExcel(quarter: any, year: any): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(GlobalComponent.API_URL + `Data/export-excel`, {
      headers,
      params: { quarter, year },
      responseType: "blob", // Sử dụng blob cho file hoặc JSON trả về từ API
      observe: "response", // Để truy cập cả body và headers
    });
  }
  downloadTemplate(): void {
    this.http
      .get(GlobalComponent.API_URL + `Data/download-template`, {
        responseType: "blob",
      })
      .subscribe(
        (response) => {
          const blob = new Blob([response], { type: response.type });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "SampleTemplate.xlsx";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        },
        (error) => {
          console.error("Lỗi tải file:", error);
        }
      );
  }
  uploadExcel(file: File, quarter: number, year: number): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("quarter", quarter.toString());
    formData.append("year", year.toString());

    return this.http.post(
      GlobalComponent.API_URL + `Data/upload-excel`,
      formData
    );
  }
  getTableRevenue(quarter: any, year: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "Data/Revenue?quarter=" +
        quarter +
        "&year=" +
        year,
      { headers: headerToken, responseType: "json" }
    );
  }
  sendNoticationFCM(quarter: any, year: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "Data/PushFCM?quarter=" +
        quarter +
        "&year=" +
        year,
      { headers: headerToken, responseType: "json" }
    );
  }
}
