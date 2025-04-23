import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

interface ViewData {
  quarterYear: number;
  digitalServiceProvider: string;
  sum: number;
}

@Component({
  selector: 'app-view-percent',
  templateUrl: './view-percent.component.html',
  styleUrls: ['./view-percent.component.scss']
})
export class ViewPercentComponent implements OnInit, OnChanges {
  @Input() year: number = new Date().getFullYear();
  yearArray: number[] = []
  chartData: any

  // Định nghĩa màu cố định cho từng nền tảng
  private platformColors: { [key: string]: string } = {
    'Apple Music': '#FF4560',
    'Facebook': '#008FFB',
    'Other': '#00E396',
    'Snap Inc': '#775DD0',
    'TikTok': '#FEB019',
    'YouTube': '#FF4560'
  };

  constructor(
    public translate: TranslateService,
    public languageService: LanguageService,
    public dashboardApiService: DashboardApiService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['year']) {
      this.getDataChart()
    }
  }

  ngOnInit(): void {
    this.getYear()
    this.chartData = {
      series: [],
      chart: {
        type: 'bar',
        height: 400,
        stacked: false,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          distributed: true,
          colors: {
            ranges: [
              {
                from: 0,
                to: 1000000,
                color: '#FF4560'
              },
              {
                from: 1000000,
                to: 5000000,
                color: '#00E396'
              },
              {
                from: 5000000,
                to: 10000000,
                color: '#008FFB'
              },
              {
                from: 10000000,
                to: 50000000,
                color: '#775DD0'
              },
              {
                from: 50000000,
                to: 100000000,
                color: '#FEB019'
              },
              {
                from: 100000000,
                to: 1000000000,
                color: '#FF4560'
              }
            ]
          }
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: '12px'
          }
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        }
      },
      yaxis: {
        title: {
          text: 'Lượt xem'
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        }
      },
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: (val: number) => {
            return val.toLocaleString('en-US') + ' lượt xem'
          }
        }
      }
    };
    this.getDataChart()
  }

  getYear() {
    const currentYear = new Date().getFullYear();
    this.yearArray = [currentYear, currentYear - 1, currentYear - 2];
  }

  getDataChart() {
    this.dashboardApiService.getView(this.year).subscribe({
      next: (x) => {
        if (x?.data) {
          const data = x.data.map((item: ViewData) => item.sum);
          const labels = x.data.map((item: ViewData) => item.digitalServiceProvider);
          
          // Tạo series với màu cố định cho từng nền tảng
          this.chartData.series = [{
            name: 'Lượt xem',
            data: data.map((_: number, index: number) => ({
              x: labels[index],
              y: data[index],
              fillColor: this.platformColors[labels[index]] || '#FF4560'
            }))
          }];
          this.chartData.xaxis.categories = labels;
        }
      },
      error: (error) => {
        console.error('Error fetching view data:', error);
      }
    });
  }

  changeYear() {
    this.getDataChart()
  }
} 