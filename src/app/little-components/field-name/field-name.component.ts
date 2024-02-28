import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-field-name',
  templateUrl: './field-name.component.html',
  styleUrls: ['./field-name.component.css']
})
export class FieldNameComponent {
  @Input() fieldName: string;
  @Input() required: boolean;
}
