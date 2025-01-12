import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-country-percent',
  templateUrl: './country-percent.component.html',
  styleUrls: ['./country-percent.component.scss']
})
export class CountryPercentComponent implements OnInit {

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
    this.chartData = {
      series: [],
      chart: {
        type: 'pie',
        height: 350
      },
      labels: [], 
      legend: {
        position: 'bottom'
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts: any) => {
          return val.toFixed(1) + '%'; // Hiển thị phần trăm
        }
      },
      tooltip: {
        y: {
          formatter: (val: number) => {
            return val.toLocaleString('en-US') + ' VND'; // Định dạng tooltip
          }
        }
      },
      noData:{
        text: 'Không có dữ liệu để hiển thị', // Nội dung hiển thị khi không có dữ liệu
        align: 'center', // Căn chỉnh
        verticalAlign: 'middle', // Căn giữa theo chiều dọc
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#A0A0A0', // Màu chữ
          fontSize: '16px', // Kích thước chữ
          fontFamily: 'Arial', // Phông chữ
        },
      }
    };
    this.getDataChart()
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
    this.getDataChart()
  }
  getDataChart() {
    this.dashboardApiService.getCountryPercent(this.request).subscribe(x => {
      this.chartData.series = x?.data?.data ?? []
      this.chartData.labels = x?.data?.labels ?? []

    })
  }
  changeYear() {
    this.request.year = this.year
    this.request.quarter = this.quarter
    this.getDataChart()
    // this.getDataTop()
  }
  getQuarter(): number {
    const currentMonth = new Date().getMonth() + 1;
    return Math.ceil(currentMonth / 3);
  }
}

