import { Component } from '@angular/core';
import { ItemCreatedEvent, NgbFilterableDropdownSelectionMode, OpenChangedEvent, SelectionChangedEvent } from 'projects/ngb-filterable-dropdown/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngb-filterable-dropdown-examples';

  selectionModes: Array<string> = Object.values(NgbFilterableDropdownSelectionMode);
  autoCloseValues = ['inside', 'outside', true, false];

  items = ['Beetle', 'Ant', 'Moth', 'Fire Ant', 'Dung Beetle', 'Grass Ant'];

  allowCreateItem = false;
  autoClose: boolean | 'inside' | 'outside' = false;
  customToggleText = false;
  disabled = false;
  genericHandleUseCustomHandle = true;
  genericHandleSelection: string | Array<string> = 'nothing';
  isGenericHandleDropdownOpen = false;
  searchInputPlaceholder = 'Search Bugs';
  selection: string | Array<string> = 'Moth';
  selectionMode = NgbFilterableDropdownSelectionMode.SingleSelect;

  allowCreateItemClick(event: CheckboxClickEvent): void {
    this.allowCreateItem = event.target.checked;
  }

  customToggleTextClick(event: CheckboxClickEvent) {
    this.customToggleText = event.target.checked;
  }

  disabledClick(event: CheckboxClickEvent): void {
    this.disabled = event.target.checked;
  }

  genericHandleOpenChanged($event: OpenChangedEvent): void {
    console.log($event);
    this.isGenericHandleDropdownOpen = $event.open;
  }

  genericHandlerOnSelectionChanged($event: SelectionChangedEvent): void {
    this.genericHandleSelection = $event.selection;
  }

  onAutoCloseValueChanged(value: boolean | 'inside' | 'outside'): void {
    this.autoClose = value;
  }

  onItemCreated(event: ItemCreatedEvent): void {
    this.items = event.items;
    this.selection = event.selection;
    console.log(event);
  }

  onOpenChanged(event: OpenChangedEvent): void {
    console.log(event);
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    this.selection = event.selection;
    console.log(event);
  }

  onSelectionModeChange(value: NgbFilterableDropdownSelectionMode): void {
    this.selectionMode = value;
    this.selection = [];
  }
}

interface CheckboxClickEvent {
  target: { checked: boolean };
}
