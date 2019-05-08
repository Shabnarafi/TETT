import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../layout/components/popup/popup.component';


@Injectable()
export class ModalService {

  modalRef: any;

  constructor(private modService: NgbModal) {
  }
  openModal(headerMessage, message) {
    this.modalRef = this.modService.open(PopupComponent, { windowClass: 'dark-modal', backdrop: "static", keyboard: false });
    this.modalRef.componentInstance.message = message;
    this.modalRef.componentInstance.header = headerMessage;
    let promise = new Promise((resolve, reject) => {
      this.modalRef.componentInstance.clickEvent.subscribe(($e) => {
        resolve($e);
      })
    })
    return promise;
  }

  closeModal() {
    this.modalRef.dismiss('auto close');
  }

}