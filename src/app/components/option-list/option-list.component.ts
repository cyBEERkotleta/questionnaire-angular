import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldOption} from "../../entity/FieldOption";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})
export class OptionListComponent implements OnInit {
  @Input() fieldOptions: FieldOption[] = [];
  @Input() visible: boolean = false;

  @Output() fieldOptionsChange = new EventEmitter<FieldOption[]>();

  fieldOptionsForm: FormGroup;

  constructor() {
    this.fieldOptionsForm = new FormGroup({
      options: new FormArray([
        new FormGroup({
          text: new FormControl<string>('', [
            Validators.required,
            Validators.maxLength(200)
          ])
        })
      ])
    });
  }

  ngOnInit() {
    this.populateFieldOptionsForm();
  }

  getOptionsFormArray(): FormArray {
    return this.fieldOptionsForm.get('options') as FormArray;
  }

  private populateFieldOptionsForm() {
    const optionsArray = this.getOptionsFormArray();
    optionsArray.clear();

    for (let i = 0; i < this.fieldOptions.length; i++) {
      let value = this.fieldOptions[i].text;

      optionsArray.push(
        new FormGroup({
          text: new FormControl<string>(value, [
            Validators.required,
            Validators.maxLength(200)
          ])
        })
      );
    }
  }

  addFieldOption() {
    const optionsArray = this.getOptionsFormArray();
    optionsArray.push(
      new FormGroup({
        text: new FormControl<string>('', [
          Validators.required,
          Validators.maxLength(200)
        ])
      })
    );

    this.fieldOptions.push(new FieldOption(null, ''));

    this.fieldOptionsChange.emit(this.fieldOptions);
  }

  removeFieldOption(indexToRemove: number) {
    const optionsArray = this.getOptionsFormArray();
    optionsArray.removeAt(indexToRemove);

    this.fieldOptions = this.fieldOptions.filter((_, index) => index != indexToRemove);

    this.fieldOptionsChange.emit(this.fieldOptions);
  }

  updateTextInFieldOptions() {
    const optionsArray = this.getOptionsFormArray();

    for (let i = 0; i < this.fieldOptions.length; i++) {
      let text = optionsArray.controls[i].getRawValue().text;

      this.fieldOptions[i].text = text;
      this.fieldOptions[i].shownName = text;
    }

    this.fieldOptionsChange.emit(this.fieldOptions);
  }
}
