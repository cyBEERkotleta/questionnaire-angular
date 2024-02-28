import {Field} from "./Field";
import {Topic} from "./Topic";
import {User} from "./User";

export class Form {
  id: bigint;
  name: string;
  shown: boolean;
  user: User;
  topic: Topic;

  constructor(id: bigint, name: string, shown: boolean, user: User, topic: Topic) {
    this.id = id;
    this.name = name;
    this.shown = shown;
    this.user = user;
    this.topic = topic;
  }
}
