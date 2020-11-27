import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { ItemCreatedEvent, OpenChangedEvent, SelectionChangedEvent } from "./events";
import { SelectionType } from "./selection-type";

@Component({
  selector: "ngb-filterable-dropdown",
  templateUrl: "./ngb-filterable-dropdown.component.html",
  styleUrls: ["./ngb-filterable-dropdown.component.scss"]
})
export class NgbFilterableDropdownComponent implements OnInit, OnDestroy {

  public readonly SELECT = SelectionType.All;
  public readonly DESELECT = SelectionType.None;

  @Input() autoClose: boolean | "outside" | "inside" = "outside";
  @Input() allowCreateItem: boolean;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = "No Items Selected";
  @Input() set items(value: Array<string>) {
    this.setItems(value);
  }
  @Input() set loading(value: boolean) {
    this.setLoading(value);
  }
  @Input() set selection(value: string | Array<string>) {
    this.setSelection(value);
  }
  @Input() set selectionMode(value: NgbFilterableDropdownSelectionMode) {
    this.setSelectionMode(value);
  }

  @Output() itemCreated: EventEmitter<ItemCreatedEvent> = new EventEmitter<ItemCreatedEvent>();
  @Output() selectionChanged: EventEmitter<SelectionChangedEvent> = new EventEmitter<SelectionChangedEvent>();
  @Output() openChanged: EventEmitter<OpenChangedEvent> = new EventEmitter<OpenChangedEvent>();

  @ViewChild("search", { static: true }) search: ElementRef;
  @ViewChild("dropdown", { static: true }) dropdown: NgbDropdown;

  public filtered: Set<string> = new Set();
  public nextToggleState: SelectionType = this.SELECT;
  public searchForm = new FormGroup({ searchInput: new FormControl() });
  
  private _itemsSet: Set<string> = new Set();
  private _items: Array<string> = [];
  private _loading: boolean = false;
  private _selectionMode: NgbFilterableDropdownSelectionMode;
  private _selectedSet: Set<string> = new Set();
  private _valueChangesSubscription: Subscription;

  private _allowMultiSelect: boolean;

  get allowToggleSelectAll(): boolean {
    return (this._allowMultiSelect && this.searchInputValue.length === 0)
      && (this._selectionMode === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAll || this._selectionMode === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone)
      && !this.loading;
  }

  get allowToggleSelectMultiple(): boolean {
    return (this._allowMultiSelect && this.searchInputValue.length > 0 && this.filtered.size > 0) 
      && this._selectionMode === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
      && !this.loading;
  }

  get allowToggleSelectNone(): boolean {
    return (this._allowMultiSelect && this._selectedSet.size > 0) 
      && (this._selectionMode === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectNone || this._selectionMode === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone)
      && !this.loading;
  }

  get items(): Array<string> {
    return this._items;
  }

  get loading(): boolean {
    return this._loading;
  }

  get noItemsToDisplay(): boolean {
    return this.filtered.size === 0 && !this.allowCreateItem  && !this.loading;
  }

  get showCreateItem(): boolean {
    return this.searchInputValue.length > 0 && this.allowCreateItem && !this._itemsSet.has(this.searchInputValue) && !this.loading;
  }

  get searchInput(): AbstractControl {
    return this.searchForm.controls["searchInput"];
  }

  get searchInputValue(): string {
    return this.searchInput.value || "";
  }

  get selection(): Array<string> | string {
    let arr: Array<any> = Array.from(this._selectedSet);
    if (this._allowMultiSelect) {
      return arr;
    }

    if (arr) {
      return arr[0]
    }

    return "";
  }

  get typeToCreateItem(): boolean {
    return this.filtered.size === 0 && this.searchInputValue.length === 0 && this.allowCreateItem && !this.loading;
  }

  ngOnInit(): void {
    this._valueChangesSubscription = this.searchForm.get("searchInput").valueChanges
      .subscribe(value => {
        if (!value) {
          this.filtered = new Set(this.items);
          return;
        }

        const lowerCaseSearchInputValue = value.toLowerCase();
        const filteredValues = this.items.filter(item => item.toLowerCase().indexOf(lowerCaseSearchInputValue) !== -1);

        this.filtered = new Set(filteredValues);
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
    this.itemCreated.next({ created: item, items: this.items, selection: this.selection });
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
      this.itemCreated.next({ created: item, items: this.items, selection: this.selection });
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

      this.nextToggleState = this._selectedSet.size > 0 ? this.DESELECT : this.SELECT;
    } else {
      this._selectedSet = new Set([item]);
    }
    this.selectionChanged.next({ selection: this.selection });
  }

  onOpenChange(open: boolean): void {
    if (open) {
      this.focusSearchInput();
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
    } else if (value === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAll) {
      this._allowMultiSelect = true;
    } else if (value === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone) {
      this._allowMultiSelect = true;
    } else if (value === NgbFilterableDropdownSelectionMode.MultiSelectWithSelectNone) {
      this._allowMultiSelect = true;
    } else {
      this._allowMultiSelect = false;
    }

    this._selectionMode = value;
  }

  private setSelection(value: string | Array<string>): void {
    if (!value) {
      this._selectedSet = new Set([]);
      return;
    }

    if (typeof value === "string") {
      this._selectedSet = new Set([value]);
      return;
    }
    
    this._selectedSet = new Set(value);
  }

  private selectMultiple(): void {
    this.filtered.forEach(item => {
      if (!this._selectedSet.has(item)) {
        this._selectedSet.add(item);
      }
    });

    this.nextToggleState = this.DESELECT;
  }
}

export enum NgbFilterableDropdownSelectionMode {
  SingleSelect = 'Single Select',
  MultiSelectWithSelectAllSelectNone = 'Multi-Select with Select All and Select None',
  MultiSelectWithSelectAll = 'Multi-Select with Select All',
  MultiSelectWithSelectNone = 'Multi-Select with Select None',
  MultiSelect = 'Multi-Select'
}