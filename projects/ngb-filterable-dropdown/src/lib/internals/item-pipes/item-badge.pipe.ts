import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem, DropdownItemBadge } from '../../dropdown-item';

@Pipe({
  name: 'itemBadge',
  pure: true,
})
export class ItemBadgePipe implements PipeTransform {
  transform(item: DropdownItem): DropdownItemBadge | undefined {
    return item.badge;
  }
}
