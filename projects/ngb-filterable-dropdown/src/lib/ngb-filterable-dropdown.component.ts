import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { ItemCreatedEvent, ItemsSelectedEvent } from "./events";
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
  @Input() allowCreateItem: boolean = false;
  @Input() allowMultiSelect: boolean = true;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = "No Items Selected";
  @Input() set loading(value: boolean) {
    if (value) {
      this.searchInput.disable();
    } else {
      this.searchInput.enable();
      this.focusSearchInput();
    }

    this._loading = value;
  }
  get loading(): boolean {
    return this._loading;
  }
  
  @Input() set items(value: Array<string>) {
    this.filtered = new Set(value);
    this._itemsSet = new Set(value);
    this._items = value;
  }
  get items(): Array<string> {
    return this._items;
  }
  @Input() set selectedItems(value: string | Array<string>) {
    if (!value) {
      this.selected = new Set([]);
      return;
    }

    if (typeof value === "string") {
      this.selected = new Set([value]);
      return;
    }
    
    this.selected = new Set(value);
  }
  get selectedItems(): Array<string> | string {
    let arr: Array<any> = Array.from(this.selected);
    if (this.allowMultiSelect) {
      return arr;
    }

    if (arr) {
      return arr[0]
    }

    return "";
  }

  @Output() onItemCreated: EventEmitter<ItemCreatedEvent> = new EventEmitter<ItemCreatedEvent>();
  @Output() onItemsSelected: EventEmitter<ItemsSelectedEvent> = new EventEmitter<ItemsSelectedEvent>();
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild("search", { static: true }) search: ElementRef;
  @ViewChild("dropdown", { static: true }) dropdown: NgbDropdown;

  public filtered: Set<string> = new Set();
  public nextToggleState: SelectionType = this.SELECT;
  public searchForm = new FormGroup({ searchInput: new FormControl() });
  public selected: Set<string> = new Set();

  private _itemsSet: Set<string> = new Set();
  private _items: Array<string> = [];
  private _loading: boolean = false;
  private _valueChangesSubscription: Subscription;

  get allowToggleSelectAll(): boolean {
    return (this.allowMultiSelect && this.searchInputValue.length === 0) && !this.loading;
  }

  get allowToggleSelectMultiple(): boolean {
    return (this.allowMultiSelect && this.searchInputValue.length > 0 && this.filtered.size > 0) && !this.loading;
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
    return this.selected.has(value);
  }

  onCreateItem(): void {
    const item = this.searchInputValue;
    this.createItem(item);
    this.onItemCreated.next({ created: item, items: this.items, selectedItems: this.selectedItems });
    this.resetFilterInput();
  }

  onEnterKeyPressed(): void {
    if (this.allowMultiSelect && this.filtered?.size) {
      this.selectMultiple();
    }

    if (!this.allowMultiSelect && this.filtered?.size) {
      this.selected = new Set([this.filtered.entries().next().value[0]]);
    }

    if (this.allowCreateItem && !this.filtered?.size) {
      const item = this.searchInputValue;
      this.createItem(item);
      this.onItemCreated.next({ created: item, items: this.items, selectedItems: this.selectedItems });
      this.resetFilterInput();
    }

    if (!this.allowCreateItem) {
      this.onItemsSelected.next({ selectedItems: this.selectedItems });
    }

    if (this.autoClose) {
      this.dropdown.close();
    }
  }

  onItemSelect(item: string): void {
    if (this.allowMultiSelect) {
      if (this.selected.has(item)) {
        this.selected.delete(item);
      } else {
        this.selected.add(item);
      }
    } else {
      this.selected = new Set([item]);
    }
    this.onItemsSelected.next({ selectedItems: this.selectedItems });
  }

  onOpenChange(open: boolean): void {
    if (open) {
      this.focusSearchInput();
      this.onOpen.next();
    } else {
      this.resetFilterInput();
    }
  }

  onSelectAll(): void {
    this.nextToggleState = this.DESELECT;
    this.selected = new Set(this.items);
    this.onItemsSelected.next({ selectedItems: this.selectedItems });
  }

  onSelectMultiple(): void {
    this.nextToggleState = this.DESELECT
    this.selectMultiple();
    this.onItemsSelected.next({ selectedItems: this.selectedItems });
  }

  onSelectNone(): void {
    this.nextToggleState = this.SELECT;
    this.selected = new Set([]);
    this.onItemsSelected.next({ selectedItems: this.selectedItems });
  }

  private resetFilterInput(): void {
    this.searchInput.setValue("");
  }

  private createItem(item: string): void {
    if (this.allowMultiSelect) {
      this.selected.add(item);
    } else {
      this.selected = new Set([item]);
    }

    this._items = [...this._items, item];
  }

  private focusSearchInput(): void {
    setTimeout(() => this.search.nativeElement.focus());
  }

  private selectMultiple(): void {
    this.filtered.forEach(item => {
      if (!this.selected.has(item)) {
        this.selected.add(item);
      }
    });
  }
}
