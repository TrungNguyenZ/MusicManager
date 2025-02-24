import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-revenuec-digital-total',
  templateUrl: './revenuec-digital-total.component.html',
  styleUrls: ['./revenuec-digital-total.component.scss']
})
export class RevenuecDigitalTotalComponent implements OnInit, OnChanges {

  constructor(
    public translate: TranslateService,
    public languageService: LanguageService,
    public dashboardApiService: DashboardApiService,
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.request = {
      type: this.typeChart,
      quarter: 1,
      year: this.year
    }
    this.getDataTop();
    this.getDataChart();
  }
  @Input() year:any
  yearArray : number[] = []
  typeChart: any = 1
  request:any
  data:any
  chart: any
  plotOptions = {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded"
    }
  }
  legend: any
  dataLabels = {
    enabled: false
  }
  series = []
  xaxis = {categories:[]}
  tooltip= {
    y: {
      formatter: (val: number) => {
        return val.toLocaleString('en-US') + ' VND'; // Định dạng tooltip
      }
    }
  }
  noData:any
  colors:any
  ngOnInit(): void {
    this.request = {
      type: this.typeChart,
      quarter: 1,
      year: this.year
    }
    this.getYear()
    this.chart = {
      type: "bar",
      toolbar: false,
      height: 350
    }
    this.legend = {
      position: 'bottom'
    }
    this.noData = {
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


    this.getDataTop();
    this.getDataChart();
  }
  getDataTop() {
    this.dashboardApiService.getTop(this.request).subscribe(x => {
      this.data = x.data
    })
  }
  getDataChart() {
    this.dashboardApiService.getDigitalTotal(this.request).subscribe(x => {
      this.series = x.data?.data ?? []
      this.xaxis = {
        categories: x.data?.categories ?? []
      }
    })
  }
  changeChart(type:any) {
    this.typeChart = type
    this.request.type = type
    this.getDataChart()
    this.getDataTop()
  }
  changeYear() {
    this.request.year = this.year
    this.getDataChart()
    this.getDataTop()
  }
  getYear(){
    let year = new Date().getFullYear();
    for(let i = 0; i<3; i++){
      this.yearArray.push(year)
      year--
    }
  }
}
