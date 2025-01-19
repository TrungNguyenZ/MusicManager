import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteModalComponent } from '../widget/modal/confirm-delete-modal/confirm-delete-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  confirm(message: string, title: string = 'Xác nhận xóa'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, { centered: true });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;

    return modalRef.result; // Trả về Promise<boolean>
  }
}
