import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CheckBoxState} from "../../additional/CheckBoxState";
import {Field} from "../../entity/Field";
import {FieldOption} from "../../entity/FieldOption";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-checkbox-options',
  templateUrl: './checkbox-options.component.html',
  styleUrls: ['./checkbox-options.component.css']
})
export class CheckboxOptionsComponent implements OnInit, OnDestroy {
  @Input() field: Field;
  @Input() required: boolean = false;
  @Input() showError: boolean = false;
  @Input() formElement: FormControl<FieldOption[]>;

  form = new FormGroup({
    checkboxStates: new FormControl<CheckBoxState[]>([])
  });

  private subscription: Subscription;

  generateOptionNames(): string[] {
    return this.field.options.map(option => option.shownName);
  }

  ngOnInit() {
    this.form.controls.checkboxStates.valueChanges
      .subscribe(value => {
        this.formElement.setValue(this.convertToOptions(value));
      });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  private convertToOptions(states: CheckBoxState[]): FieldOption[] {
    let options: FieldOption[] = [];
    for (let i = 0; i < states.length; i++) {
      let option: FieldOption = this.field.options.find(option => option.text == states[i].text);
      options.push(option);
    }
    return options;
  }
}
