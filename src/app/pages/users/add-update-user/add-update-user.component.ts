import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserdApiService } from 'src/app/core/services/user-api.service';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit {
  @Input() isEdit: boolean = false; // Xác định chế độ (thêm hoặc sửa)
  @Input() userData: any;          // Dữ liệu khi sửa

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
    if(!this.isEdit){
      this.form = this.fb.group({
        userName: [this.userData?.userName || '', Validators.required],
        email: [this.userData?.email || '', [Validators.email]],
        phone: [this.userData?.phone || ''],
        artistName: [this.userData?.artistName || ''],
        name: [this.userData?.name || '', Validators.required],
        revenuePercentage: [this.userData?.RevenuePercentage || 50],
        isAdmin: [this.userData?.isAdmin || false],
        isEnterprise: [this.userData?.isEnterprise || false],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      });
    }else{
      this.form = this.fb.group({
        userName: [this.userData?.userName || '', Validators.required],
        email: [this.userData?.email || '', [Validators.email]],
        phone: [this.userData?.phone || ''],
        artistName: [this.userData?.artistName || ''],
        name: [this.userData?.name || '', Validators.required],
        revenuePercentage: [this.userData?.RevenuePercentage || 50],
        isAdmin: [this.userData?.isAdmin || false],
        isEnterprise: [this.userData?.isEnterprise || false],
        password: [''],
        passwordConfirm: [''],
      });
    }

  }

  save(): void {
    if (this.form.value.password != this.form.value.passwordConfirm) {
      this.toastr.warning(this.translate.instant('PasswordNotMatch'))
      return
    }
    if (this.form.invalid) return;
    if (this.isEdit) {
      const req = {
        id:this.userData.id,
        ...this.form.value
      }
      this.api.update(req).subscribe(x=>{
        console.log(x);
        
        this.activeModal.close(true);
        this.toastr.success(this.translate.instant('UpdateSuccess'))
      })
    } else {
      this.api.create(this.form.value).subscribe(x => {
        if (x.code == 200) {
          this.activeModal.close(true);
          this.toastr.success(this.translate.instant('AddNewSuccess'))
        } else if (x.code == 409) {
          this.toastr.warning(this.translate.instant('UsernameExist'))
        }
        return
      })
    }

  }

  close(): void {
    this.activeModal.dismiss('Modal closed');
  }

}
