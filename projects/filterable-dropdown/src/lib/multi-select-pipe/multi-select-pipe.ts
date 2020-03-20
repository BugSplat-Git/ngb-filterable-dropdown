import { PipeTransform, Pipe } from "@angular/core";
import { FilterableItem } from '../filterable-dropdown.component';

@Pipe({
  name: 'multiSelect'
})
export class MultiSelectPipe implements PipeTransform {

  public static readonly ALL_ITEMS_STRING = "All";
  public static readonly MULTIPLE_ITEMS_STRING = "Multiple";

  transform(val: Array<string>): string {
    if (val.length === 0) {
      return MultiSelectPipe.ALL_ITEMS_STRING;
    } else if (val.length === 1) {
      return val[0];
    } else {
      return MultiSelectPipe.MULTIPLE_ITEMS_STRING;
    }
  }
}