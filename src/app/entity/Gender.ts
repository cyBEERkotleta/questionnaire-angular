import {INamed} from "../additional/INamed";

export class Gender implements INamed {
  id: number;
  name: string;
  shownName: string;

  constructor(id: number, name: string, shownName: string) {
    this.id = id;
    this.name = name;
    this.shownName = shownName;
  }
}
