import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-horizontal-line',
  templateUrl: './horizontal-line.component.html',
  styleUrls: ['./horizontal-line.component.css']
})
export class HorizontalLineComponent {
  @Input() colorName: string;
}
