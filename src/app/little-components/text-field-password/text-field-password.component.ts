import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-text-field-password',
  templateUrl: './text-field-password.component.html',
  styleUrls: ['./text-field-password.component.css']
})
export class TextFieldPasswordComponent {
  @Input() fieldName: string;
  @Input() nextLine: boolean = true;
  @Input() formElement: FormControl;
  @Input() showError: boolean = false;

  isFieldRequired(): boolean {
    return this.formElement.hasValidator(Validators.required);
  }
}
