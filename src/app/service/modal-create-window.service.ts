import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalCreateWindowService {

  private visible$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  open() {
    this.visible$.next(true);
  }

  close() {
    this.visible$.next(false);
  }

  isVisible(): boolean {
    return this.visible$.getValue();
  }
}
