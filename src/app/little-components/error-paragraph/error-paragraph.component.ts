import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-paragraph',
  templateUrl: './error-paragraph.component.html',
  styleUrls: ['./error-paragraph.component.css']
})
export class ErrorParagraphComponent {
  @Input() errorMessage: string;
}
