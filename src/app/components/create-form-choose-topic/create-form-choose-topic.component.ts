import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "../../service/form.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Topic} from "../../entity/Topic";
import {ModalCreateWindowService} from "../../service/modal-create-window.service";
import {Form} from "../../entity/Form";
import {User} from "../../entity/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-create-form-choose-topic',
  templateUrl: './create-form-choose-topic.component.html',
  styleUrls: ['./create-form-choose-topic.component.css']
})
export class CreateFormChooseTopicComponent implements OnInit, OnDestroy {
  private formService: FormService;
  private userService: UserService;
  private modalCreateWindowsService: ModalCreateWindowService;

  showAllErrors = false;
  globalError: string = '';

  private user: User;

  private subscriptionSave: Subscription;
  private subscriptionUser: Subscription;

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.required
    ]),
    topic: new FormControl<Topic>(null),
    shown: new FormControl<boolean>(true),
  });

  constructor(userService: UserService,
              formService: FormService,
              modalAddWindowService: ModalCreateWindowService) {
    this.userService = userService;
    this.formService = formService;
    this.modalCreateWindowsService = modalAddWindowService;
  }

  ngOnInit() {
    this.subscriptionUser = this.userService.updateCurrentUser()
      .subscribe(result => {
        this.user = result;
      });
  }

  ngOnDestroy() {
    if (this.subscriptionUser)
      this.subscriptionUser.unsubscribe();
    if (this.subscriptionSave)
      this.subscriptionSave.unsubscribe();
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
    let form = this.createFormFromFields();

    this.subscriptionSave = this.formService.saveForm(form)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.modalCreateWindowsService.close();
          location.reload();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  private createFormFromFields(): Form {
    let name = this.getNameFromField();
    let shown = this.getShownFromField();
    let topic = this.getTopicFromField();

    return new Form(null, name, shown, this.user, topic);
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
