import {Component, OnDestroy} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnDestroy {
  private userService: UserService;
  private router: Router;

  showAllErrors = false;
  globalError: string = '';

  private subscription: Subscription;

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl<string>('', [
      Validators.required
    ]),
    rememberMe: new FormControl<boolean>(false)
  })

  constructor(userService: UserService,
              router: Router) {
    this.userService = userService;
    this.router = router;
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

    this.loginUser();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private loginUser() {
    let email = this.getEmailFromField();
    let password = this.getPasswordFromField();
    let rememberMe = this.getRememberMeOptionFromField();

    this.subscription = this.userService.login(email, password, rememberMe)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.navigateToMainPage();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private navigateToMainPage() {
    this.router.navigate(['/']);
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  private getEmailFromField(): string {
    return this.form.controls.email.getRawValue();
  }

  private getPasswordFromField(): string {
    return this.form.controls.password.getRawValue();
  }

  private getRememberMeOptionFromField(): boolean {
    return this.form.controls.rememberMe.getRawValue();
  }

  private isAnyErrorInFields(): boolean {
    return this.doesControlHaveError(this.form.controls.email) ||
      this.doesControlHaveError(this.form.controls.password);
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }
}
