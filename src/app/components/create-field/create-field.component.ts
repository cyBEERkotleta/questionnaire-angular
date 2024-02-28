import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Form} from "../../entity/Form";
import {FieldService} from "../../service/field.service";
import {FormService} from "../../service/form.service";
import {Field} from "../../entity/Field";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalCreateWindowService} from "../../service/modal-create-window.service";
import {FieldType} from "../../entity/FieldType";
import {FieldOption} from "../../entity/FieldOption";

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.css']
})
export class CreateFieldComponent implements OnInit, OnDestroy {
  @Input() formId: bigint;

  private fieldService: FieldService;
  private formService: FormService;
  private modalService: ModalCreateWindowService;

  private formOfField: Form;
  globalError: string = '';
  showAllErrors = false;

  fieldType: FieldType;
  fieldOptions: FieldOption[] = [];

  private subscriptionForm: Subscription;
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
              formService: FormService,
              modalService: ModalCreateWindowService) {
    this.fieldService = fieldService;
    this.formService = formService;
    this.modalService = modalService;
  }

  ngOnInit() {
    this.subscriptionForm = this.formService.getFormById(this.formId)
      .subscribe(result => {
        this.formOfField = result;
      });
  }

  ngOnDestroy() {
    if (this.subscriptionForm)
      this.subscriptionForm.unsubscribe();
    if (this.subscriptionSaveField)
      this.subscriptionSaveField.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    if (this.anyErrorExists())
      return;

    this.addField();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private addField() {
    let newField = this.createField();

    this.subscriptionSaveField = this.fieldService.saveField(newField)
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

  private resetGlobalError() {
    this.globalError = '';
  }

  private createField(): Field {
    let label = this.getLabelFromField();
    let required = this.getRequiredFromField();
    let active = this.getActiveFromField();
    let fieldOptions = this.fieldOptions;
    if (!this.shouldShowOptionList())
      fieldOptions = [];

    return new Field(null, label, this.fieldType, required, active,
      fieldOptions, this.formOfField);
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
