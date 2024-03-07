import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {RequestResult} from "../additional/RequestResult";
import {Form} from "../entity/Form";
import {SessionService} from "./session.service";
import {environment} from "../environment";

@Injectable({
  providedIn: 'root'
})
export class FormService {
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

  isFormPresent(form: Form): boolean {
    return !!form && !!form.id && !!form.name && !!form.user && !!form.topic;
  }

  getAll(): Observable<Form[]> {
    return this.http.get<Form[]>(environment.apiUrl + '/forms')
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(forms => {
          return forms.map(form => {
            form.topic.shownName = form.topic.name;
            return form;
          });
        })
      );
  }

  getFormsByTopicId(topicId: bigint) : Observable<Form[]> {
    let path = environment.apiUrl + '/forms/topic_' + topicId;
    return this.http.get<Form[]>(path)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(forms => {
          return forms.map(form => {
            form.topic.shownName = form.topic.name;
            return form;
          });
        })
      );
  }

  getFormsByUserId(userId: bigint) : Observable<Form[]> {
    let token = this.sessionService.getToken();
    let path = environment.apiUrl + '/forms/user_' + userId;
    return this.http.post<Form[]>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(forms => {
          return forms.map(form => {
            form.topic.shownName = form.topic.name;
            return form;
          });
        })
      );
  }

  getFormById(id: bigint): Observable<Form> {
    let token = this.sessionService.getToken();
    let path = environment.apiUrl + '/forms/' + id;
    return this.http.post<Form>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(form => {
          form.topic.shownName = form.topic.name;
          return form;
        })
      );
  }

  saveForm(form: Form): Observable<RequestResult> {
    let token = this.sessionService.getToken();
    let tokenWithForm = {token: token, form: form};
    return this.http.post<RequestResult>(environment.apiUrl + '/save_form', tokenWithForm)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  deleteForm(form: Form): Observable<RequestResult> {
    let token = this.sessionService.getToken();
    let tokenWithForm = {token: token, form: form};
    return this.http.post<RequestResult>(environment.apiUrl + '/delete_form', tokenWithForm)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
