import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {SessionService} from "./session.service";
import {catchError, Observable, throwError} from "rxjs";
import {RequestResult} from "../additional/RequestResult";
import {Answer} from "../entity/Answer";
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
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

  isAnswerPresent(answer: Answer): boolean {
    return !!answer && !!answer.id && !!answer.field && !!answer.text;
  }

  getAnswerById(id: bigint): Observable<Answer> {
    let token = this.sessionService.getToken();
    let path = environment.apiUrl + '/answers/' + id;
    return this.http.post<Answer>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      );
  }

  getAnswersByAnsweredFormId(answeredFormId: bigint) : Observable<Answer[]> {
    let token = this.sessionService.getToken();
    let path = environment.apiUrl + '/fields/answered_form_' + answeredFormId;
    return this.http.post<Answer[]>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      );
  }

  getAnswersByFieldId(fieldId: bigint) : Observable<Answer[]> {
    let token = this.sessionService.getToken();
    let path = environment.apiUrl + '/fields/field_' + fieldId;
    return this.http.post<Answer[]>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      );
  }

  saveAnswer(answer: Answer): Observable<RequestResult> {
    return this.http.post<RequestResult>(environment.apiUrl + '/save_answer', answer)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
