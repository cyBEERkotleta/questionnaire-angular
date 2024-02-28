import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalDeleteWindowService {
  private visible$ = new BehaviorSubject<boolean>(false);
  private deletable: Object;

  constructor() { }

  open(deletable: Object) {
    this.deletable = deletable;
    this.visible$.next(true);
  }

  getDeletableObject(): Object {
    return this.deletable;
  }

  close() {
    this.visible$.next(false);
  }

  isVisible(): boolean {
    return this.visible$.getValue();
  }
}
