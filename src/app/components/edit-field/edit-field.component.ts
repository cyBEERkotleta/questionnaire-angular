import {Component} from '@angular/core';
import {FieldService} from "../../service/field.service";
import {FieldType} from "../../entity/FieldType";
import {FieldOption} from "../../entity/FieldOption";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Field} from "../../entity/Field";
import {ModalEditWindowService} from "../../service/modal-edit-window.service";

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css']
})
export class EditFieldComponent {
  editedField: Field;

  private fieldService: FieldService;
  private modalService: ModalEditWindowService;

  globalError: string = '';
  showAllErrors = false;

  fieldType: FieldType;
  fieldOptions: FieldOption[];

  private subscriptionSaveField: Subscription;

  form = new FormGroup({
    label: new FormControl<string>('', [
      Validators.minLength(2),
      Validators.maxLength(300),
      Validators.required
    ]),
    type: new FormControl<FieldType>(null, [
      Validators.required
    ]),
    required: new FormControl<boolean>(false),
    active: new FormControl<boolean>(true)
  });

  constructor(fieldService: FieldService,
              modalService: ModalEditWindowService) {
    this.fieldService = fieldService;
    this.modalService = modalService;

    this.editedField = this.modalService.getEditableObject() as Field;
    this.fieldType = this.editedField.type;
  }

  ngOnInit() {
    this.updateFormFields();
  }

  ngOnDestroy() {
    if (this.subscriptionSaveField)
      this.subscriptionSaveField.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    if (this.anyErrorExists())
      return;

    this.saveField();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private saveField() {
    this.updateEditedFormWithFields();

    this.subscriptionSaveField = this.fieldService.saveField(this.editedField)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.modalService.close();
          location.reload();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  onFieldTypeSelected(fieldType: FieldType) {
    this.fieldType = fieldType;
  }

  shouldShowOptionList(): boolean {
    if (!!this.fieldType)
      return this.fieldType.ableToHaveOptions;
    return false;
  }

  private updateFormFields() {
    this.form.controls.label.setValue(this.editedField.label);
    this.form.controls.required.setValue(this.editedField.required);
    this.form.controls.active.setValue(this.editedField.active);

    this.fieldOptions = this.editedField.options;
  }

  onFieldTypeChoiceReadyToGetValue() {
    this.form.controls.type.setValue(this.editedField.type);
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  private updateEditedFormWithFields() {
    let label = this.getLabelFromField();
    let required = this.getRequiredFromField();
    let active = this.getActiveFromField();

    this.editedField.label = label;
    this.editedField.required = required;
    this.editedField.active = active;
    this.editedField.type = this.fieldType;

    if (this.shouldShowOptionList())
      this.editedField.options = this.fieldOptions;
    else
      this.editedField.options = [];
  }

  private getLabelFromField(): string {
    return this.form.controls.label.getRawValue();
  }

  private getRequiredFromField(): boolean {
    return this.form.controls.required.getRawValue();
  }

  private getActiveFromField(): boolean {
    return this.form.controls.active.getRawValue();
  }

  private isAnyErrorInFields(): boolean {
    return this.doesControlHaveError(this.form.controls.label) ||
      this.doesControlHaveError(this.form.controls.type);
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }
}
