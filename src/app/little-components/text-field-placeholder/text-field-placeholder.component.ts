import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-text-field-placeholder',
  templateUrl: './text-field-placeholder.component.html',
  styleUrls: ['./text-field-placeholder.component.css']
})
export class TextFieldPlaceholderComponent {
  @Input() placeholder: string;
  @Input() formElement: FormControl;
  @Input() showError: boolean = false;
  @Input() additionalNote: string = '';

  getPlaceholder(): string {
    return this.placeholder + (this.isFieldRequired() ? ' *' : '');
  }

  isFieldRequired(): boolean {
    return this.formElement.hasValidator(Validators.required);
  }
}
