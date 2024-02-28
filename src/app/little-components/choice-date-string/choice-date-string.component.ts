import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-choice-date-string',
  templateUrl: './choice-date-string.component.html',
  styleUrls: ['./choice-date-string.component.css']
})
export class ChoiceDateStringComponent implements OnInit, OnDestroy {
  @Input() fieldName: string;
  @Input() required: boolean = false;
  @Input() nextLine: boolean = false;
  @Input() formElement: FormControl<string>;
  @Input() showError: boolean = false;

  form = new FormGroup({
    date: new FormControl<Date>(new Date())
  });

  private subscription1: Subscription;

  ngOnInit() {
    this.subscription1 = this.form.controls.date.valueChanges
      .subscribe(value => {
        this.formElement.setValue(value.toString());
      });
  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
  }
}
