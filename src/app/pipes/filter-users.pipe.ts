import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../entity/User";

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: User[], search: string): User[] {
    if (!users)
      return [];
    return users.filter(u => this.userFitsBySearchStr(u, search));
  }

  private userFitsBySearchStr(u: User, search: string): boolean {
    let searchLower = search.toLowerCase();
    return u.firstName.toLowerCase().includes(searchLower) ||
      u.lastName.toLowerCase().includes(searchLower) ||
      (u.firstName + " " + u.lastName).toLowerCase().includes(searchLower);
  }
}
