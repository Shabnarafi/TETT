import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() message;
  @Input() header;
  @Output() clickEvent = new EventEmitter();
  value: boolean = true;

  constructor(public activeModal: NgbActiveModal) {
  }

  cancelModal() {
    this.clickEvent.emit(this.value);
    this.activeModal.close('Close click');
  }
  ngOnInit() {
  }

}
