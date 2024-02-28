import {INamed} from "../additional/INamed";

export class Topic implements INamed {
  id: bigint;
  name: string;
  description: string;
  shownName: string;

  constructor(id: bigint, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;

    this.shownName = name;
  }
}
