import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'multiSelect'
})
export class MockMultiSelectPipe implements PipeTransform {

  public static readonly ALL_ITEMS_STRING = "All";
  public static readonly MULTIPLE_ITEMS_STRING = "Multiple";

  transform(val: Array<string>): string {
    if (val.length === 0) {
      return MockMultiSelectPipe.ALL_ITEMS_STRING;
    } else if (val.length === 1) {
      return val[0];
    } else {
      return MockMultiSelectPipe.MULTIPLE_ITEMS_STRING;
    }
  }
}