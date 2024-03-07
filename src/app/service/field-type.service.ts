import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {FieldType} from "../entity/FieldType";
import {environment} from "../environment";

@Injectable({
  providedIn: 'root'
})
export class FieldTypeService {
  private http: HttpClient;
  private errorService: ErrorService;

  date: FieldType;
  comboBox: FieldType;
  checkBox: FieldType;
  radioButton: FieldType;
  multiLineText: FieldType;
  singleLineText: FieldType;

  typesLoaded = false;

  constructor(http: HttpClient,
              errorService: ErrorService) {
    this.http = http;
    this.errorService = errorService;

    this.initializeTypes();
  }

  areTypesEqual(type1: FieldType, type2: FieldType): boolean {
    if (!this.isTypePresent(type1) || !this.isTypePresent(type2))
      return false;

    return type1.id == type2.id && type1.name == type2.name &&
      type1.ableToHaveOptions == type2.ableToHaveOptions;
  }

  isTypePresent(type: FieldType): boolean {
    return !!type && !!type.id && !!type.name;
  }

  private initializeTypes() {
    let dateId = 1;
    let comboBoxId = 2;
    let checkBoxId = 3;
    let radioButtonId = 4;
    let multiLineText = 5;
    let singleLineText = 6;

    this.getAll()
      .subscribe(types => {
        this.date = types.find(type => type.id == dateId);
        this.comboBox = types.find(type => type.id == comboBoxId);
        this.checkBox = types.find(type => type.id == checkBoxId);
        this.radioButton = types.find(type => type.id == radioButtonId);
        this.multiLineText = types.find(type => type.id == multiLineText);
        this.singleLineText = types.find(type => type.id == singleLineText);

        this.typesLoaded = true;
      });
  }

  getAll() : Observable<FieldType[]> {
    return this.http.get<FieldType[]>(environment.apiUrl + '/field_types')
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(fieldTypes => {
          return fieldTypes.map(fieldType => {
            fieldType.shownName = fieldType.name;
            return fieldType;
          });
        })
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
