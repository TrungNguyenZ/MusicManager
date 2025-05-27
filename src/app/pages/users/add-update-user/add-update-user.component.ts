import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserdApiService } from 'src/app/core/services/user-api.service';
import { GlobalComponent } from '../../../global-component';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit {
  @Input() isEdit: boolean = false; // Xác định chế độ (thêm hoặc sửa)
  @Input() userData: any;          // Dữ liệu khi sửa

  form: FormGroup;
  imageFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: UserdApiService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      name: ['', Validators.required],
      phone: [''],
      email: [''],
      isAdmin: [false],
      isEnterprise: [false]
    });
  }

  ngOnInit(): void {
    // Khởi tạo form
    if(!this.isEdit){
      this.form = this.fb.group({
        userName: [this.userData?.userName || '', Validators.required],
        email: [this.userData?.email || '', [Validators.email]],
        phone: [this.userData?.phoneNumber || ''],
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
        phone: [this.userData?.phoneNumber || ''],
        artistName: [this.userData?.artistName || ''],
        name: [this.userData?.name || '', Validators.required],
        revenuePercentage: [this.userData?.RevenuePercentage || 50],
        isAdmin: [this.userData?.isAdmin || false],
        isEnterprise: [this.userData?.isEnterprise || false],
        password: [''],
        passwordConfirm: [''],
      });
      
      // Hiển thị ảnh nếu có
      if (this.userData?.imageUrl) {
        this.imagePreview = GlobalComponent.API_URL + this.userData.imageUrl;
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      // Tạo preview cho ảnh
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    if (this.form.value.password != this.form.value.passwordConfirm) {
      this.toastr.warning(this.translate.instant('PasswordNotMatch'))
      return
    }
    if (this.form.invalid) return;
    
    // Tạo FormData để gửi cả dữ liệu form và file
    const formData = new FormData();
    
    // Thêm các trường dữ liệu từ form
    Object.keys(this.form.value).forEach(key => {
      formData.append(key, this.form.value[key]);
    });
    
    // Thêm file ảnh nếu có
    if (this.imageFile) {
      formData.append('Image', this.imageFile);
    }
    
    if (this.isEdit) {
      formData.append('id', this.userData.id);
      this.api.update(formData).subscribe(x => {
        this.activeModal.close(true);
        this.toastr.success(this.translate.instant('UpdateSuccess'))
      })
    } else {
      this.api.create(formData).subscribe(x => {
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
