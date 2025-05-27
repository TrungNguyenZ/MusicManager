import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardApiService } from 'src/app/core/services/dashboard-api.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-country-percent',
  templateUrl: './country-percent.component.html',
  styleUrls: ['./country-percent.component.scss']
})
export class CountryPercentComponent implements OnInit, OnChanges {

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
  tableData: any[] = []

  // Mapping cờ quốc gia
  countryFlags: {[key: string]: string} = {
    'United States': 'https://flagcdn.com/32x24/us.png',
    'Brazil': 'https://flagcdn.com/32x24/br.png',
    'France': 'https://flagcdn.com/32x24/fr.png',
    'India': 'https://flagcdn.com/32x24/in.png',
    'Australia': 'https://flagcdn.com/32x24/au.png',
    'Germany': 'https://flagcdn.com/32x24/de.png',
    'Japan': 'https://flagcdn.com/32x24/jp.png',
    'United Kingdom': 'https://flagcdn.com/32x24/gb.png',
    'Canada': 'https://flagcdn.com/32x24/ca.png',
    'Vietnam': 'https://flagcdn.com/32x24/vn.png'
  }

  // Mapping tên quốc gia
  countryNames: {[key: string]: string} = {
    'US': 'United States',
    'BR': 'Brazil', 
    'FR': 'France',
    'IN': 'India',
    'AU': 'Australia',
    'DE': 'Germany',
    'JP': 'Japan',
    'GB': 'United Kingdom',
    'CA': 'Canada',
    'VN': 'Vietnam',
    'OTHER': 'Other'
  }

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
      const data = x?.data?.data ?? []
      const labels = x?.data?.labels ?? []
      
      // Chuyển đổi dữ liệu cho bảng
      this.tableData = data.map((value: number, index: number) => {
        const total = data.reduce((sum: number, val: number) => sum + val, 0)
        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0'
        
        return {
          country: labels[index],
          value: value,
          percentage: percentage
        }
      }).sort((a: any, b: any) => b.value - a.value) // Sắp xếp theo giá trị giảm dần

      // Cập nhật chartData cho trường hợp vẫn cần biểu đồ
      this.chartData.series = data
      this.chartData.labels = labels
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

  // Phương thức định dạng tiền tệ
  formatCurrency(value: number): string {
    return value.toLocaleString('vi-VN') + ' VND'
  }

  // Phương thức lấy cờ quốc gia
  getCountryFlag(countryCode: string): string {
    const countryName = this.getCountryName(countryCode)
    
    // Nếu là "other" hoặc không tìm thấy cờ quốc gia, trả về null để hiển thị icon
    if (countryCode === 'OTHER' || countryName === 'Other' || !this.countryFlags[countryName]) {
      return ''
    }
    
    return this.countryFlags[countryName]
  }

  // Phương thức kiểm tra có phải hiển thị icon hay không
  isOtherCountry(countryCode: string): boolean {
    const countryName = this.getCountryName(countryCode)
    return countryCode === 'OTHER' || countryName === 'Other' || !this.countryFlags[countryName]
  }

  // Phương thức lấy tên quốc gia
  getCountryName(countryCode: string): string {
    return this.countryNames[countryCode] || countryCode
  }
}

