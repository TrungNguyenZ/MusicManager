import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateUserComponent } from '../users/add-update-user/add-update-user.component';
import { PaginationResult, PaginationService } from 'src/app/core/services/pagination.service';

interface RevenueResponse {
  data: RevenueItem[];
  success: boolean;
  message: string;
}

interface RevenueItem {
  name: string;
  email: string;
  userName: string;
  phoneNumber: string;
  isEnterprise: boolean;
  revenuePercentage: number;
  totalNetIncome: number;
  userRevenue: number;
}

@Component({
  selector: 'app-table-revenue',
  templateUrl: './table-revenue.component.html',
  styleUrls: ['./table-revenue.component.scss']
})
export class TableRevenueComponent implements OnInit {
  // Dữ liệu hiển thị
  data: RevenueItem[] = [];
  // Dữ liệu gốc cho phân trang
  dataSource: RevenueItem[] = [];
  // Dữ liệu gốc toàn bộ
  originalData: RevenueItem[] = [];
  // Kết quả phân trang
  paginationResult: PaginationResult<RevenueItem> = new PaginationResult<RevenueItem>();
  // Trang hiện tại
  page = 1;
  // Số phần tử trên mỗi trang
  pageSize = 10;

  // Quý, năm và mảng năm
  year: number = new Date().getFullYear();
  quarter: number = Math.ceil((new Date().getMonth() + 1) / 3);
  yearArray: number[] = [];

  // Biến tìm kiếm
  searchNameOrEmail: string = '';
  searchPhone: string = '';
  searchType: string = 'all';

  constructor(
    public service: DataService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public modalService: NgbModal,
    public toastrService: ToastrService,
    private paginationService: PaginationService
  ){}

  ngOnInit(): void {
    this.getYear();
    this.getList();
  }

  getList(){
    this.service.getTableRevenue(this.quarter, this.year).subscribe({
      next: (response: RevenueResponse) => {
        if (response && response.data) {
          this.originalData = [...response.data];
          this.dataSource = [...response.data];
          this.filterData(); // Luôn lọc lại khi lấy dữ liệu mới
        } else {
          this.originalData = [];
          this.dataSource = [];
          this.filterData();
        }
      },
      error: (error: any) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
        this.toastrService.error(this.translate.instant('Error'));
        this.originalData = [];
        this.dataSource = [];
        this.filterData();
      }
    });
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

  openAddEditModal(isEdit: boolean, userData?: RevenueItem): void {
    const modalRef = this.modalService.open(AddUpdateUserComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.isEdit = isEdit;
    modalRef.componentInstance.userData = userData;

    modalRef.result.then((result) => {
      if (result) {
        this.getList();
      }
    }).catch(() => {
      console.log('Modal dismissed');
    });
  }

  // Hàm lọc dữ liệu
  filterData() {
    let filteredData = [...this.originalData];
    
    // Lọc theo tên hoặc email (điều kiện OR)
    if (this.searchNameOrEmail) {
      filteredData = filteredData.filter(item => 
        item.userName.toLowerCase().includes(this.searchNameOrEmail.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchNameOrEmail.toLowerCase())
      );
    }

    // Lọc theo số điện thoại
    if (this.searchPhone) {
      filteredData = filteredData.filter(item => 
        item.phoneNumber.toLowerCase().includes(this.searchPhone.toLowerCase())
      );
    }

    // Lọc theo loại tài khoản
    if (this.searchType !== 'all') {
      filteredData = filteredData.filter(item => {
        if (this.searchType === 'enterprise') {
          return item.isEnterprise;
        } else {
          return !item.isEnterprise;
        }
      });
    }

    this.dataSource = filteredData;
    this.page = 1;
    this.refreshData();
  }
}
