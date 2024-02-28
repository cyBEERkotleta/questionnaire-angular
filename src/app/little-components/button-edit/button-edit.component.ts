import {Component, Input} from '@angular/core';
import {ModalEditWindowService} from "../../service/modal-edit-window.service";

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.css']
})
export class ButtonEditComponent {
  @Input() editable: Object;

  modalEditWindowService: ModalEditWindowService;

  constructor(modalEditWindowService: ModalEditWindowService) {
    this.modalEditWindowService = modalEditWindowService;
  }
}
