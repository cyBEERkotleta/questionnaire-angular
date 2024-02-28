import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CheckBoxState} from "../../additional/CheckBoxState";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() text: string;
  @Input() startValue: boolean;

  @Output() itemSelection = new EventEmitter<CheckBoxState>();

  form = new FormGroup({
    check: new FormControl<boolean>(false)
  })

  ngOnInit() {
    this.form.controls.check.setValue(this.startValue);
  }

  selectionChanged() {
    let active = this.form.controls.check.getRawValue();
    let checkBoxState = new CheckBoxState(this.text, active);
    this.itemSelection.emit(checkBoxState);
  }
}
