import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {Field} from "../../entity/Field";
import {FieldOption} from "../../entity/FieldOption";

@Component({
  selector: 'app-checkbox-options-string',
  templateUrl: './checkbox-options-string.component.html',
  styleUrls: ['./checkbox-options-string.component.css']
})
export class CheckboxOptionsStringComponent implements OnInit, OnDestroy {
  @Input() field: Field;
  @Input() required: boolean = false;
  @Input() formElement: FormControl<string>;
  @Input() showError: boolean = false;

  form = new FormGroup({
    fieldOptions: new FormControl<FieldOption[]>([])
  });

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.form.controls.fieldOptions.valueChanges
      .subscribe(value => {
        let strValue = this.convertToString(value);
        this.formElement.setValue(strValue);
      });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  private convertToString(options: FieldOption[]): string {
    if (options.length == 1)
      return options[0].shownName;

    let result = '';
    for (let i = 0; i < options.length; i++) {
      result += (i + 1) + ') ' + options[i].shownName + '; ';
    }
    return result;
  }
}
