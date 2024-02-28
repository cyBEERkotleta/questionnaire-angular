import {Component, Input} from '@angular/core'
import {User} from "../../entity/User";

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent {
  @Input() user: User;

  isMale(): boolean {
    if (!this.user)
      return true;
    return this.user.gender.name == 'MALE';
  }

  isFemale(): boolean {
    if (!this.user)
      return false;
    return this.user.gender.name == 'FEMALE';
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
}
