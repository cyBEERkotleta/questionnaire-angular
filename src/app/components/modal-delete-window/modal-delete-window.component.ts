import {Component, Input} from '@angular/core';
import {ModalDeleteWindowService} from "../../service/modal-delete-window.service";

@Component({
  selector: 'app-modal-delete-window',
  templateUrl: './modal-delete-window.component.html',
  styleUrls: ['./modal-delete-window.component.css']
})
export class ModalDeleteWindowComponent {
  @Input() title: string;

  modalService: ModalDeleteWindowService;

  constructor(modalService: ModalDeleteWindowService) {
    this.modalService = modalService;
  }
}
