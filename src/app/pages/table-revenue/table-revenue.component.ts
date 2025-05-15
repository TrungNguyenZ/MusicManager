import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { PaginationResult, PaginationService } from 'src/app/core/services/pagination.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table-revenue',
  templateUrl: './table-revenue.component.html',
  styleUrls: ['./table-revenue.component.scss']
})
export class TableRevenueComponent implements OnInit {
  // Dữ liệu hiển thị
  data: any[] = [];
  // Dữ liệu gốc
  dataSource: any[] = [];
  // Kết quả phân trang
  paginationResult: PaginationResult<any> = new PaginationResult<any>();
  // Trang hiện tại
  page = 1;
  // Số phần tử trên mỗi trang
  pageSize = 10;
  // Quý, năm và mảng năm
  year: any;
  quarter: any;
  yearArray: number[] = [];

  constructor(
    public service: DataService,
    private paginationService: PaginationService,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.quarter = this.getQuarter();
    this.year = new Date().getFullYear();
    this.getYear();
    this.getList();
  }

  getList() {
    this.service.getTableRevenue(this.quarter, this.year).subscribe({
      next: (x) => {
        if (x && x.data) {
          this.dataSource = [...x.data];
          this.refreshData();
        } else {
          this.dataSource = [];
          this.refreshData();
        }
      },
      error: (err) => {
        console.error("Lỗi khi lấy dữ liệu:", err);
        this.toastrService.error(this.translate.instant('Error'));
        this.dataSource = [];
        this.refreshData();
      }
    });
  }

  refreshData() {
    this.paginationResult = this.paginationService.paginate(this.dataSource, this.page, this.pageSize);
    this.data = this.paginationResult.items;
  }

  onPageChange(page: number) {
    this.page = page;
    this.refreshData();
  }

  // Getter cho các thuộc tính phân trang
  get startIndex(): number {
    return this.paginationResult.startIndex;
  }

  get endIndex(): number {
    return this.paginationResult.endIndex;
  }

  get totalItems(): number {
    return this.paginationResult.totalItems;
  }

  getYear() {
    let year = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.yearArray.push(year);
      year--;
    }
  }

  getQuarter(): number {
    const currentMonth = new Date().getMonth() + 1;
    return Math.ceil(currentMonth / 3);
  }
}
