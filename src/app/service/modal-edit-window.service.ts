import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalEditWindowService {
  private visible$ = new BehaviorSubject<boolean>(false);
  private editable: Object;

  constructor() { }

  open(editable: Object) {
    this.editable = editable;
    this.visible$.next(true);
  }

  getEditableObject(): Object {
    return this.editable;
  }

  close() {
    this.visible$.next(false);
  }

  isVisible(): boolean {
    return this.visible$.getValue();
  }
}
