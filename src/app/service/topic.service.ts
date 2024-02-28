import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {Topic} from "../entity/Topic";
import {catchError, map, Observable, throwError} from "rxjs";
import {RequestResult} from "../additional/RequestResult";
import {SessionService} from "./session.service";
import {UserRole} from "../entity/UserRole";
import {Form} from "../entity/Form";

@Injectable({
  providedIn: 'root'
})
export class TopicService {
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

  isTopicPresent(topic: Topic): boolean {
    return !!topic && !!topic.id && !!topic.name && !!topic.description;
  }

  getAll() : Observable<Topic[]> {
    return this.http.get<Topic[]>('http://localhost:8090/topics')
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(topics => {
          return topics.map(topic => {
            topic.shownName = topic.name;
            return topic;
          });
        })
      );
  }

  getTopicById(id: bigint): Observable<Topic> {
    let path = 'http://localhost:8090/topics/' + id;
    return this.http.get<Topic>(path)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(topic => {
          topic.shownName = topic.name;
          return topic;
        })
      );
  }

  saveTopic(topic: Topic): Observable<RequestResult> {
    let token = this.sessionService.getToken();
    let tokenWithTopic = {token: token, topic: topic};
    return this.http.post<RequestResult>('http://localhost:8090/save_topic', tokenWithTopic)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  deleteTopic(topic: Topic): Observable<RequestResult> {
    let token = this.sessionService.getToken();
    let tokenWithTopic = {token: token, topic: topic};
    return this.http.post<RequestResult>('http://localhost:8090/delete_topic', tokenWithTopic)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
