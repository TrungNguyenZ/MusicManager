import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserdApiService } from 'src/app/core/services/user-api.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { PaginationResult, PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // Dữ liệu hiển thị
  data: any[] = [];
  // Dữ liệu gốc cho phân trang
  dataSource: any[] = [];
  // Dữ liệu gốc toàn bộ
  originalData: any[] = [];
  // Kết quả phân trang
  paginationResult: PaginationResult<any> = new PaginationResult<any>();
  // Trang hiện tại
  page = 1;
  // Số phần tử trên mỗi trang
  pageSize = 10;

  // Biến tìm kiếm
  searchName: string = '';
  searchEmail: string = '';
  searchType: string = 'all'; // all, admin, user

  constructor(
    public service: UserdApiService,
    public confirmDeleteService: ModalService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public modalService: NgbModal,
    public toastrService: ToastrService,
    private paginationService: PaginationService
  ){}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.service.getList().subscribe({
      next: (x) => {
        if (x && x.data) {
          this.originalData = [...x.data];
          this.dataSource = [...x.data];
          this.filterData(); // Luôn lọc lại khi lấy dữ liệu mới
        } else {
          this.originalData = [];
          this.dataSource = [];
          this.filterData();
        }
      },
      error: (err) => {
        console.error("Lỗi khi lấy dữ liệu:", err);
        this.toastrService.error(this.translate.instant('Error'));
        this.originalData = [];
        this.dataSource = [];
        this.filterData();
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

  onDelete(id:any) {
    this.confirmDeleteService.confirm(this.translate.instant('ModalDelete.Content'), this.translate.instant('ModalDelete.Title')).then((result:any) => {
      if (result) {
        this.service.delete(id).subscribe({
          next: (x) => {
            this.toastrService.success(this.translate.instant('DeleteSuccess'));
            this.getList();
          },
          error: (err) => {
            console.error("Lỗi khi xóa:", err);
            this.toastrService.error(this.translate.instant('Error'));
          }
        });
      } 
    }).catch(() => {
      // Người dùng đã hủy xác nhận
    });
  }

  openAddEditModal(isEdit: boolean, userData?: any): void {
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

  openResetPasswordModal(userId:any): void {
    const modalRef = this.modalService.open(ChangePasswordModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userId = userId;

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
    // Lọc theo tên
    if (this.searchName) {
      filteredData = filteredData.filter(item => 
        item.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
    // Lọc theo email
    if (this.searchEmail) {
      filteredData = filteredData.filter(item => 
        item.email.toLowerCase().includes(this.searchEmail.toLowerCase())
      );
    }
    // Lọc theo loại tài khoản
    if (this.searchType !== 'all') {
      filteredData = filteredData.filter(item => {
        if (this.searchType === 'admin') {
          return item.isAdmin;
        } else {
          return !item.isAdmin;
        }
      });
    }
    this.dataSource = filteredData;
    this.page = 1;
    this.refreshData();
  }


}
