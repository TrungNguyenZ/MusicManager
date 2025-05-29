import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-digital-percent',
  templateUrl: './digital-percent.component.html',
  styleUrls: ['./digital-percent.component.scss']
})
export class DigitalPercentComponent implements OnInit, OnChanges {

  chartData1: any
  @Input() year:any
  @Input() quarter:any
  yearArray: number[] = []
  typeChart: any = 1
  request:any
  chartData: any
  labels: any
  
  // Mảng màu sắc tùy chỉnh cho chart
  private chartColors: string[] = [
    '#3B82F6', // Xanh dương
    '#10B981', // Xanh lá cây
    '#F59E0B', // Vàng cam
    '#EF4444', // Đỏ
    '#8B5CF6', // Tím
    '#EC4899', // Hồng
    '#14B8A6', // Cyan
    '#F97316', // Cam
    '#6366F1', // Indigo
    '#84CC16'  // Xanh lá sáng
  ];
  
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
      colors: this.chartColors, // Thêm cấu hình màu
      labels: [], 
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
                formatter: function (val: any) {
                  return val
                }
              },
              value: {
                show: true,
                fontSize: '14px',
                fontWeight: 400,
                color: undefined,
                offsetY: 16,
                formatter: function (val: any) {
                  // Chuyển đổi val thành số và format
                  const numVal = parseFloat(val);
                  return numVal.toLocaleString('en-US') + ' VND'
                }
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Tổng',
                fontSize: '16px',
                fontWeight: 600,
                color: '#373d3f',
                formatter: function (w: any) {
                  const total = w.globals.seriesTotals.reduce((a: any, b: any) => {
                    return a + b
                  }, 0)
                  return total.toLocaleString('en-US') + ' VND'
                }
              }
            }
          }
        },
        states: {
          hover: {
            filter: {
              type: 'lighten',
              value: 0.15
            }
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: 'darken',
              value: 0.35
            }
          }
        }
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
    this.dashboardApiService.getDigitalPercent(this.request).subscribe(x => {
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

