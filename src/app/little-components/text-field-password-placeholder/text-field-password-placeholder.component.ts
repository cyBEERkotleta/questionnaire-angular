import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-text-field-password-placeholder',
  templateUrl: './text-field-password-placeholder.component.html',
  styleUrls: ['./text-field-password-placeholder.component.css']
})
export class TextFieldPasswordPlaceholderComponent {
  @Input() placeholder: string;
  @Input() formElement: FormControl;
  @Input() showError: boolean = false;

  getPlaceholder(): string {
    return this.placeholder + (this.isFieldRequired() ? ' *' : '');
  }

  isFieldRequired(): boolean {
    return this.formElement.hasValidator(Validators.required);
  }
}
