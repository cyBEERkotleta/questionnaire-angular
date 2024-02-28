import { Component } from '@angular/core';
import {ModalEditWindowService} from "../../service/modal-edit-window.service";
import {ModalCreateWindowService} from "../../service/modal-create-window.service";
import {ModalDeleteWindowService} from "../../service/modal-delete-window.service";

@Component({
  selector: 'app-my-forms-page',
  templateUrl: './my-forms-page.component.html',
  styleUrls: ['./my-forms-page.component.css']
})
export class MyFormsPageComponent {
  modalCreateWindow: ModalCreateWindowService;
  modalEditWindow: ModalEditWindowService;
  modalDeleteWindow: ModalDeleteWindowService;

  constructor(modalCreateWindow: ModalCreateWindowService,
              modalEditWindow: ModalEditWindowService,
              modalDeleteWindow: ModalDeleteWindowService) {
    this.modalCreateWindow = modalCreateWindow;
    this.modalEditWindow = modalEditWindow;
    this.modalDeleteWindow = modalDeleteWindow;
  }
}
