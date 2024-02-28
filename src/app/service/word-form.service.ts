import { Injectable } from '@angular/core';
import {WordForm} from "../additional/WordForm";

@Injectable({
  providedIn: 'root'
})
export class WordFormService {
  private question = new WordForm('вопрос', 'вопроса', 'вопросов');

  getQuestionForm(count: number): string {
    return this.getForm(this.question, count);
  }

  private getForm(word: WordForm, count: number): string {
    if (count >= 11 && count <= 14)
      return word.many;

    if (count % 10 == 1)
      return word.one;

    if (count % 10 == 2 || count % 10 == 3 || count % 10 == 4)
      return word.two;

    return word.many;
  }
}
