import {Answer} from "./Answer";
import {Form} from "./Form";

export class AnsweredForm {
  id: bigint;
  answers: Answer[];
  form: Form;

  constructor(id: bigint, answers: Answer[], form: Form) {
    this.id = id;
    this.answers = answers;
    this.form = form;
  }
}
