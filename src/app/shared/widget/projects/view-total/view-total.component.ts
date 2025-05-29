import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

interface ViewData {
  quarterYear: number;
  digitalServiceProvider: string;
  sum: number;
}

interface GridItem {
  name: string;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-view-total',
  templateUrl: './view-total.component.html',
  styleUrls: ['./view-total.component.scss']
})
export class ViewTotalComponent implements OnInit, OnChanges {
  @Input() year: number = new Date().getFullYear();
  yearArray: number[] = []
  chartData: any
  gridData: GridItem[] = []

  // Mảng màu sắc cho các item
  private colors: string[] = [
    '#A855F7', // Apple Music
    '#06B6D4', // Facebook  
    '#10B981', // Other
    '#6B7280', // Snap Inc
    '#EF4444', // TikTok
    '#F97316'  // YouTube
  ];
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
        type: 'pie',
        height: 400
      },
      labels: [],
      legend: {
        position: 'bottom'
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => {
          return val.toFixed(1) + '%';
        }
      },
      tooltip: {
        y: {
          formatter: (val: number) => {
            return val.toLocaleString('en-US') + ' lượt xem';
          }
        }
      },
      noData: {
        text: 'Không có dữ liệu để hiển thị',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#A0A0A0',
          fontSize: '16px',
          fontFamily: 'Arial',
        },
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
          const total = x.data.reduce((sum: number, item: ViewData) => sum + item.sum, 0);
          const data = x.data.map((item: ViewData) => {
            const percentage = (item.sum / total) * 100;
            return Number(percentage.toFixed(1));
          });
          const labels = x.data.map((item: ViewData) => item.digitalServiceProvider);
          
          this.chartData.series = data;
          this.chartData.labels = labels;

          this.gridData = data.map((percentage: number, index: number) => ({
            name: labels[index],
            percentage: percentage,
            color: this.colors[index % this.colors.length]
          }));
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