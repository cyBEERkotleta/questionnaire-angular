import {INamed} from "../additional/INamed";

export class FieldType implements INamed {
  id: number;
  name: string;
  ableToHaveOptions: boolean;
  shownName: string;

  constructor(id: number, name: string, ableToHaveOptions: boolean) {
    this.id = id;
    this.name = name;
    this.ableToHaveOptions = ableToHaveOptions;

    this.shownName = name;
  }
}
