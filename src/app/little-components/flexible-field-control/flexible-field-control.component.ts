import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Field} from "../../entity/Field";
import {FieldTypeService} from "../../service/field-type.service";

@Component({
  selector: 'app-flexible-field-control',
  templateUrl: './flexible-field-control.component.html',
  styleUrls: ['./flexible-field-control.component.css']
})
export class FlexibleFieldControlComponent {
  @Input() field: Field;
  @Input() formElement: FormControl<string>;
  @Input() showError: boolean = false;

  fieldTypeService: FieldTypeService;

  constructor(fieldTypeService: FieldTypeService) {
    this.fieldTypeService = fieldTypeService;
  }

  isSingleLineText() {
    let type1 = this.field.type;
    let type2 = this.fieldTypeService.singleLineText;

    return this.fieldTypeService.areTypesEqual(type1, type2);
  }

  isMultiLineText() {
    let type1 = this.field.type;
    let type2 = this.fieldTypeService.multiLineText;

    return this.fieldTypeService.areTypesEqual(type1, type2);
  }

  isDate() {
    let type1 = this.field.type;
    let type2 = this.fieldTypeService.date;

    return this.fieldTypeService.areTypesEqual(type1, type2);
  }

  isComboBox() {
    let type1 = this.field.type;
    let type2 = this.fieldTypeService.comboBox;

    return this.fieldTypeService.areTypesEqual(type1, type2);
  }

  isCheckBox() {
    let type1 = this.field.type;
    let type2 = this.fieldTypeService.checkBox;

    return this.fieldTypeService.areTypesEqual(type1, type2);
  }

  isRadioButton() {
    let type1 = this.field.type;
    let type2 = this.fieldTypeService.radioButton;

    return this.fieldTypeService.areTypesEqual(type1, type2);
  }
}
