import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-middle-control',
  templateUrl: './middle-control.component.html',
  styleUrls: ['./middle-control.component.css']
})
export class MiddleControlComponent {
  @Input() paddingTop: number = 0;
}
