import {Component, Input} from '@angular/core';
import {ModalEditWindowService} from "../../service/modal-edit-window.service";

@Component({
  selector: 'app-modal-edit-window',
  templateUrl: './modal-edit-window.component.html',
  styleUrls: ['./modal-edit-window.component.css']
})
export class ModalEditWindowComponent {
  @Input() title: string;

  modalService: ModalEditWindowService;

  constructor(modalService: ModalEditWindowService) {
    this.modalService = modalService;
  }
}
