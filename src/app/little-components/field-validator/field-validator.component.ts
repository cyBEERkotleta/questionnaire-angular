import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-field-validator',
  templateUrl: './field-validator.component.html',
  styleUrls: ['./field-validator.component.css']
})
export class FieldValidatorComponent {
  @Input() formElement: FormControl;
  @Input() showError: boolean;
  @Input() additionalNote: string = '';

  isNoteEmpty(): boolean {
    return this.additionalNote == '';
  }

  anyErrorExists(): boolean {
    return this.errorWithMaxLength() ||
      this.errorWithMinLength() ||
      this.errorWithRequired() ||
      this.errorWithEmail() ||
      this.errorWithPattern();
  }

  getNoteText(): string {
    return 'Примечание: ' + this.additionalNote;
  }

  showErrorBlock(): boolean {
    return this.showError || this.formElement.touched;
  }

  errorWithRequired(): boolean {
    return this.formElement.hasError('required');
  }

  errorWithMinLength(): boolean {
    return this.formElement.hasError('minlength');
  }

  errorWithMaxLength() : boolean {
    return this.formElement.hasError('maxlength');
  }

  errorWithEmail(): boolean {
    return this.formElement.hasError('email');
  }

  errorWithPattern(): boolean {
    return this.formElement.hasError('pattern');
  }
}
