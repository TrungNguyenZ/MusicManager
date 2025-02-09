import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    public dataService: DataService,
  ) {

  }
  year: any
  yearArray: number[] = []
  quarter = 1
  selectedFile!: File;
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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  importExcel() {
    if (!this.selectedFile) {
      this.toastr.warning('Vui lòng chọn file excel!');
      return;
    }

    this.dataService.uploadExcel(this.selectedFile, this.quarter, this.year).subscribe({
      next: (res) => {
        if (res.code == 200) {
          this.toastr.success(res.message)
        } else {
          this.toastr.warning(res.message)
        }
      },
      error: (err) => {
        this.toastr.error('upload file thất bại!')
        console.log(err.error)
      }
    });
  }
  downloadTemplate() {
    this.dataService.downloadTemplate()
  }
}
