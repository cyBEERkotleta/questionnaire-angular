import { Pipe, PipeTransform } from '@angular/core';
import {Form} from "../entity/Form";

@Pipe({
  name: 'filterForms'
})
export class FilterFormsPipe implements PipeTransform {

  transform(forms: Form[], search: string): Form[] {
    if (!forms)
      return [];
    return forms.filter(f => this.topicFitsBySearchStr(f, search));
  }

  private topicFitsBySearchStr(f: Form, search: string): boolean {
    let searchLower = search.toLowerCase();
    return f.name.toLowerCase().includes(searchLower);
  }
}
