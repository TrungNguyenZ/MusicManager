import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-table-revenue-art',
  templateUrl: './table-revenue-art.component.html',
  styleUrls: ['./table-revenue-art.component.scss']
})
export class TableRevenueArtComponent implements OnInit {

  chartData1: any
  year: any
  yearArray: number[] = []
  typeChart: any = 1
  request = {
    type: 1,
    quarter: 1,
    year: 2024
  }
  chartData: any
  labels: any
  quarter = 1
  dataTable:any
  constructor(
    public translate: TranslateService,
    public languageService: LanguageService,
    public dashboardApiService: DashboardApiService,) {

  }
  ngOnInit(): void {
    this.quarter = this.getQuarter()
    this.request.quarter = this.getQuarter()
    this.year = new Date().getFullYear();
    this.getYear()
    this.getData()
  }
  getYear() {
    let year = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.yearArray.push(year)
      year--
    }
  }
  changeChart(type: any) {
    this.typeChart = type
    this.request.type = type
    this.getData()
  }
  getData() {
    this.dashboardApiService.getRevenueArt(this.request).subscribe(x => {
      this.dataTable = x.data
    })
  }
  changeYear() {
    this.request.year = this.year
    this.request.quarter = this.quarter
    this.getData()
  }
  getQuarter(): number {
    const currentMonth = new Date().getMonth() + 1;
    return Math.ceil(currentMonth / 3);
  }
}

