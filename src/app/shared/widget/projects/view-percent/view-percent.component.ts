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
    'Apple Music': '#A855F7',
    'Facebook': '#06B6D4',
    'Other': '#10B981',
    'Snap Inc': '#6B7280',
    'TikTok': '#EF4444',
    'YouTube': '#F97316'
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
          horizontal: true,
          columnWidth: '55%',
          endingShape: 'rounded',

        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 10,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#fff']
        },
        formatter: function (val: number, opts: any) {
          return opts.w.globals.labels[opts.dataPointIndex]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      grid: {
        padding: {
          top: 0,
          right: 50,
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