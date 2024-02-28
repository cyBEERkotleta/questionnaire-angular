import {Component, Input, OnDestroy} from '@angular/core';
import {Form} from "../../entity/Form";
import {RandomService} from "../../service/random.service";
import {Params} from "@angular/router";
import {WordFormService} from "../../service/word-form.service";

@Component({
  selector: 'app-form-item-in-list',
  templateUrl: './form-item-in-list.component.html',
  styleUrls: ['./form-item-in-list.component.css']
})
export class FormItemInListComponent {
  @Input() form: Form;
  @Input() fieldCount: number;

  private randomService: RandomService;
  private wordFormService: WordFormService;

  private colorsFrom: string[] = ['#f2a8f5', '#86e796', '#a190e8', '#fcffe0', '#ffcfd7', '#cff0ff', '#44aeeb',
    '#a3e041', '#ffe0fc', '#c045ed', '#f05d5d', '#d1fff4'];
  private colorsTo: string[] = ['#faf3ff', '#eafff7', '#e0e0ff', '#fcc92e', '#d94a4a', '#5485e8', '#b3faff',
    '#fff7cf', '#45ceed', '#cff6ff', '#feffc7', '#5b78e3'];

  constructor(randomService: RandomService,
              wordFormService: WordFormService) {
    this.randomService = randomService;
    this.wordFormService = wordFormService;
  }

  getFormName(): string {
    if (!this.form)
      return '';
    return this.form.name;
  }

  getFormQuestionsDescription(): string {
    if (!this.form)
      return '';
    let count = this.fieldCount;
    let questionStr = this.wordFormService.getQuestionForm(count);
    return '(' + count + ' ' + questionStr + ')';
  }

  private getRandomColorIndex(): number {
    let min = 0;
    let max = this.colorsFrom.length - 1;
    return this.randomService.getRandomNumber(min, max);
  }

  private getBackgroundProperty(index: number): string {
    let colorFrom = this.colorsFrom[index];
    let colorTo = this.colorsTo[index];
    return 'linear-gradient(to top left, ' + colorFrom + ', ' + colorTo +')';
  }

  getProperties(): Params {
    let index = this.getRandomColorIndex();
    return {background: this.getBackgroundProperty(index)};
  }
}
