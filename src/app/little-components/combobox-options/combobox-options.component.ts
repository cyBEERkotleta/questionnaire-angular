import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {INamed} from "../../additional/INamed";
import {FieldOption} from "../../entity/FieldOption";

@Component({
  selector: 'app-combobox-options',
  templateUrl: './combobox-options.component.html',
  styleUrls: ['./combobox-options.component.css']
})
export class ComboboxOptionsComponent implements OnInit, OnDestroy {
  @Input() formElement: FormControl<FieldOption>;
  @Input() required: boolean = false;
  @Input() fieldName: string;
  @Input() showError: boolean = false;

  @Input() options: FieldOption[];
  selectedOption: FieldOption;

  private subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.subscription = this.formElement.valueChanges
      .subscribe(option => {
        this.selectedOption = option;
      });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }


  onChange(item: INamed) {
    this.selectedOption = item as FieldOption;
    this.formElement.setValue(this.selectedOption);
  }

  isFieldRequired(): boolean {
    return this.formElement.hasValidator(Validators.required);
  }
}
