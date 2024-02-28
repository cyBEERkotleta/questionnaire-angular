import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {INamed} from "../../additional/INamed";
import {FieldType} from "../../entity/FieldType";
import {FieldTypeService} from "../../service/field-type.service";

@Component({
  selector: 'app-combobox-field-type',
  templateUrl: './combobox-field-type.component.html',
  styleUrls: ['./combobox-field-type.component.css']
})
export class ComboboxFieldTypeComponent {
  @Input() formElement: FormControl<FieldType>;
  @Input() fieldName: string;
  @Input() showError: boolean = false;

  @Output() listenerToValueChangeReady = new EventEmitter();

  @Output() newValueSelected = new EventEmitter<FieldType>();

  fieldTypes: FieldType[];
  selectedType: FieldType;

  private fieldTypeService: FieldTypeService;

  private subscription1: Subscription;
  private subscription2: Subscription;

  typesLoaded = false;

  constructor(fieldTypeService: FieldTypeService) {
    this.fieldTypeService = fieldTypeService;
  }

  ngOnInit() {
    this.subscription1 = this.fieldTypeService.getAll()
      .subscribe(result => {
        this.fieldTypes = result;
        this.typesLoaded = true;
      });

    this.subscription2 = this.formElement.valueChanges
      .subscribe(fieldType => {
        this.selectedType = fieldType;
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
    this.selectedType = item as FieldType;
    this.formElement.setValue(this.selectedType);

    this.newValueSelected.emit(this.selectedType);
  }

  isFieldRequired(): boolean {
    return this.formElement.hasValidator(Validators.required);
  }
}
