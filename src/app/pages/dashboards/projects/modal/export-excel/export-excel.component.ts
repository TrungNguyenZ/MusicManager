import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/account/login/toast-service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {
constructor(
  public activeModal: NgbActiveModal,
  public dataService: DataService,
  private toastr: ToastrService,
){
  
}
  year: any
  yearArray: number[] = []
  quarter = 1
  ngOnInit(): void {
    this.quarter = this.getQuarter()
    this.year = new Date().getFullYear();
    this.getYear()
  }
  getYear() {
    let year = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.yearArray.push(year)
      year--
    }
  }
  getQuarter(): number {
    const currentMonth = new Date().getMonth() + 1;
    return Math.ceil(currentMonth / 3);
  }
  close(): void {
    this.activeModal.dismiss('Modal closed');
  }
  downloadExcel() {

    this.dataService.exportExcel(this.quarter, this.year).subscribe({
      next: (response:any) => {

        const contentType = response.headers.get('content-type');

        // Kiểm tra nếu response là JSON (thông báo không có dữ liệu)
        if (contentType?.includes('application/json')) {
          const reader = new FileReader();
          reader.onload = () => {
            const result = JSON.parse(reader.result as string);
            if (result.code === 204) {
              this.toastr.warning(result.message || 'Không có dữ liệu!');
            } else {
              this.toastr.error('Có lỗi xảy ra!');
            }
          };
          reader.readAsText(response.body as Blob);
        } else {
          // Tải xuống file Excel
          const blob = new Blob([response.body!], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ExportedData_${this.quarter}_${this.year}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      },
      error: (err) => {
        this.toastr.error('Có lỗi xảy ra khi tải file.');
      },
    });
  }
}
