import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() {

  }

  getRandomNumber(min: number, max: number): number {
    let rangeLength = max - min + 1;
    return Math.floor(Math.random() * rangeLength + min);
  }
}
