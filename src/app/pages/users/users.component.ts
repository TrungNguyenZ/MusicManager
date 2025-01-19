import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserdApiService } from 'src/app/core/services/user-api.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    public service: UserdApiService,
    public confirmDeleteService: ModalService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public modalService: NgbModal,
    public toastrService: ToastrService,


  ){}
  ngOnInit(): void {
    this.getList()
  }
  data:any
  getList(){
   this.service.getList().subscribe(x=>{
    this.data = x.data
    })
  }
  onDelete(id:any) {
    this.confirmDeleteService.confirm(this.translate.instant('ModalDelete.Content'), this.translate.instant('ModalDelete.Title')).then((result:any) => {
      if (result) {
        this.service.delete(id).subscribe(x=>{
          this.toastrService.success(this.translate.instant('DeleteSuccess'))
          this.getList()
        })
      } 
    }).catch(() => {
    });
  }
  openAddEditModal(isEdit: boolean, userData?: any): void {
    const modalRef = this.modalService.open(AddUpdateUserComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.isEdit = isEdit;
    modalRef.componentInstance.userData = userData;

    modalRef.result.then((result) => {
      if (result) {
        this.getList()
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
        this.getList()
      }
    }).catch(() => {
      console.log('Modal dismissed');
    });
  }
}
