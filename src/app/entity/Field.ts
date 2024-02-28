import {FieldType} from "./FieldType";
import {FieldOption} from "./FieldOption";
import {Form} from "./Form";

export class Field {
  id: bigint;
  label: string;
  type: FieldType;
  required: boolean;
  active: boolean;
  options: FieldOption[];
  form: Form;

  constructor(id: bigint, label: string, type: FieldType, required: boolean, active: boolean,
              options: FieldOption[], form: Form) {
    this.id = id;
    this.label = label;
    this.type = type;
    this.required = required;
    this.active = active;
    this.options = options;
    this.form = form;
  }
}
