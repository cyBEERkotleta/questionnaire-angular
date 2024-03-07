import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {SessionService} from "./session.service";
import {catchError, Observable, throwError} from "rxjs";
import {RequestResult} from "../additional/RequestResult";
import {AnsweredForm} from "../entity/AnsweredForm";
import {environment} from "../environment";

@Injectable({
  providedIn: 'root'
})
export class AnsweredFormService {
  private http: HttpClient;
  private errorService: ErrorService;
  private sessionService: SessionService;

  constructor(http: HttpClient,
              errorService: ErrorService,
              sessionService: SessionService) {
    this.http = http;
    this.errorService = errorService;
    this.sessionService = sessionService;
  }

  isAnsweredFormPresent(answeredForm: AnsweredForm): boolean {
    return !!answeredForm && !!answeredForm.id && !!answeredForm.answers;
  }

  getAnsweredFormById(id: bigint): Observable<AnsweredForm> {
    let token = this.sessionService.getToken();
    let path = environment.apiUrl + '/answered_forms/' + id;
    return this.http.post<AnsweredForm>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      );
  }

  getAnsweredFormsByFormId(formId: bigint) : Observable<AnsweredForm[]> {
    let token = this.sessionService.getToken();
    let path = environment.apiUrl + '/answered_forms/form_' + formId;
    return this.http.post<AnsweredForm[]>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      );
  }

  saveAnsweredForm(answeredForm: AnsweredForm): Observable<RequestResult> {
    return this.http.post<RequestResult>(environment.apiUrl + '/save_answered_form', answeredForm)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
