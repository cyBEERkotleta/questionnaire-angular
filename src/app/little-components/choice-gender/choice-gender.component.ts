import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Gender} from "../../entity/Gender";
import {GenderService} from "../../service/gender.service";
import {INamed} from "../../additional/INamed";
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-choice-gender',
  templateUrl: './choice-gender.component.html',
  styleUrls: ['./choice-gender.component.css']
})
export class ChoiceGenderComponent implements OnInit, OnDestroy {
  @Input() formElement: FormControl<Gender>;
  @Input() fieldName: string;
  @Input() showError: boolean = false;

  @Output() listenerToValueChangeReady = new EventEmitter();

  genders: Gender[];
  selectedGender: Gender;

  private genderService: GenderService;

  private subscription1: Subscription;
  private subscription2: Subscription;

  gendersLoaded = false;

  constructor(genderService: GenderService) {
    this.genderService = genderService;
  }

  ngOnInit() {
    this.subscription1 = this.genderService.getAll()
      .subscribe(genders => {
      this.genders = genders;
      this.gendersLoaded = true;
    });

    this.subscription2 = this.formElement.valueChanges
      .subscribe(gender => {
        this.selectedGender = gender;
      });
    this.listenerToValueChangeReady.emit();
  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
    if (this.subscription2)
      this.subscription2.unsubscribe();
  }

  onChange(item: INamed) {
    this.selectedGender = item as Gender;
    this.formElement.setValue(this.selectedGender);
  }

  isFieldRequired(): boolean {
    return this.formElement.hasValidator(Validators.required);
  }
}
