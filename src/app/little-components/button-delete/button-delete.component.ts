import {Component, Input} from '@angular/core';
import {ModalDeleteWindowService} from "../../service/modal-delete-window.service";

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.css']
})
export class ButtonDeleteComponent {
  @Input() deletable: Object;

  modalDeleteWindowService: ModalDeleteWindowService;

  constructor(modalDeleteWindowService: ModalDeleteWindowService) {
    this.modalDeleteWindowService = modalDeleteWindowService;
  }

}
