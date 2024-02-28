import {Component, Input} from '@angular/core';
import {ModalCreateWindowService} from "../../service/modal-create-window.service";

@Component({
  selector: 'app-modal-create-window',
  templateUrl: './modal-create-window.component.html',
  styleUrls: ['./modal-create-window.component.css']
})
export class ModalCreateWindow {
  @Input() title: string;

  modalService: ModalCreateWindowService;

  constructor(modalService: ModalCreateWindowService) {
    this.modalService = modalService;
  }
}
