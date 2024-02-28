import {Component, OnDestroy} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UrlService} from "../../service/url.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnDestroy {
  private userService: UserService;
  private router: Router;
  private urlService: UrlService;

  showAllErrors = false;
  globalError: string = '';
  changingPasswordProcess = false;

  private subscription: Subscription;

  form = new FormGroup({
    oldPassword: new FormControl<string>('', [
      Validators.required
    ]),
    newPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
    ]),
    confirmNewPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
    ])
  })

  constructor(userService: UserService,
              router: Router,
              urlService: UrlService) {
    this.userService = userService;
    this.router = router;
    this.urlService = urlService;
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

    this.changePassword();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private changePassword() {
    let oldPassword = this.getOldPasswordFromField();
    let newPassword = this.getNewPasswordFromField();

    this.changingPasswordProcess = true;
    this.subscription = this.userService.changePassword(oldPassword, newPassword)
      .subscribe(result => {
        this.changingPasswordProcess = false;
        console.log(result);
        if (result.success) {
          this.doTransferToSuccessPage();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  resetGlobalError() {
    this.globalError = '';
  }

  getOldPasswordFromField(): string {
    return this.form.controls.oldPassword.getRawValue();
  }

  getNewPasswordFromField(): string {
    return this.form.controls.newPassword.getRawValue();
  }

  getConfirmNewPasswordFromField(): string {
    return this.form.controls.confirmNewPassword.getRawValue();
  }

  isAnyErrorInFields(): boolean {
    let newPassword = this.getNewPasswordFromField();
    let confirmNewPassword = this.getConfirmNewPasswordFromField();
    if (newPassword != confirmNewPassword) {
      this.globalError = 'Новый пароль и его подтверждение не совпадают';
      return true;
    }

    return this.doesControlHaveError(this.form.controls.oldPassword) ||
      this.doesControlHaveError(this.form.controls.newPassword) ||
      this.doesControlHaveError(this.form.controls.confirmNewPassword);
  }

  doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }

  doTransferToSuccessPage() {
    this.router.navigate(['/successful-password-change']);
  }

  doTransferToLastPage() {
    this.router.navigate([this.urlService.getLastPage()]);
  }
}
