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
  inject,
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
  ItemCreatedEvent,
  OpenChangedEvent,
  SelectionChangedEvent,
} from "../events";
import { AllComponent } from "../internals/icons/all.component";
import { CheckmarkComponent } from "../internals/icons/checkmark.component";
import { NoneComponent } from "../internals/icons/none.component";
import { PlusComponent } from "../internals/icons/plus.component";
import { SearchService } from "../internals/search/search.service";
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
  items = input<Array<string>>([]);
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
  public filtered = signal<Set<string>>(new Set());
  public nextToggleState = signal<SelectionType>(this.SELECT);
  public searchForm = new UntypedFormGroup({
    searchInput: new UntypedFormControl(),
  });
  public searchInputValue = signal<string>("");

  private _itemsSet = signal<Set<string>>(new Set());
  private _createdItems = signal<Array<string>>([]);
  private _selectedSet = signal<Set<string>>(new Set());

  // Computed signal that combines input items with created items
  private _allItems = computed(() => {
    return [...this.items(), ...this._createdItems()];
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

  allowToggleSelectAll = computed(() => {
    const limit = this.selectAllLimit();
    const filteredSize = this.filtered().size;
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
    const filteredSize = this.filtered().size;
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
      this.filtered().size === 0 && !this.allowCreateItem() && !this.loading()
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
      this.filtered().size === 0 &&
      this.searchInputValue().length === 0 &&
      this.allowCreateItem() &&
      !this.loading()
    );
  });

  filteredItems = computed(() => {
    const items = this._allItems();
    const filteredSet = this.filtered();
    return items.filter((item) => filteredSet.has(item));
  });

  viewportHeight = computed(() => {
    const length = this.filteredItems().length;
    const height = this.itemHeight();
    return length * height > this.MAX_HEIGHT
      ? this.MAX_HEIGHT
      : length * height;
  });

  private searchService = inject(SearchService);

  constructor() {
    // Effect to track form value changes (non-debounced for immediate signal update)
    effect(() => {
      const subscription = this.searchForm
        .get("searchInput")
        .valueChanges.subscribe((value) => {
          this.searchInputValue.set(value || "");
        });

      return () => subscription.unsubscribe();
    });

    // Effect for handling search input changes (debounced for filtering)
    effect(() => {
      const searchInput$ = this.searchForm.get("searchInput").valueChanges;
      const subscription = this.searchService
        .debounceSearch(searchInput$, 300)
        .subscribe((value) => {
          if (!value) {
            this.filtered.set(new Set(this._allItems()));
          } else {
            const lowerCaseSearchInputValue = value.toLowerCase();
            const filteredValues = this._allItems().filter(
              (item) =>
                item.toLowerCase().indexOf(lowerCaseSearchInputValue) !== -1
            );

            this.filtered.set(new Set(filteredValues));
          }

          setTimeout(() => {
            this.viewport?.checkViewportSize();
          });
        });

      return () => subscription.unsubscribe();
    });

    // Effect for handling items input changes
    effect(() => {
      const items = this.items();
      const createdItems = this._createdItems();

      // Remove any created items that are now in the items input
      // This prevents duplicates when parent component updates items
      const remainingCreatedItems = createdItems.filter(
        (item) => !items.includes(item)
      );

      // Only update if there's a change, and use untracked when writing
      // to prevent infinite loop
      if (remainingCreatedItems.length !== createdItems.length) {
        // Use queueMicrotask to defer the update outside the effect
        queueMicrotask(() => {
          this._createdItems.set(remainingCreatedItems);
        });
      }

      const allItems = [...items, ...remainingCreatedItems];
      this.filtered.set(new Set(allItems));
      this._itemsSet.set(new Set(allItems));
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

  isFiltered(value: string): boolean {
    return this.filtered().has(value);
  }

  isSelected(value: string): boolean {
    return this._selectedSet().has(value);
  }

  onCreateItem(): void {
    const item = this.searchInputValue();
    this.createItem(item);
    this.itemCreated.next({
      created: item,
      items: this._allItems(),
      selection: this.getSelectionValue(),
    });
    this.resetFilterInput();
  }

  onEnterKeyPressed(): void {
    const filteredSet = this.filtered();

    if (this._allowMultiSelect() && filteredSet?.size) {
      this.selectMultiple();
    }

    if (!this._allowMultiSelect() && filteredSet?.size) {
      this._selectedSet.set(new Set([filteredSet.entries().next().value[0]]));
    }

    if (this.allowCreateItem() && !filteredSet?.size) {
      const item = this.searchInputValue();
      this.createItem(item);
      this.itemCreated.next({
        created: item,
        items: this._allItems(),
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

  onItemSelect(item: string): void {
    if (this._allowMultiSelect()) {
      const currentSet = new Set(this._selectedSet());
      if (currentSet.has(item)) {
        currentSet.delete(item);
      } else {
        currentSet.add(item);
      }
      this._selectedSet.set(currentSet);

      this.nextToggleState.set(
        currentSet.size > 0 ? this.DESELECT : this.SELECT
      );
    } else {
      this._selectedSet.set(new Set([item]));
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
    this._selectedSet.set(new Set(this._allItems()));
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

  private createItem(item: string): void {
    // Add the new item to created items
    this._createdItems.set([...this._createdItems(), item]);

    // Update selection
    const currentSelected = new Set(this._selectedSet());
    if (this._allowMultiSelect()) {
      currentSelected.add(item);
      this._selectedSet.set(currentSelected);
    } else {
      this._selectedSet.set(new Set([item]));
    }
  }

  private focusSearchInput(): void {
    setTimeout(() => this.search.nativeElement.focus());
  }

  private selectMultiple(): void {
    const currentSelected = new Set(this._selectedSet());
    this.filtered().forEach((item) => {
      if (!currentSelected.has(item)) {
        currentSelected.add(item);
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
