import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CheckBoxState} from "../../additional/CheckBoxState";

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css']
})
export class CheckboxGroupComponent {
  @Input() fieldName: string;
  @Input() required: boolean = false;
  @Input() formElement: FormControl<CheckBoxState[]>;
  @Input() showError: boolean = false;

  @Input() optionNames: string[];

  selectedOptions: CheckBoxState[] = [];

  onChange(checkBoxState: CheckBoxState) {
    this.removeStateFromSelectedOptions(checkBoxState);
    if (checkBoxState.active)
      this.selectedOptions.push(checkBoxState);

    this.formElement.setValue(this.selectedOptions);
  }

  private removeStateFromSelectedOptions(checkBoxState: CheckBoxState) {
    this.selectedOptions = this.selectedOptions
      .filter(opt => opt.text != checkBoxState.text);
  }
}
