import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CheckBoxState} from "../../additional/CheckBoxState";

@Component({
  selector: 'app-checkbox-single',
  templateUrl: './checkbox-single.component.html',
  styleUrls: ['./checkbox-single.component.css']
})
export class CheckboxSingleComponent {
  @Input() fieldName: string;
  @Input() formElement: FormControl<boolean>;

  onChange(checkBoxState: CheckBoxState) {
    this.formElement.setValue(checkBoxState.active);
  }
}
