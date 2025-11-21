
import { Component, signal } from "@angular/core";
import {
  ItemCreatedEvent,
  NgbCustomFilterableDropdownComponent,
  NgbFilterableDropdownComponent,
  NgbFilterableDropdownSelectionMode,
  OpenChangedEvent,
  SelectionChangedEvent,
} from "projects/ngb-filterable-dropdown/src";

@Component({
  selector: "app-root", // eslint-disable-line  @angular-eslint/component-selector
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    NgbFilterableDropdownComponent,
    NgbCustomFilterableDropdownComponent
],
})
export class AppComponent {
  title = "ngb-filterable-dropdown-examples";

  selectionModes: Array<string> = Object.values(
    NgbFilterableDropdownSelectionMode
  );
  autoCloseValues = ["inside", "outside", true, false];

  // Using signals for reactive state
  items = signal([
    "Beetle",
    "Ant",
    "Moth",
    "Fire Ant",
    "Dung Beetle",
    "Grass Ant",
    "A Really Long Made Up Bug Name For Testing Tooltips Etc Etc Yadda Yadda Yadda", 
  ]);

  lotsOfItems = signal([
    ...this.items(),
    ...this.generateLotsOfItems(),
  ]);

  allowCreateItem = signal(false);
  autoClose = signal<boolean | "inside" | "outside">(false);
  customToggleText = signal(false);
  disabled = signal(false);
  genericHandleUseCustomHandle = signal(true);
  genericHandleSelection = signal<string | Array<string>>("nothing");
  isGenericHandleDropdownOpen = signal(false);
  lotsOfItemsSelection = signal<string | Array<string>>("");
  searchInputPlaceholder = signal("Search Bugs");
  selection = signal<string | Array<string>>("Moth");
  selectionMode = signal(NgbFilterableDropdownSelectionMode.SingleSelect);
  tooltips = signal(false);
  tooltipsOpenDelay = signal(750);
  loading = signal(false);

  allowCreateItemClick(event: CheckboxClickEvent): void {
    this.allowCreateItem.set(event.target.checked);
  }

  customToggleTextClick(event: CheckboxClickEvent) {
    this.customToggleText.set(event.target.checked);
  }

  disabledClick(event: CheckboxClickEvent): void {
    this.disabled.set(event.target.checked);
  }

  genericHandleOpenChanged($event: OpenChangedEvent): void {
    console.log($event);
    this.isGenericHandleDropdownOpen.set($event.open);
  }

  genericHandlerOnSelectionChanged($event: SelectionChangedEvent): void {
    this.genericHandleSelection.set($event.selection);
  }

  lotsOfItemsSelectionChanged($event: SelectionChangedEvent): void {
    this.lotsOfItemsSelection.set($event.selection);
  }

  onAutoCloseValueChanged(value: boolean | "inside" | "outside"): void {
    this.autoClose.set(value);
  }

  onItemCreated(event: ItemCreatedEvent): void {
    this.items.set(event.items);
    this.selection.set(event.selection);
    console.log(event);
  }

  onOpenChanged(event: OpenChangedEvent): void {
    console.log(event);
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    this.selection.set(event.selection);
    console.log(event);
  }

  onSelectionModeChange(value: NgbFilterableDropdownSelectionMode): void {
    this.selectionMode.set(value);
    this.selection.set([]);
  }

  tooltipsClick(event: CheckboxClickEvent): void {
    this.tooltips.set(event.target.checked);
  }

  loadingClick(event: CheckboxClickEvent): void {
    this.loading.set(event.target.checked);
  }

  private generateLotsOfItems(): Array<string> {
    return Array.from({ length: 100000 }, (_, i) => `Bug ${i}`);
  }
}

interface CheckboxClickEvent {
  target: { checked: boolean };
}
