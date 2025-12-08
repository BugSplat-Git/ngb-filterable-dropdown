import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem, DropdownItemInput } from '../../dropdown-item';

@Pipe({
  name: 'itemValue',
  pure: true,
})
export class ItemValuePipe implements PipeTransform {
  transform(item: DropdownItem): string {
    return item.value;
  }
}
