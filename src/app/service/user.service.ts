import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {User} from "../entity/User";
import {ErrorService} from "./error.service";
import {AuthorizeResult} from "../additional/AuthorizeResult";
import {SessionService} from "./session.service";
import {MailService} from "./mail.service";
import {environment} from "../environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient;
  private errorService: ErrorService;
  private sessionService: SessionService;
  private mailService: MailService;

  constructor(http: HttpClient,
              errorService: ErrorService,
              sessionService: SessionService,
              mailService: MailService) {
    this.http = http;
    this.errorService = errorService;
    this.sessionService = sessionService;
    this.mailService = mailService;
  }

  isUserPresent(user: User): boolean {
    return !!user && !!user.id && !!user.userRole && !!user.firstName && !!user.lastName &&
      !!user.email && !!user.phoneNumber && !!user.gender;
  }

  getAll() : Observable<User[]> {
    let token = this.sessionService.getToken();
    return this.http.post<User[]>(environment.apiUrl + '/users', token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      )
  }

  getUserById(id: bigint) : Observable<User> {
    let token = this.sessionService.getToken();
    let path = environment.apiUrl + '/users/' + id;
    return this.http.post<User>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  register(user: User, password: string): Observable<AuthorizeResult> {
    const userWithPassword = {user: user, password: password};

    return this.http.post<AuthorizeResult>(environment.apiUrl + '/register', userWithPassword)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(result => {
          if (result.success) {
            this.updateTokenInSession(result.token);
            this.updateCurrentUser()
              .subscribe(result => result);
          }
        })
      );
  }

  tryRegister(user: User, password: string): Observable<AuthorizeResult> {
    const userWithPassword = {user: user, password: password};

    return this.http.post<AuthorizeResult>(environment.apiUrl + '/try_register', userWithPassword)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  login(email: string, password: string, rememberMe: boolean): Observable<AuthorizeResult> {
    const loginData = {email: email, password: password};

    return this.http.post<AuthorizeResult>(environment.apiUrl + '/login', loginData)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(result => {
          if (result.success) {
            this.updateTokenWithRememberMeFlag(result.token, rememberMe);
            this.updateCurrentUser()
              .subscribe(result => result);
          }
        })
      );
  }

  logOut() {
    this.sessionService.removeTokenFromEverywhere();
    this.sessionService.resetUser();
  }

  changePassword(oldPassword: string, newPassword: string): Observable<AuthorizeResult> {
    let token = this.sessionService.getToken();
    const tokenWithChangePasswordData = {
      token: token, oldPassword: oldPassword, newPassword: newPassword
    };

    return this.http.post<AuthorizeResult>(environment.apiUrl + '/change_password', tokenWithChangePasswordData)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(result => {
          if (result.success) {
            this.updateTokenWhereItWasSet(result.token);
            this.updateCurrentUser()
              .subscribe(result => {
                this.mailService.sendPasswordChangeNotification(this.sessionService.getUser().email)
                  .subscribe(mail => mail);
              })
          }
        })
      );
  }

  saveUser(user: User): Observable<AuthorizeResult> {
    let token = this.sessionService.getToken();
    const tokenWithUser = {
      token: token, user: user
    };

    return this.http.post<AuthorizeResult>(environment.apiUrl + '/save_user', tokenWithUser)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(result => {
          if (result.success) {
            this.updateTokenWhereItWasSet(result.token);
            this.updateCurrentUser()
              .subscribe(result => result);
          }
        })
      );
  }

  updateCurrentUser(): Observable<User> {
    let token = this.sessionService.getToken();
    return this.http.post<User>(environment.apiUrl + '/user_by_token', token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(result => {
          if (this.isUserPresent(result))
            this.sessionService.setUser(result);
        })
      );
  }

  getUserByToken(token: string): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/user_by_token', token)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  finishRegistration(user: User, hashedPassword: string): Observable<AuthorizeResult> {
    let userWithHashedPassword = {user: user, hashedPassword: hashedPassword};
    return this.http.post<AuthorizeResult>(environment.apiUrl + '/finish_registration', userWithHashedPassword)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  restorePassword(token: string, newPassword: string): Observable<AuthorizeResult> {
    let tokenWithNewPassword = {token: token, newPassword: newPassword};
    return this.http.post<AuthorizeResult>(environment.apiUrl + '/restore_password', tokenWithNewPassword)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(result => {
          if (result.success) {
            this.getUserByToken(result.token)
              .subscribe(user => {
                this.mailService.sendPasswordChangeNotification(user.email)
                  .subscribe(mail => mail);
              });
          }
        })
      );
  }

  private updateTokenWithRememberMeFlag(token: string, rememberMe: boolean) {
    if (rememberMe)
      this.updateTokenGlobally(token);
    else
      this.updateTokenInSession(token);
  }

  private updateTokenInSession(token: string) {
    this.sessionService.saveTokenToSessionStorage(token);
  }

  private updateTokenGlobally(token: string) {
    this.sessionService.saveTokenToSessionStorage(token);
    this.sessionService.saveTokenToLocalStorage(token);
  }

  private updateTokenWhereItWasSet(token: string) {
    this.sessionService.updateTokenWhereItWasSet(token);
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
