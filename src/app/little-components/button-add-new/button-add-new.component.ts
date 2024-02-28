import { Component } from '@angular/core';
import {ModalCreateWindowService} from "../../service/modal-create-window.service";

@Component({
  selector: 'app-button-add-new',
  templateUrl: './button-add-new.component.html',
  styleUrls: ['./button-add-new.component.css']
})
export class ButtonAddNewComponent {
  modalCreateWindowService: ModalCreateWindowService;

  constructor(modalCreateWindowService: ModalCreateWindowService) {
    this.modalCreateWindowService = modalCreateWindowService;
  }
}
