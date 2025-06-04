import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalComponent } from 'src/app/global-component';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {
  @Input() userData: any;
  
  activeTab: string = 'info'; // 'info', 'update', 'password'
  isLoading: boolean = false;
  
  updateForm: FormGroup;
  passwordForm: FormGroup;
  
  passwordMismatch: boolean = false;
  selectedFile: File | null = null;
  previewImage: string | null = null;
  API_URL = GlobalComponent.API_URL;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['']
    });
    
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Initialize form with user data when available
    if (this.userData) {
      this.updateForm.patchValue({
        name: this.userData.name || '',
        email: this.userData.email || '',
        phone: this.userData.phone || ''
      });
    }
  }

  close(): void {
    this.activeModal.close();
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.toastr.error('Kích thước file không được vượt quá 5MB');
        return;
      }

      // Kiểm tra định dạng file
      if (!file.type.match(/image\/(jpeg|png)/)) {
        this.toastr.error('Chỉ chấp nhận file ảnh định dạng JPG hoặc PNG');
        return;
      }

      this.selectedFile = file;
      
      // Tạo preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  getImageUrl(imageUrl: string | null): string {
    if (!imageUrl) {
      return 'assets/images/users/avatar-1.jpg';
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return this.API_URL + imageUrl;
  }

  onUpdateProfile(): void {
    if (this.updateForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    const { name, email, phone } = this.updateForm.value;
    
    // Tạo FormData để gửi cả file ảnh
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    
    this.authService.updateUserProfile(formData).subscribe(
      (res) => {
        this.isLoading = false;
        if (res && res.isSuccess) {
          this.toastr.success('Cập nhật thông tin thành công!');
          
          // Update user data in the component
          this.userData = {
            ...this.userData,
            name,
            email,
            phone,
            imageUrl: res.data.imageUrl || this.userData.imageUrl
          };
          
          // Cập nhật imageUrl trong localStorage
          if (res.data) {
            localStorage.setItem('userImageUrl', res.data);
          }
          
          // Reset preview image
          this.previewImage = null;
          this.selectedFile = null;
          
          // Switch back to info tab
          this.activeTab = 'info';
        } else {
          this.toastr.error(res.message || 'Cập nhật thông tin thất bại!');
        }
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Đã xảy ra lỗi khi cập nhật thông tin!');
        console.error('Update profile error:', error);
      }
    );
  }
  
  onChangePassword(): void {
    const { oldPassword, newPassword, confirmPassword } = this.passwordForm.value;
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }
    
    this.passwordMismatch = false;
    
    if (this.passwordForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    
    this.authService.changePassword(oldPassword, newPassword).subscribe(
      (res) => {
        this.isLoading = false;
        if (res && res.isSuccess) {
          this.toastr.success('Đổi mật khẩu thành công!');
          this.passwordForm.reset();
          
          // Switch back to info tab
          this.activeTab = 'info';
        } else {
          this.toastr.error(res.message || 'Đổi mật khẩu thất bại!');
        }
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Đã xảy ra lỗi khi đổi mật khẩu!');
        console.error('Change password error:', error);
      }
    );
  }
} 