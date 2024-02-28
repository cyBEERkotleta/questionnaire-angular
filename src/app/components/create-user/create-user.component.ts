import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Gender} from "../../entity/Gender";
import {UserService} from "../../service/user.service";
import {User} from "../../entity/User";
import {NavigationExtras, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MailService} from "../../service/mail.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnDestroy {
  private userService: UserService;
  private mailService: MailService;
  private router: Router;

  private createdUser: User;

  showAllErrors = false;
  globalError: string = '';

  sendingMailProcess = false;

  private subscriptionTryReg: Subscription;
  private subscriptionSendMail: Subscription;

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(60),
      Validators.required
    ]),
    password: new FormControl<string>('', [
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.required
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.required
    ]),
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
              mailService: MailService,
              router: Router) {
    this.userService = userService;
    this.mailService = mailService;
    this.router = router;
  }

  ngOnDestroy() {
    if (this.subscriptionTryReg)
      this.subscriptionTryReg.unsubscribe();
    if (this.subscriptionSendMail)
      this.subscriptionSendMail.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    if (this.anyErrorExists())
      return;

    this.tryRegisterUser();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();
    let passwordsMatch = this.doPasswordsMatch();

    if (this.isAnyErrorInFields() || !passwordsMatch) {
      if (!passwordsMatch) {
        this.globalError = 'Пароли не совпадают';
      }
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private tryRegisterUser() {
    this.createdUser = this.createUserFromFields();
    let password = this.getPasswordFromField();

    this.subscriptionTryReg = this.userService.tryRegister(this.createdUser, password)
      .subscribe(result => {
        console.log(result);

        if (result.success) {
          this.sendingMailProcess = true;
          this.subscriptionSendMail = this.mailService.sendConfirmationEmail(this.createdUser, password)
            .subscribe(answer => {
              this.sendingMailProcess = false;
              if (answer.success) {
                this.navigateToConfirmRegistrationPage();
              }
              else {
                this.globalError = answer.message;
              }
            });
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private navigateToConfirmRegistrationPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {'first_name': this.createdUser.firstName,
                    'last_name': this.createdUser.lastName,
                    'email': this.createdUser.email}
    };

    this.router.navigate(['/confirm-registration'], navigationExtras);
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  private createUserFromFields(): User {
    let email = this.form.controls.email.getRawValue();
    let firstName = this.form.controls.firstName.getRawValue();
    let lastName = this.form.controls.lastName.getRawValue();
    let phoneNumber = this.form.controls.phoneNumber.getRawValue();
    let gender = this.form.controls.gender.getRawValue();

    return new User(null, email, firstName, lastName, phoneNumber,
      null, gender);
  }

  private getPasswordFromField(): string {
    return this.form.controls.password.getRawValue();
  }

  private isAnyErrorInFields(): boolean {
    return this.doesControlHaveError(this.form.controls.email) ||
      this.doesControlHaveError(this.form.controls.password) ||
      this.doesControlHaveError(this.form.controls.confirmPassword) ||
      this.doesControlHaveError(this.form.controls.firstName) ||
      this.doesControlHaveError(this.form.controls.lastName) ||
      this.doesControlHaveError(this.form.controls.phoneNumber) ||
      this.doesControlHaveError(this.form.controls.gender);
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }

  private doPasswordsMatch(): boolean {
    let password = this.form.controls.password.getRawValue();
    let confirmPassword = this.form.controls.confirmPassword.getRawValue();
    return password == confirmPassword;
  }
}
