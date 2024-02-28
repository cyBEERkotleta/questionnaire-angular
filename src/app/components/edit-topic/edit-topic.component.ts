import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalEditWindowService} from "../../service/modal-edit-window.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Topic} from "../../entity/Topic";
import {TopicService} from "../../service/topic.service";

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit, OnDestroy {
  editedTopic: Topic;

  private topicService: TopicService;
  private modalEditWindowsService: ModalEditWindowService;

  showAllErrors = false;
  globalError: string = '';

  private subscription: Subscription;

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.required
    ]),
    description: new FormControl<string>('', [
      Validators.maxLength(250)
    ])
  });

  constructor(topicService: TopicService,
              modalEditWindowService: ModalEditWindowService) {
    this.topicService = topicService;
    this.modalEditWindowsService = modalEditWindowService;

    this.editedTopic = this.modalEditWindowsService.getEditableObject() as Topic;
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

    this.saveTopic();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private saveTopic() {
    this.updateEditedFormWithFields();

    this.subscription = this.topicService.saveTopic(this.editedTopic)
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
    this.form.controls.name.setValue(this.editedTopic.name);
    this.form.controls.description.setValue(this.editedTopic.description);
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  private updateEditedFormWithFields() {
    let name = this.getNameFromField();
    let description = this.getDescriptionFromField();

    this.editedTopic.name = name;
    this.editedTopic.description = description;
  }

  private getNameFromField(): string {
    return this.form.controls.name.getRawValue();
  }

  private getDescriptionFromField(): string {
    return this.form.controls.description.getRawValue();
  }

  private isAnyErrorInFields(): boolean {
    return this.doesControlHaveError(this.form.controls.name) ||
      this.doesControlHaveError(this.form.controls.description);
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }
}
