import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-price-name-percent',
  templateUrl: './price-name-percent.component.html',
  styleUrls: ['./price-name-percent.component.scss']
})
export class PriceNamePercentComponent implements OnInit, OnChanges {

  chartData1: any
   @Input() year:any
   @Input() quarter:any
  yearArray: number[] = []
  typeChart: any = 1
  request = {
    type: 1,
    quarter: 1,
    year: 2024
  }
  chartData: any
  labels: any
  constructor(
    public translate: TranslateService,
    public languageService: LanguageService,
    public dashboardApiService: DashboardApiService,) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.request = {
      type: this.typeChart,
      quarter: this.quarter,
      year: this.year
    }
    this.getDataChart()
  }
  ngOnInit(): void {
    this.request = {
      type: this.typeChart,
      quarter: this.quarter,
      year: this.year
    }
    this.getYear()
    this.chartData = {
      series: [],
      chart: {
        type: 'donut',
        height: 350
      },
      labels: [], 
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontWeight: 600,
                color: '#373d3f',
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: '14px',
                fontWeight: 400,
                color: '#373d3f',
                offsetY: 16,
                formatter: (val: any) => {
                  return val + ' VND'
                }
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Tổng',
                fontSize: '16px',
                fontWeight: 600,
                color: '#373d3f',
                formatter: (w: any) => {
                  const total = w.globals.seriesTotals.reduce((a: any, b: any) => {
                    return a + b
                  }, 0)
                  return total.toLocaleString('en-US') + ' VND'
                }
              }
            }
          }
        }
      },
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
    this.dashboardApiService.getPriceNamePercent(this.request).subscribe(x => {
      this.chartData.series = x?.data?.data ?? []
      this.chartData.labels = x?.data?.labels ?? []
    })
  }
  changeYear() {
    this.request.year = this.year
    this.request.quarter = this.quarter
    this.getDataChart()
  }
  getQuarter(): number {
    const currentMonth = new Date().getMonth() + 1;
    return Math.ceil(currentMonth / 3);
  }
}

