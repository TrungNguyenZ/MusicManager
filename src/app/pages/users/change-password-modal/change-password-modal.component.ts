import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserdApiService } from 'src/app/core/services/user-api.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {
  @Input() userId: any;          // Dữ liệu khi sửa

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public translate: TranslateService,
    private toastr: ToastrService,
    private api: UserdApiService,

  ) { }

  ngOnInit(): void {
    // Khởi tạo form

      this.form = this.fb.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      });
    }

  

  save(): void {
    if (this.form.value.password != this.form.value.passwordConfirm) {
      this.toastr.warning(this.translate.instant('PasswordNotMatch'))
      return
    }
    if (this.form.invalid) return;

      const req = {
        id: this.userId,
        newPassword: this.form.value.password
      }
      this.api.resetPassword(req).subscribe(x=>{
        if(x.code == 200){
          this.activeModal.close(true);
          this.toastr.success(this.translate.instant('ResetPasswordSuccess'))
        }else{
          this.toastr.warning(x.message)
        }

      })

  }

  close(): void {
    this.activeModal.dismiss('Modal closed');
  }

}
