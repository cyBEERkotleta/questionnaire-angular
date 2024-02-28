import {Component, EventEmitter, Input, Output} from '@angular/core';
import {INamed} from "../../additional/INamed";

@Component({
  selector: 'app-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.css']
})
export class RadioButtonGroupComponent {
  @Input() label: string;
  @Input() required: boolean;
  @Input() objects: INamed[];
  @Input() selected: INamed = null;

  @Output() itemSelection = new EventEmitter<INamed>();

  selectionChanged(item: INamed) {
    this.selected = item;
    this.itemSelection.emit(item);
  }

  isChecked(item: INamed) {
    return !!this.selected && this.selected.shownName == item.shownName;
  }
}
