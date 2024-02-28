import {Component, Input} from '@angular/core';
import {Answer} from "../../entity/Answer";
import {RandomService} from "../../service/random.service";
import {Params} from "@angular/router";

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css']
})
export class AnswerItemComponent {
  @Input() answer: Answer;

  private randomService: RandomService;

  private borderColors: string[] = ['#5670f0', '#75bcff', '#2febd5', '#828282', '#8ede26', '#ab38e0',
        '#e0385f', '#ff6bf0', '#ffb92e', '#fbff00', '#ff1e00', '#0084ff', '#7e51e0', '#bf8df0',
        '#b0f6ff', '#eab0ff', '#ffb0f2', '#ffb0c2', '#b0ffe7', '#c0ffb0', '#b0b3ff'];

  constructor(randomService: RandomService) {
    this.randomService = randomService;
  }

  private getRandomColorIndex(): number {
    let min = 0;
    let max = this.borderColors.length - 1;
    return this.randomService.getRandomNumber(min, max);
  }

  private getBorderProperty(index: number): string {
    let borderColor = this.borderColors[index];
    return '1px solid ' + borderColor;
  }

  getProperties(): Params {
    let index = this.getRandomColorIndex();
    return {'border': this.getBorderProperty(index), 'border-radius': '4px'};
  }
}
