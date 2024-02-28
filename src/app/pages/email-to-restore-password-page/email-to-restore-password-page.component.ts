import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MailService} from "../../service/mail.service";
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-email-to-restore-password-page',
  templateUrl: './email-to-restore-password-page.component.html',
  styleUrls: ['./email-to-restore-password-page.component.css']
})
export class EmailToRestorePasswordPageComponent implements OnInit, OnDestroy {
  private mailService: MailService;
  private router: Router;

  showAllErrors = false;
  globalError: string = '';
  sendingMailProcess = false;

  private subscription1: Subscription;

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.email,
      Validators.required
    ])
  });

  constructor(mailService: MailService,
              router: Router) {
    this.mailService = mailService;
    this.router = router;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    if (this.anyErrorExists())
      return;

    this.sendMail();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private sendMail() {
    let email = this.getEmailFromField();

    this.sendingMailProcess = true;
    this.subscription1 = this.mailService.sendPasswordRestoration(email)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.sendingMailProcess = false;
          this.navigateToInfoPage(email);
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private navigateToInfoPage(email: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {'email': email}
    };
    this.router.navigate(['/mail-to-restore-sent'], navigationExtras);
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  private getEmailFromField(): string {
    return this.form.controls.email.getRawValue();
  }

  private isAnyErrorInFields(): boolean {
    return this.doesControlHaveError(this.form.controls.email);
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }
}
