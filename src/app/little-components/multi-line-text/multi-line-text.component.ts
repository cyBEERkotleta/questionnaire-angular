import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-multi-line-text',
  templateUrl: './multi-line-text.component.html',
  styleUrls: ['./multi-line-text.component.css']
})
export class MultiLineTextComponent {
  @Input() fieldName: string;
  @Input() nextLine: boolean = true;
  @Input() formElement: FormControl<string>;
  @Input() showError: boolean = false;
  @Input() text: string = '';
  @Input() additionalNote: string = '';

  isFieldRequired(): boolean {
    return this.formElement.hasValidator(Validators.required);
  }
}
