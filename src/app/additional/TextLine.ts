import {INamed} from "./INamed";

export class TextLine implements INamed {
  shownName: string;

  constructor(shownName: string) {
    this.shownName = shownName;
  }
}
