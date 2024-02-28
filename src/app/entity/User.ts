import {UserRole} from "./UserRole";
import {Gender} from "./Gender";

export class User {
  id: bigint;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userRole: UserRole;
  gender: Gender;

  constructor(id: bigint, email: string, firstName: string, lastName: string, phoneNumber: string,
              userRole: UserRole, gender: Gender) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.userRole = userRole;
    this.gender = gender;
  }
}
