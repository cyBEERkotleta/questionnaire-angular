import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Topic} from "../../entity/Topic";
import {FormService} from "../../service/form.service";
import {Subscription} from "rxjs";
import {Form} from "../../entity/Form";
import {ModalEditWindowService} from "../../service/modal-edit-window.service";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit, OnDestroy {
  editedForm: Form;

  private formService: FormService;
  private modalEditWindowsService: ModalEditWindowService;

  showAllErrors = false;
  globalError: string = '';

  private subscription: Subscription;

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(2),
      Validators.maxLength(150),
      Validators.required
    ]),
    topic: new FormControl<Topic>(null, [
      Validators.required
    ]),
    shown: new FormControl<boolean>(true)
  });

  constructor(formService: FormService,
              modalEditWindowService: ModalEditWindowService) {
    this.formService = formService;
    this.modalEditWindowsService = modalEditWindowService;

    this.editedForm = this.modalEditWindowsService.getEditableObject() as Form;
  }

  ngOnInit() {
    this.updateFormFields();
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    if (this.anyErrorExists())
      return;

    this.saveForm();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private saveForm() {
    this.updateEditedFormWithFields();

    this.subscription = this.formService.saveForm(this.editedForm)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.modalEditWindowsService.close();
          location.reload();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private updateFormFields() {
    this.form.controls.name.setValue(this.editedForm.name);
    this.form.controls.shown.setValue(this.editedForm.shown);
  }

  onTopicChoiceReadyToGetValue() {
    this.form.controls.topic.setValue(this.editedForm.topic);
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  private updateEditedFormWithFields() {
    let name = this.getNameFromField();
    let shown = this.getShownFromField();
    let topic = this.getTopicFromField();

    this.editedForm.name = name;
    this.editedForm.shown = shown;
    this.editedForm.topic = topic;
  }

  private getNameFromField(): string {
    return this.form.controls.name.getRawValue();
  }

  private getShownFromField(): boolean {
    return this.form.controls.shown.getRawValue();
  }

  private getTopicFromField(): Topic {
    return this.form.controls.topic.getRawValue();
  }

  private isAnyErrorInFields(): boolean {
    return this.doesControlHaveError(this.form.controls.name) ||
      this.doesControlHaveError(this.form.controls.topic);
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }
}
