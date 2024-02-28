import { Pipe, PipeTransform } from '@angular/core';
import {Topic} from "../entity/Topic";

@Pipe({
  name: 'filterTopics'
})
export class FilterTopicsPipe implements PipeTransform {

  transform(topics: Topic[], search: string): Topic[] {
    if (!topics)
      return [];
    return topics.filter(t => this.topicFitsBySearchStr(t, search));
  }

  private topicFitsBySearchStr(t: Topic, search: string): boolean {
    let searchLower = search.toLowerCase();
    return t.name.toLowerCase().includes(searchLower) ||
      t.description.toLowerCase().includes(searchLower);
  }
}
