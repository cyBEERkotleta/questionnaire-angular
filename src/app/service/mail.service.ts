import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../entity/User";
import {catchError, Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {RequestResult} from "../additional/RequestResult";

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private http: HttpClient;
  private errorService: ErrorService;
  constructor(http: HttpClient,
              errorService: ErrorService) {
    this.http = http;
    this.errorService = errorService;
  }

  sendConfirmationEmail(user: User, password: string): Observable<RequestResult> {
    const userWithPassword = {user: user, password: password};
    return this.http.post<RequestResult>('http://localhost:8090/send_confirmation_email', userWithPassword)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  sendPasswordChangeNotification(email: string): Observable<RequestResult> {
    return this.http.post<RequestResult>('http://localhost:8090/send_notification_password_changed', email)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  sendPasswordRestoration(email: string): Observable<RequestResult> {
    return this.http.post<RequestResult>('http://localhost:8090/send_password_restoration', email)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
