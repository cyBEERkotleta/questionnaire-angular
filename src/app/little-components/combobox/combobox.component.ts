import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {INamed} from "../../additional/INamed";

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css']
})
export class ComboboxComponent implements OnInit {
  @Input() label: string;
  @Input() required: boolean;
  @Input() objects: INamed[];
  @Input() selected: INamed = null;

  @Output() itemSelection = new EventEmitter<INamed>();

  ngOnInit() {
    if (!this.selected)
      return;

    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].shownName == this.selected.shownName) {
        this.selected = this.objects[i];
        break;
      }
    }
  }

  onSelectionChanged() {
    this.itemSelection.emit(this.selected);
  }
}
