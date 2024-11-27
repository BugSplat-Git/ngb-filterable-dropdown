import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemCreatedEvent, OpenChangedEvent, SelectionChangedEvent } from '../events';
import { NgbFilterableDropdownSelectionMode } from '../ngb-filterable-drop-down-selection-mode';

@Component({
    selector: 'ngb-filterable-dropdown', // eslint-disable-line  @angular-eslint/component-selector
    templateUrl: './ngb-filterable-dropdown.component.html',
    styleUrls: ['./ngb-filterable-dropdown.component.scss'],
    standalone: false
})
export class NgbFilterableDropdownComponent {
  @Input() allowCreateItem = false;
  @Input() autoClose: boolean | 'outside' | 'inside' = false;
  @Input() disabled = false;
  @Input() items: string | Array<string> = [];
  @Input() loading = false;
  @Input() placeholder = 'No Items Selected';
  @Input() searchInputPlaceholder = 'Search';
  @Input() selection: string | Array<string> = [];
  @Input() selectionMode: NgbFilterableDropdownSelectionMode;
  @Input() tooltips = false;
  @Input() tooltipsOpenDelay = 0;

  @Output()
  itemCreated: EventEmitter<ItemCreatedEvent> = new EventEmitter<ItemCreatedEvent>();
  @Output()
  openChanged: EventEmitter<OpenChangedEvent> = new EventEmitter<OpenChangedEvent>();
  @Output()
  selectionChanged: EventEmitter<SelectionChangedEvent> = new EventEmitter<SelectionChangedEvent>();

  onItemCreated($event: ItemCreatedEvent) {
    this.itemCreated.next($event);
  }

  onOpenChanged($event: OpenChangedEvent) {
    this.openChanged.next($event);
  }

  onSelectionChanged($event: SelectionChangedEvent) {
    this.selectionChanged.next($event);
  }
}
