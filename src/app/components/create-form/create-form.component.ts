import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalCreateWindowService} from "../../service/modal-create-window.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Topic} from "../../entity/Topic";
import {FormService} from "../../service/form.service";
import {Form} from "../../entity/Form";
import {User} from "../../entity/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit, OnDestroy {
  @Input() topic: Topic;
  private user: User;

  private formService: FormService;
  private userService: UserService;
  private modalService: ModalCreateWindowService;
  private router: Router;

  showAllErrors = false;
  globalError: string = '';

  private subscriptionUser: Subscription;
  private subscriptionSave: Subscription;

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(2),
      Validators.maxLength(150),
      Validators.required
    ]),
    shown: new FormControl<boolean>(true)
  });

  constructor(formService: FormService,
              userService: UserService,
              modalService: ModalCreateWindowService,
              router: Router) {
    this.formService = formService;
    this.userService = userService;
    this.modalService = modalService;
    this.router = router;
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

  getTopicName(): string {
    if (!this.topic)
      return '';
    return this.topic.name;
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    if (this.anyErrorExists())
      return;

    this.addForm();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private addForm() {
    let form = this.createFormFromFields();

    this.subscriptionSave = this.formService.saveForm(form)
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

  private resetGlobalError() {
    this.globalError = '';
  }

  private createFormFromFields(): Form {
    let name = this.getNameFromField();
    let shown = this.getShownFromField();

    return new Form(null, name, shown, this.user, this.topic);
  }

  private getNameFromField(): string {
    return this.form.controls.name.getRawValue();
  }

  private getShownFromField(): boolean {
    return this.form.controls.shown.getRawValue();
  }

  private isAnyErrorInFields(): boolean {
    return this.doesControlHaveError(this.form.controls.name);
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }
}
