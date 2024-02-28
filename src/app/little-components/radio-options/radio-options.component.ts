import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Gender} from "../../entity/Gender";
import {GenderService} from "../../service/gender.service";
import {Subscription} from "rxjs";
import {INamed} from "../../additional/INamed";
import {FieldOption} from "../../entity/FieldOption";

@Component({
  selector: 'app-radio-options',
  templateUrl: './radio-options.component.html',
  styleUrls: ['./radio-options.component.css']
})
export class RadioOptionsComponent {
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
