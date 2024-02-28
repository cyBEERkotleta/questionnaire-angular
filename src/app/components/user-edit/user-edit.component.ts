import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../entity/User";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Gender} from "../../entity/Gender";
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  private userService: UserService;
  private sessionService: SessionService;
  private router: Router;

  user: User;

  showAllErrors = false;
  globalError: string = '';

  private listenerGenderReady = false;
  private userLoaded = false;

  private subscriptionGetUser: Subscription;
  private subscriptionSaveUser: Subscription;

  form = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.required,
      Validators.pattern(/^[\p{L}\s-]{2,30}$/u)
    ]),
    lastName: new FormControl<string>('', [
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.required,
      Validators.pattern(/^[\p{L}\s-]{2,30}$/u)
    ]),
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^\\d{3,15}$'),
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    gender: new FormControl<Gender>(null, [
      Validators.required
    ])
  })

  constructor(userService: UserService,
              sessionService: SessionService,
              router: Router) {
    this.userService = userService;
    this.sessionService = sessionService;
    this.router = router;
  }

  ngOnInit() {
    this.subscriptionGetUser = this.userService.updateCurrentUser()
      .subscribe(result => {
        this.user = result;
        this.userLoaded = true;
        this.updateFormFields();
      });
  }

  ngOnDestroy() {
    if (this.subscriptionGetUser)
      this.subscriptionGetUser.unsubscribe();
    if (this.subscriptionSaveUser)
      this.subscriptionSaveUser.unsubscribe();
  }

  private updateFormFields() {
    this.form.controls.firstName.setValue(this.user.firstName);
    this.form.controls.lastName.setValue(this.user.lastName);
    this.form.controls.phoneNumber.setValue(this.user.phoneNumber);

    if (this.userLoaded && this.listenerGenderReady)
      this.form.controls.gender.setValue(this.user.gender);
  }

  onGenderChoiceReadyToGetValue() {
    this.listenerGenderReady = true;

    if (this.userLoaded && this.listenerGenderReady)
      this.form.controls.gender.setValue(this.user.gender);
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    if (this.anyErrorExists())
      return;

    this.saveChanges();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private saveChanges() {
    this.updateEditedUserFromFields();

    this.subscriptionSaveUser = this.userService.saveUser(this.user)
      .subscribe(result => {
        console.log(result);

        if (result.success) {
          this.doTransferProfilePage();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  private updateEditedUserFromFields() {
    let firstName = this.form.controls.firstName.getRawValue();
    let lastName = this.form.controls.lastName.getRawValue();
    let phoneNumber = this.form.controls.phoneNumber.getRawValue();
    let gender = this.form.controls.gender.getRawValue();

    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.phoneNumber = phoneNumber;
    this.user.gender = gender;
  }

  private isAnyErrorInFields(): boolean {
    return this.doesControlHaveError(this.form.controls.firstName) ||
      this.doesControlHaveError(this.form.controls.lastName) ||
      this.doesControlHaveError(this.form.controls.phoneNumber) ||
      this.doesControlHaveError(this.form.controls.gender);
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }

  doTransferProfilePage() {
    this.router.navigate(['user-profiles', this.user.id]);
  }
}
