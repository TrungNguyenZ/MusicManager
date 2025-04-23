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
export class DashboardApiService {
  constructor(
    private http: HttpClient,
    public _cookiesService: CookieService
  ) {}
  // Get
  // getData(): Observable<any> {
  //   return this.http.post(GlobalComponent.API_URL + 'statistic/total', {  headers: headerToken, responseType: 'text' });
  // }
  getData(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "statistic/total?quarter=" +
        input.quarter +
        "&quarterYear=" +
        input.year,
      { headers: headerToken, responseType: "json" }
    );
  }
  getTop(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "statistic/top?type=" +
        input.type +
        "&quarter=" +
        input.quarter +
        "&year=" +
        input.year,
      { headers: headerToken, responseType: "json" }
    );
  }
  getDigitalTotal(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    const lang = this._cookiesService.get("lang");
    return this.http.get(
      GlobalComponent.API_URL +
        "statistic/digital-total?type=" +
        input.type +
        "&year=" +
        input.year +
        "&language=" +
        lang,
      { headers: headerToken, responseType: "json" }
    );
  }
  getDigitalPercent(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "statistic/digital-percent?type=" +
        input.type +
        "&quarter=" +
        input.quarter +
        "&year=" +
        input.year,
      { headers: headerToken, responseType: "json" }
    );
  }
  getCountryPercent(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "statistic/country-percent?type=" +
        input.type +
        "&quarter=" +
        input.quarter +
        "&year=" +
        input.year,
      { headers: headerToken, responseType: "json" }
    );
  }
  getYoutubePercent(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "statistic/youtube-percent?type=" +
        input.type +
        "&quarter=" +
        input.quarter +
        "&year=" +
        input.year,
      { headers: headerToken, responseType: "json" }
    );
  }
  getPriceNamePercent(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "statistic/price-name-percent?type=" +
        input.type +
        "&quarter=" +
        input.quarter +
        "&year=" +
        input.year,
      { headers: headerToken, responseType: "json" }
    );
  }
  getRevenueArt(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "TopChart/artist?type=" +
        input.type +
        "&quarter=" +
        input.quarter +
        "&year=" +
        input.year,
      { headers: headerToken, responseType: "json" }
    );
  }
  getRevenueTrack(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "TopChart/Track?type=" +
        input.type +
        "&quarter=" +
        input.quarter +
        "&year=" +
        input.year,
      { headers: headerToken, responseType: "json" }
    );
  }
  getView(input: any): Observable<any> {
    const headerToken = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return this.http.get(
      GlobalComponent.API_URL +
        "statistic/view?year=" +
        input,
      { headers: headerToken, responseType: "json" }
    );
  }
}
