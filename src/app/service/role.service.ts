import {Injectable} from '@angular/core';
import {UserRole} from "../entity/UserRole";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private http: HttpClient;
  private errorService: ErrorService;

  memberRole: UserRole;
  adminRole: UserRole;

  constructor(http: HttpClient,
              errorService: ErrorService) {
    this.http = http;
    this.errorService = errorService;

    this.initializeRoles();
  }

  areRolesEqual(role1: UserRole, role2: UserRole): boolean {
    if (!this.isRolePresent(role1) || !this.isRolePresent(role2))
      return false;
    return role1.id == role2.id && role1.name == role2.name && role1.shownName == role2.shownName;
  }

  isRolePresent(role: UserRole): boolean {
    return !!role && !!role.id && !!role.name && !!role.shownName;
  }

  private initializeRoles() {
    const MEMBER_ROLE_ID = 1;
    this.getRoleById(MEMBER_ROLE_ID)
      .subscribe(result => {
        this.memberRole = result;
      });

    const ADMIN_ROLE_ID = 2;
    this.getRoleById(ADMIN_ROLE_ID)
      .subscribe(result => {
        this.adminRole = result;
      });
  }

  getRoleById(id: number) : Observable<UserRole> {
    let path = 'http://localhost:8090/user_roles/' + id;
    return this.http.get<UserRole>(path)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
