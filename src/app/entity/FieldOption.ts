import {INamed} from "../additional/INamed";

export class FieldOption implements INamed {
  id: bigint;
  text: string;
  shownName: string;

  constructor(id: bigint, text: string) {
    this.id = id;
    this.text = text;

    this.shownName = text;
  }
}
