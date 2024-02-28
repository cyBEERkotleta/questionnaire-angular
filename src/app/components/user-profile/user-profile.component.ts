import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../entity/User";
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";
import {FormService} from "../../service/form.service";
import {Form} from "../../entity/Form";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Input() user: User;
  forms: Form[];

  private userService: UserService;
  private formService: FormService;
  private sessionUser: User;

  private subscriptionUser: Subscription;
  private subscriptionForms: Subscription;

  constructor(userService: UserService,
              formService: FormService) {
    this.userService = userService;
    this.formService = formService;
  }

  ngOnInit() {
    this.subscriptionUser = this.userService.updateCurrentUser()
      .subscribe(result => {
        this.sessionUser = result;
      });

    this.subscriptionForms = this.formService.getFormsByUserId(this.user.id)
      .subscribe(result => {
        this.forms = result;
      });
  }

  ngOnDestroy() {
    if (this.subscriptionUser)
      this.subscriptionUser.unsubscribe();
    if (this.subscriptionForms)
      this.subscriptionForms.unsubscribe();
  }

  isMale() : boolean {
    if (!this.user)
      return true;
    return this.user.gender.name == 'MALE';
  }

  isFemale() : boolean {
    if (!this.user)
      return false;
    return this.user.gender.name == 'FEMALE';
  }

  isProfileOwn(): boolean {
    if (this.sessionUser && this.user) {
      return (this.sessionUser.id == this.user.id);
    } else {
      return false;
    }
  }

  getUserName(): string {
    if (!this.user)
      return ''
    return this.user.firstName + ' ' + this.user.lastName;
  }

  getUserEmail(): string {
    if (!this.user)
      return '';
    return this.user.email;
  }

  getUserPhone(): string {
    if (!this.user)
      return '';
    return this.user.phoneNumber;
  }

  getFormCount(): string {
    if (!this.forms || !this.forms.length)
      return '0';
    return this.forms.length.toString();
  }

  getUserGenderName(): string {
    if (!this.user)
      return '';
    return this.user.gender.shownName;
  }
}
