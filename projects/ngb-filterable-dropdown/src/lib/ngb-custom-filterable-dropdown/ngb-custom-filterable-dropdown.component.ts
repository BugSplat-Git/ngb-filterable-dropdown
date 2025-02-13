import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
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
import { debounceTime, Subscription } from "rxjs";
import {
  ItemCreatedEvent,
  OpenChangedEvent,
  SelectionChangedEvent,
} from "../events";
import { AllComponent } from "../internals/icons/all.component";
import { CheckmarkComponent } from "../internals/icons/checkmark.component";
import { NoneComponent } from "../internals/icons/none.component";
import { PlusComponent } from "../internals/icons/plus.component";
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
    CommonModule,
    ScrollingModule,
  ],
})
export class NgbCustomFilterableDropdownComponent implements OnInit, OnDestroy {
  public readonly SELECT = SelectionType.All;
  public readonly DESELECT = SelectionType.None;
  public readonly ITEM_SIZE = 40;
  public readonly MAX_HEIGHT = 280;

  @Input() autoClose: boolean | "outside" | "inside" = "outside";
  @Input() allowCreateItem = false;
  @Input() customClickHandle = false;
  @Input() disabled = false;
  @Input() searchInputPlaceholder = "Search";
  @Input() tooltips = false;
  @Input() tooltipsOpenDelay = 0;
  @Input() set items(value: Array<string>) {
    this.setItems(value);
  }
  get items(): Array<string> {
    return this._items;
  }

  @Input() set loading(value: boolean) {
    this.setLoading(value);
  }
  get loading(): boolean {
    return this._loading;
  }

  @Input() set selection(value: string | Array<string>) {
    this.setSelection(value);
  }
  get selection(): Array<string> | string {
    const arr: Array<any> = Array.from(this._selectedSet);
    if (this._allowMultiSelect) {
      return arr;
    }

    if (arr) {
      return arr[0];
    }

    return "";
  }

  @Input() set selectionMode(value: NgbFilterableDropdownSelectionMode) {
    this.setSelectionMode(value);
  }

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

  public filtered: Set<string> = new Set();
  public nextToggleState: SelectionType = this.SELECT;
  public searchForm = new UntypedFormGroup({
    searchInput: new UntypedFormControl(),
  });

  private _itemsSet: Set<string> = new Set();
  private _items: Array<string> = [];
  private _loading = false;
  private _selectionMode: NgbFilterableDropdownSelectionMode;
  private _selectedSet: Set<string> = new Set();
  private _valueChangesSubscription: Subscription;

  private _allowMultiSelect: boolean;

  get allowToggleSelectAll(): boolean {
    return (
      this._allowMultiSelect &&
      this.searchInputValue.length === 0 &&
      (this._selectionMode ===
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAll ||
        this._selectionMode ===
          NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone) &&
      !this.loading
    );
  }

  get allowToggleSelectMultiple(): boolean {
    return (
      this._allowMultiSelect &&
      this.searchInputValue.length > 0 &&
      this.filtered.size > 0 &&
      this._selectionMode ===
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone &&
      !this.loading
    );
  }

  get allowToggleSelectNone(): boolean {
    return (
      this._allowMultiSelect &&
      this._selectedSet.size > 0 &&
      (this._selectionMode ===
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectNone ||
        this._selectionMode ===
          NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone) &&
      !this.loading
    );
  }

  get noItemsToDisplay(): boolean {
    return this.filtered.size === 0 && !this.allowCreateItem && !this.loading;
  }

  get showCreateItem(): boolean {
    return (
      this.searchInputValue.length > 0 &&
      this.allowCreateItem &&
      !this._itemsSet.has(this.searchInputValue) &&
      !this.loading
    );
  }

  get searchInput(): AbstractControl {
    return this.searchForm.controls["searchInput"];
  }

  get searchInputValue(): string {
    return this.searchInput.value || "";
  }

  get typeToCreateItem(): boolean {
    return (
      this.filtered.size === 0 &&
      this.searchInputValue.length === 0 &&
      this.allowCreateItem &&
      !this.loading
    );
  }

  get filteredItems(): Array<string> {
    return this.items.filter(item => this.filtered.has(item));
  }

  get viewportHeight(): number {
    return this.filteredItems.length * this.ITEM_SIZE > this.MAX_HEIGHT 
      ? this.MAX_HEIGHT 
      : this.filteredItems.length * this.ITEM_SIZE;
  }

  ngOnInit(): void {
    this._valueChangesSubscription = this.searchForm
      .get("searchInput")
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (!value) {
          this.filtered = new Set(this.items);
        } else {
          const lowerCaseSearchInputValue = value.toLowerCase();
          const filteredValues = this.items.filter(
            (item) =>
              item.toLowerCase().indexOf(lowerCaseSearchInputValue) !== -1
          );

          this.filtered = new Set(filteredValues);
        }

        setTimeout(() => {
          this.viewport?.checkViewportSize();
        });
      });
  }

  ngOnDestroy(): void {
    this._valueChangesSubscription?.unsubscribe();
  }

  isFiltered(value: string): boolean {
    return this.filtered.has(value);
  }

  isSelected(value: string): boolean {
    return this._selectedSet.has(value);
  }

  onCreateItem(): void {
    const item = this.searchInputValue;
    this.createItem(item);
    this.itemCreated.next({
      created: item,
      items: this.items,
      selection: this.selection,
    });
    this.resetFilterInput();
  }

  onEnterKeyPressed(): void {
    if (this._allowMultiSelect && this.filtered?.size) {
      this.selectMultiple();
    }

    if (!this._allowMultiSelect && this.filtered?.size) {
      this._selectedSet = new Set([this.filtered.entries().next().value[0]]);
    }

    if (this.allowCreateItem && !this.filtered?.size) {
      const item = this.searchInputValue;
      this.createItem(item);
      this.itemCreated.next({
        created: item,
        items: this.items,
        selection: this.selection,
      });
      this.resetFilterInput();
    }

    if (!this.allowCreateItem) {
      this.selectionChanged.next({ selection: this.selection });
    }

    if (this.autoClose) {
      this.dropdown.close();
    }
  }

  onItemSelect(item: string): void {
    if (this._allowMultiSelect) {
      if (this._selectedSet.has(item)) {
        this._selectedSet.delete(item);
      } else {
        this._selectedSet.add(item);
      }

      this.nextToggleState =
        this._selectedSet.size > 0 ? this.DESELECT : this.SELECT;
    } else {
      this._selectedSet = new Set([item]);
    }
    this.selectionChanged.next({ selection: this.selection });
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
    this.nextToggleState = this.DESELECT;
    this._selectedSet = new Set(this.items);
    this.selectionChanged.next({ selection: this.selection });
  }

  onSelectMultiple(): void {
    this.selectMultiple();
    this.selectionChanged.next({ selection: this.selection });
  }

  onSelectNone(): void {
    this.nextToggleState = this.SELECT;
    this._selectedSet = new Set([]);
    this.selectionChanged.next({ selection: this.selection });
  }

  private resetFilterInput(): void {
    this.searchInput.setValue("");
  }

  private createItem(item: string): void {
    if (this._allowMultiSelect) {
      this._selectedSet.add(item);
    } else {
      this._selectedSet = new Set([item]);
    }

    this._items = [...this._items, item];
  }

  private focusSearchInput(): void {
    setTimeout(() => this.search.nativeElement.focus());
  }

  private setItems(value: string[]) {
    this.filtered = new Set(value);
    this._itemsSet = new Set(value);
    this._items = value;
  }

  private setLoading(value: boolean) {
    if (value) {
      this.searchInput.disable();
    } else {
      this.searchInput.enable();
      this.focusSearchInput();
    }

    this._loading = value;
  }

  private setSelectionMode(value: NgbFilterableDropdownSelectionMode) {
    if (value === NgbFilterableDropdownSelectionMode.MultiSelect) {
      this._allowMultiSelect = true;
    } else if (
      value === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAll
    ) {
      this._allowMultiSelect = true;
    } else if (
      value ===
      NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
    ) {
      this._allowMultiSelect = true;
    } else if (
      value === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectNone
    ) {
      this._allowMultiSelect = true;
    } else {
      this._allowMultiSelect = false;
    }

    this._selectionMode = value;
  }

  private setSelection(value: string | Array<string>): void {
    if (!value || value?.length === 0) {
      this._selectedSet = new Set([]);
      this.nextToggleState = this.SELECT;
      return;
    }

    if (typeof value === "string") {
      this._selectedSet = new Set([value]);
      return;
    }

    this.nextToggleState = this.DESELECT;
    this._selectedSet = new Set(value);
  }

  private selectMultiple(): void {
    this.filtered.forEach((item) => {
      if (!this._selectedSet.has(item)) {
        this._selectedSet.add(item);
      }
    });

    this.nextToggleState = this.DESELECT;
  }
}

export enum NgbFilterableDropdownSelectionMode {
  SingleSelect = "Single Select",
  MultiSelectWithSelectAllSelectNone = "Multi-Select with Select All and Select None",
  MultiSelectWithSelectAll = "Multi-Select with Select All",
  MultiSelectWithSelectNone = "Multi-Select with Select None",
  MultiSelect = "Multi-Select",
}
