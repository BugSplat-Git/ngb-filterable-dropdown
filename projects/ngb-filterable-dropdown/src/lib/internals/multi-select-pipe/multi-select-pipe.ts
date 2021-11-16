import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiSelect'
})
export class MultiSelectPipe implements PipeTransform {

  public static readonly MULTIPLE_ITEMS_STRING = 'Multiple';

  transform(val: Array<string> | string, placeholderText: string): string {
    if (typeof val === 'string') {
      if (!val) {
        return placeholderText;
      }
      else {
        return val;
      }
    }
    else if (val instanceof Array) {
      if (val.length === 0) {
        return placeholderText;
      } else if (val.length === 1) {
        return val[0];
      } else {
        return MultiSelectPipe.MULTIPLE_ITEMS_STRING;
      }
    }

    return placeholderText;
  }
}
