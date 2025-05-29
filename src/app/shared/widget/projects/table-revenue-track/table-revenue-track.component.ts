import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-table-revenue-track',
  templateUrl: './table-revenue-track.component.html',
  styleUrls: ['./table-revenue-track.component.scss']
})
export class TableRevenueTrackComponent implements OnInit, OnChanges  {

  chartData1: any
  @Input() year: any
  @Input() quarter: any
  yearArray: number[] = []
  typeChart: any = 1
  request: any
  chartData: any
  labels: any
  dataTable: any
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
    this.getData()
  }
  ngOnInit(): void {
    this.request = {
      type: this.typeChart,
      quarter: this.quarter,
      year: this.year
    }
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
    this.dashboardApiService.getRevenueTrack(this.request).subscribe(x => {
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

  // Methods hỗ trợ màu sắc cho progress bar và text dựa trên thứ hạng
  getProgressBarColor(index: number): string {
    switch (index) {
      case 0: // Hạng 1 - Vàng
        return 'linear-gradient(90deg, #ffd700 0%, #ffed4e 100%)';
      case 1: // Hạng 2 - Bạc
        return 'linear-gradient(90deg, #c0c0c0 0%, #e8e8e8 100%)';
      case 2: // Hạng 3 - Đồng
        return 'linear-gradient(90deg, #cd7f32 0%, #daa955 100%)';
      default: // Các hạng khác - Xanh lá
        return 'linear-gradient(90deg, #10b981 0%, #34d399 100%)';
    }
  }

  getProgressTextColor(index: number): string {
    switch (index) {
      case 0: // Hạng 1 - Vàng
        return '#d4af37';
      case 1: // Hạng 2 - Bạc
        return '#8e8e93';
      case 2: // Hạng 3 - Đồng
        return '#cd7f32';
      default: // Các hạng khác - Xanh lá
        return '#10b981';
    }
  }
}

