import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-choice-date',
  templateUrl: './choice-date.component.html',
  styleUrls: ['./choice-date.component.css']
})
export class ChoiceDateComponent {
  @Input() fieldName: string;
  @Input() required: boolean = false;
  @Input() nextLine: boolean = false;
  @Input() formElement: FormControl<Date>;
  @Input() showError: boolean = false;

  isFieldRequired(): boolean {
    return this.formElement.hasValidator(Validators.required);
  }
}
