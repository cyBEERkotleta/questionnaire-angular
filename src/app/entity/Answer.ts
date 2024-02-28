import {Field} from "./Field";

export class Answer {
  id: bigint;
  text: string;
  field: Field;

  constructor(id: bigint, text: string, field: Field) {
    this.id = id;
    this.text = text;
    this.field = field;
  }
}
