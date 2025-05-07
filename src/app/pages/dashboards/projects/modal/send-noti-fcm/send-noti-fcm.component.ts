import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/core/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-send-noti-fcm',
  templateUrl: './send-noti-fcm.component.html',
  styleUrls: ['./send-noti-fcm.component.scss']
})
export class SendNotiFCMComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    public dataService: DataService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  year: any;
  yearArray: number[] = [];
  quarter = 1;

  ngOnInit(): void {
    this.quarter = this.getQuarter();
    this.year = new Date().getFullYear();
    this.getYear();
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

  close(): void {
    this.activeModal.dismiss('Modal closed');
  }

  sendNotification() {
    this.spinner.show();
    this.dataService.sendNoticationFCM(this.quarter, this.year).subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.toastr.success(res.message);
          this.close();
        } else {
          this.toastr.warning(res.message);
        }
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error('Gửi thông báo thất bại!');
        this.spinner.hide();
      }
    });
  }
}
