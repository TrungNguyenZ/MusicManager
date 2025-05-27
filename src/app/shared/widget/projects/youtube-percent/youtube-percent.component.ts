import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-youtube-percent',
  templateUrl: './youtube-percent.component.html',
  styleUrls: ['./youtube-percent.component.scss']
})
export class YoutubePercentComponent implements OnInit, OnChanges  {

  chartData1: any
  @Input() year:any
    @Input() quarter:any
  yearArray: number[] = []
  typeChart: any = 1
  request:any
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
        height: 350,
        width: 350
      },
      labels: [], 
      legend: {
        position: 'bottom',
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          radius: 12,
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts: any) => {
          return val.toFixed(1) + '%'; // Hiển thị phần trăm
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['#fff']
        },
        dropShadow: {
          enabled: false
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                label: 'Tổng',
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: '#373d3f',
                formatter: function (w: any) {
                  const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                  return total.toLocaleString('vi-VN') + ' VND';
                }
              }
            }
          }
        }
      },
      colors: ['#FF8C42', '#FFB366', '#FFCC80', '#FFE0B3', '#FFF2E6'],
      stroke: {
        show: false
      },
      tooltip: {
        y: {
          formatter: (val: number) => {
            return val.toLocaleString('vi-VN') + ' VND'; // Định dạng tooltip
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
    this.dashboardApiService.getYoutubePercent(this.request).subscribe(x => {
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

