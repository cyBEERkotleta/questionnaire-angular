import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {SessionService} from "./session.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {RequestResult} from "../additional/RequestResult";
import {Field} from "../entity/Field";

@Injectable({
  providedIn: 'root'
})
export class FieldService {
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

  isFieldPresent(field: Field): boolean {
    return !!field && !!field.id && !!field.type && !!field.active &&
      !!field.required && !!field.label && !!field.form;
  }

  getFieldById(id: bigint): Observable<Field> {
    let token = this.sessionService.getToken();
    let path = 'http://localhost:8090/fields/' + id;
    return this.http.post<Field>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(field => {
          field.type.shownName = field.type.name;
          field.options = field.options.map(option => {
            option.shownName = option.text;
            return option;
          });
          return field;
        })
      );
  }

  getFieldsByFormId(formId: bigint) : Observable<Field[]> {
    let token = this.sessionService.getToken();
    let path = 'http://localhost:8090/fields/form_' + formId;
    return this.http.post<Field[]>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(fields => {
          return fields.map(field => {
            field.type.shownName = field.type.name;
            field.options = field.options.map(option => {
              option.shownName = option.text;
              return option;
            });
            return field;
          });
        })
      );
  }

  getActiveFieldsByFormId(formId: bigint) : Observable<Field[]> {
    let token = this.sessionService.getToken();
    let path = 'http://localhost:8090/fields_active/form_' + formId;
    return this.http.post<Field[]>(path, token)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(fields => {
          return fields.map(field => {
            field.type.shownName = field.type.name;
            field.options = field.options.map(option => {
              option.shownName = option.text;
              return option;
            });
            return field;
          });
        })
      );
  }

  getFieldCountsOfUserForms(userId: bigint): Observable<number[]> {
    let path = 'http://localhost:8090/field_counts/user_' + userId;
    return this.http.get<number[]>(path)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  getFieldCountsOfTopicForms(topicId: bigint): Observable<number[]> {
    let path = 'http://localhost:8090/field_counts/topic_' + topicId;
    return this.http.get<number[]>(path)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  saveField(field: Field): Observable<RequestResult> {
    let token = this.sessionService.getToken();
    let tokenWithField = {token: token, field: field};
    return this.http.post<RequestResult>('http://localhost:8090/save_field', tokenWithField)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  deleteField(field: Field): Observable<RequestResult> {
    let token = this.sessionService.getToken();
    let tokenWithField = {token: token, field: field};
    return this.http.post<RequestResult>('http://localhost:8090/delete_field', tokenWithField)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
