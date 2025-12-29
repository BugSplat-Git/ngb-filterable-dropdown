import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from "@angular/cdk/scrolling";

import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  computed,
  effect,
  input,
  signal,
} from "@angular/core";
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from "@angular/forms";
import {
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbTooltip,
} from "@ng-bootstrap/ng-bootstrap";
import {
  DropdownItem,
  DropdownItemInput,
} from "../dropdown-item";
import {
  ItemCreatedEvent,
  OpenChangedEvent,
  SelectionChangedEvent,
} from "../events";
import { AllComponent } from "../internals/icons/all.component";
import { CheckmarkComponent } from "../internals/icons/checkmark.component";
import { NoneComponent } from "../internals/icons/none.component";
import { PlusComponent } from "../internals/icons/plus.component";
import { ItemValuePipe } from "../internals/item-pipes/item-value.pipe";
import { ItemBadgePipe } from "../internals/item-pipes/item-badge.pipe";
import { NgbFilterableDropdownSelectionMode } from "../ngb-filterable-drop-down-selection-mode";
import { SelectionType } from "../selection-type";

@Component({
  selector: "ngb-custom-filterable-dropdown", // eslint-disable-line  @angular-eslint/component-selector
  templateUrl: "./ngb-custom-filterable-dropdown.component.html",
  styleUrls: ["./ngb-custom-filterable-dropdown.component.scss"],
  imports: [
    NgbDropdown,
    NgbDropdownToggle,
    NgbTooltip,
    NgbDropdownMenu,
    ReactiveFormsModule,
    AllComponent,
    NoneComponent,
    PlusComponent,
    CheckmarkComponent,
    ScrollingModule,
    ItemValuePipe,
    ItemBadgePipe,
  ]
})
export class NgbCustomFilterableDropdownComponent {
  public readonly SELECT = SelectionType.All;
  public readonly DESELECT = SelectionType.None;
  public readonly MAX_HEIGHT = 280;

  // Signal Inputs
  autoClose = input<boolean | "outside" | "inside">("outside");
  allowCreateItem = input(false);
  customClickHandle = input(false);
  disabled = input(false);
  itemHeight = input(37);
  searchInputPlaceholder = input("Search");
  selectAllLimit = input<number | undefined>(undefined);
  tooltips = input(false);
  tooltipsOpenDelay = input(0);
  items = input<Array<DropdownItemInput>>([]);
  loading = input(false);
  selection = input<string | Array<string>>([]);
  selectionMode = input<NgbFilterableDropdownSelectionMode>(
    NgbFilterableDropdownSelectionMode.SingleSelect
  );

  // Outputs
  @Output()
  itemCreated: EventEmitter<ItemCreatedEvent> =
    new EventEmitter<ItemCreatedEvent>();
  @Output()
  selectionChanged: EventEmitter<SelectionChangedEvent> =
    new EventEmitter<SelectionChangedEvent>();
  @Output()
  openChanged: EventEmitter<OpenChangedEvent> =
    new EventEmitter<OpenChangedEvent>();

  @ViewChild("search", { static: true }) search: ElementRef;
  @ViewChild("dropdown", { static: true }) dropdown: NgbDropdown;
  @ViewChild("viewport") viewport: CdkVirtualScrollViewport;

  // Internal State Signals
  public nextToggleState = signal<SelectionType>(this.SELECT);
  public searchForm = new UntypedFormGroup({
    searchInput: new UntypedFormControl(),
  });
  public searchInputValue = signal<string>("");

  private _createdItems = signal<Array<DropdownItem>>([]);
  private _selectedSet = signal<Set<string>>(new Set());

  // Computed signal that combines input items with created items
  private _allItems = computed(() => {
    const normalizedInputItems = this.normalizeItems(this.items());
    return [...normalizedInputItems, ...this._createdItems()];
  });

  // Computed signal for the set of all item values (for checking if item exists)
  private _itemsSet = computed(() => {
    return new Set(this._allItems().map(item => item.value));
  });

  // Computed Signals
  _allowMultiSelect = computed(() => {
    const mode = this.selectionMode();
    return (
      mode === NgbFilterableDropdownSelectionMode.MultiSelect ||
      mode === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAll ||
      mode ===
      NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone ||
      mode === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectNone
    );
  });

  // Pure computed signal for filtered items - no race condition!
  filteredItems = computed(() => {
    const items = this._allItems();
    const searchTerm = this.searchInputValue().toLowerCase().trim();
    
    if (!searchTerm) {
      return items;
    }
    
    return items.filter(
      (item) => item.value.toLowerCase().indexOf(searchTerm) !== -1
    );
  });

  // Computed set of filtered items (for size checks)
  private _filteredSet = computed(() => {
    return new Set(this.filteredItems());
  });

  allowToggleSelectAll = computed(() => {
    const limit = this.selectAllLimit();
    const filteredSize = this._filteredSet().size;
    const withinLimit = limit === undefined || filteredSize <= limit;
    return (
      this._allowMultiSelect() &&
      this.searchInputValue().length === 0 &&
      (this.selectionMode() ===
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAll ||
        this.selectionMode() ===
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone) &&
      !this.loading() &&
      withinLimit
    );
  });

  allowToggleSelectMultiple = computed(() => {
    const limit = this.selectAllLimit();
    const filteredSize = this._filteredSet().size;
    const withinLimit = limit === undefined || filteredSize <= limit;
    return (
      this._allowMultiSelect() &&
      this.searchInputValue().length > 0 &&
      this.selectionMode() ===
      NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone &&
      !this.loading() &&
      filteredSize > 0 &&
      withinLimit
    );
  });

  allowToggleSelectNone = computed(() => {
    return (
      this._allowMultiSelect() &&
      this._selectedSet().size > 0 &&
      (this.selectionMode() ===
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectNone ||
        this.selectionMode() ===
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone) &&
      !this.loading()
    );
  });

  noItemsToDisplay = computed(() => {
    return (
      this._filteredSet().size === 0 && !this.allowCreateItem() && !this.loading()
    );
  });

  showCreateItem = computed(() => {
    return (
      this.searchInputValue().length > 0 &&
      this.allowCreateItem() &&
      !this._itemsSet().has(this.searchInputValue()) &&
      !this.loading()
    );
  });

  get searchInput(): AbstractControl {
    return this.searchForm.controls["searchInput"];
  }

  typeToCreateItem = computed(() => {
    return (
      this._filteredSet().size === 0 &&
      this.searchInputValue().length === 0 &&
      this.allowCreateItem() &&
      !this.loading()
    );
  });

  viewportHeight = computed(() => {
    const length = this.filteredItems().length;
    const height = this.itemHeight();
    return length * height > this.MAX_HEIGHT
      ? this.MAX_HEIGHT
      : length * height;
  });

  /**
   * Normalizes mixed input items (strings or DropdownItem objects) into uniform DropdownItem format
   */
  private normalizeItems(items: Array<DropdownItemInput>): Array<DropdownItem> {
    return items.map(item => 
      typeof item === 'string' ? { value: item } : item
    );
  }

  constructor() {
    // Effect to track form value changes - updates searchInputValue signal immediately
    effect(() => {
      const subscription = this.searchForm
        .get("searchInput")
        .valueChanges.subscribe((value) => {
          this.searchInputValue.set(value || "");
          // Check viewport size after search changes
          setTimeout(() => {
            this.viewport?.checkViewportSize();
          });
        });

      return () => subscription.unsubscribe();
    });

    // Effect for handling items input changes - removes duplicates from created items
    effect(() => {
      const items = this.items();
      const normalizedItems = this.normalizeItems(items);
      const createdItems = this._createdItems();

      // Remove any created items that are now in the items input
      // This prevents duplicates when parent component updates items
      const normalizedItemValues = normalizedItems.map(item => item.value);
      const remainingCreatedItems = createdItems.filter(
        (item) => !normalizedItemValues.includes(item.value)
      );

      // Only update if there's a change
      if (remainingCreatedItems.length !== createdItems.length) {
        // Use queueMicrotask to defer the update outside the effect
        queueMicrotask(() => {
          this._createdItems.set(remainingCreatedItems);
        });
      }
    });

    // Effect for handling loading input changes
    effect(() => {
      const isLoading = this.loading();
      if (isLoading) {
        this.searchInput.disable();
      } else {
        this.searchInput.enable();
        this.focusSearchInput();
      }
    });

    // Effect for handling selection input changes
    effect(() => {
      const value = this.selection();
      if (!value || (Array.isArray(value) && value.length === 0)) {
        this._selectedSet.set(new Set([]));
        this.nextToggleState.set(this.SELECT);
        return;
      }

      if (typeof value === "string") {
        this._selectedSet.set(new Set([value]));
        return;
      }

      this.nextToggleState.set(this.DESELECT);
      this._selectedSet.set(new Set(value));
    });
  }

  isFiltered(item: DropdownItem): boolean {
    return this._filteredSet().has(item);
  }

  isSelected(item: DropdownItem): boolean {
    return this._selectedSet().has(item.value);
  }

  onCreateItem(): void {
    const itemValue = this.searchInputValue();
    this.createItem(itemValue);
    this.itemCreated.next({
      created: itemValue,
      items: this._allItems().map(item => item.value),
      selection: this.getSelectionValue(),
    });
    this.resetFilterInput();
  }

  onEnterKeyPressed(): void {
    const filtered = this.filteredItems();

    if (this._allowMultiSelect() && filtered.length) {
      this.selectMultiple();
    }

    if (!this._allowMultiSelect() && filtered.length) {
      const firstItem = filtered[0];
      this._selectedSet.set(new Set([firstItem.value]));
    }

    if (this.allowCreateItem() && !filtered.length) {
      const itemValue = this.searchInputValue();
      this.createItem(itemValue);
      this.itemCreated.next({
        created: itemValue,
        items: this._allItems().map(item => item.value),
        selection: this.getSelectionValue(),
      });
      this.resetFilterInput();
    }

    if (!this.allowCreateItem()) {
      this.selectionChanged.next({ selection: this.getSelectionValue() });
    }

    if (this.autoClose()) {
      this.dropdown.close();
    }
  }

  onItemSelect(item: DropdownItem): void {
    const itemValue = item.value;
    if (this._allowMultiSelect()) {
      const currentSet = new Set(this._selectedSet());
      if (currentSet.has(itemValue)) {
        currentSet.delete(itemValue);
      } else {
        currentSet.add(itemValue);
      }
      this._selectedSet.set(currentSet);

      this.nextToggleState.set(
        currentSet.size > 0 ? this.DESELECT : this.SELECT
      );
    } else {
      this._selectedSet.set(new Set([itemValue]));
    }
    this.selectionChanged.next({ selection: this.getSelectionValue() });
  }

  onOpenChange(open: boolean): void {
    if (open) {
      this.focusSearchInput();
      setTimeout(() => {
        this.viewport?.checkViewportSize();
      });
    } else {
      this.resetFilterInput();
    }

    this.openChanged.next({ open });
  }

  onSelectAll(): void {
    this.nextToggleState.set(this.DESELECT);
    this._selectedSet.set(new Set(this._allItems().map(item => item.value)));
    this.selectionChanged.next({ selection: this.getSelectionValue() });
  }

  onSelectMultiple(): void {
    this.selectMultiple();
    this.selectionChanged.next({ selection: this.getSelectionValue() });
  }

  onSelectNone(): void {
    this.nextToggleState.set(this.SELECT);
    this._selectedSet.set(new Set([]));
    this.selectionChanged.next({ selection: this.getSelectionValue() });
  }

  private resetFilterInput(): void {
    this.searchInput.setValue("");
  }

  private createItem(itemValue: string): void {
    // Create new DropdownItem without badge
    const newItem: DropdownItem = { value: itemValue };
    
    // Add the new item to created items
    this._createdItems.set([...this._createdItems(), newItem]);

    // Update selection
    const currentSelected = new Set(this._selectedSet());
    if (this._allowMultiSelect()) {
      currentSelected.add(itemValue);
      this._selectedSet.set(currentSelected);
    } else {
      this._selectedSet.set(new Set([itemValue]));
    }
  }

  private focusSearchInput(): void {
    setTimeout(() => this.search.nativeElement.focus());
  }

  private selectMultiple(): void {
    const currentSelected = new Set(this._selectedSet());
    this.filteredItems().forEach((item) => {
      if (!currentSelected.has(item.value)) {
        currentSelected.add(item.value);
      }
    });
    this._selectedSet.set(currentSelected);
    this.nextToggleState.set(this.DESELECT);
  }

  getSelectionValue(): Array<string> | string {
    const arr: Array<any> = Array.from(this._selectedSet());
    if (this._allowMultiSelect()) {
      return arr;
    }

    if (arr && arr.length > 0) {
      return arr[0];
    }

    return "";
  }
}
