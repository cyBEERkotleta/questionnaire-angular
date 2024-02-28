import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnDestroy {
  private activatedRoute: ActivatedRoute;
  private userService: UserService;
  private router: Router;

  showAllErrors = false;
  globalError: string = '';

  private token: string;

  private subscriptionParams: Subscription;
  private subscriptionRestore: Subscription;

  form = new FormGroup({
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

  constructor(activatedRoute: ActivatedRoute,
              userService: UserService,
              router: Router) {
    this.activatedRoute = activatedRoute;
    this.userService = userService;
    this.router = router;
  }

  ngOnDestroy() {
    if (this.subscriptionParams)
      this.subscriptionParams.unsubscribe();
    if (this.subscriptionRestore)
      this.subscriptionRestore.unsubscribe();
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
    let newPassword = this.getNewPasswordFromField();

    this.subscriptionParams = this.activatedRoute.queryParams
      .subscribe(params => {
        this.token = params['code'];

        this.subscriptionRestore = this.userService.restorePassword(this.token, newPassword)
          .subscribe(result => {
            console.log(result);
            if (result.success) {
              this.doTransferToSuccessPage();
            }
            else {
              this.globalError = result.message;
            }
          });
      });
  }

  resetGlobalError() {
    this.globalError = '';
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

    return this.doesControlHaveError(this.form.controls.newPassword) ||
      this.doesControlHaveError(this.form.controls.confirmNewPassword);
  }

  doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }

  doTransferToSuccessPage() {
    this.router.navigate(['/successful-restoration']);
  }
}
