import {Component, Input} from '@angular/core';
import {AnsweredForm} from "../../entity/AnsweredForm";

@Component({
  selector: 'app-answered-form-item',
  templateUrl: './answered-form-item.component.html',
  styleUrls: ['./answered-form-item.component.css']
})
export class AnsweredFormItemComponent {
  @Input() answeredForm: AnsweredForm;
}
