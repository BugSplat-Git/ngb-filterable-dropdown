
import { Component, EventEmitter, Output, input } from "@angular/core";
import {
  ItemCreatedEvent,
  OpenChangedEvent,
  SelectionChangedEvent,
} from "../events";
import { MultiSelectPipe } from "../internals/multi-select-pipe/multi-select-pipe";
import { NgbCustomFilterableDropdownComponent } from "../ngb-custom-filterable-dropdown/ngb-custom-filterable-dropdown.component";
import { NgbFilterableDropdownSelectionMode } from "../ngb-filterable-drop-down-selection-mode";

@Component({
  selector: "ngb-filterable-dropdown", // eslint-disable-line  @angular-eslint/component-selector
  templateUrl: "./ngb-filterable-dropdown.component.html",
  styleUrls: ["./ngb-filterable-dropdown.component.scss"],
  imports: [
    NgbCustomFilterableDropdownComponent,
    MultiSelectPipe
],
})
export class NgbFilterableDropdownComponent {
  // Signal Inputs
  allowCreateItem = input(false);
  autoClose = input<boolean | "outside" | "inside">(false);
  disabled = input(false);
  items = input<string | Array<string>>([]);
  itemHeight = input(37);
  loading = input(false);
  placeholder = input("No Items Selected");
  searchInputPlaceholder = input("Search");
  selection = input<string | Array<string>>([]);
  selectionMode = input<NgbFilterableDropdownSelectionMode>(
    NgbFilterableDropdownSelectionMode.SingleSelect
  );
  tooltips = input(false);
  tooltipsOpenDelay = input(0);

  @Output()
  itemCreated: EventEmitter<ItemCreatedEvent> =
    new EventEmitter<ItemCreatedEvent>();
  @Output()
  openChanged: EventEmitter<OpenChangedEvent> =
    new EventEmitter<OpenChangedEvent>();
  @Output()
  selectionChanged: EventEmitter<SelectionChangedEvent> =
    new EventEmitter<SelectionChangedEvent>();

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
