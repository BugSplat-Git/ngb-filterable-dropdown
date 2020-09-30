import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SelectionType } from './selection-type';

@Component({
  selector: 'ngb-filterable-dropdown',
  templateUrl: './ngb-filterable-dropdown.component.html',
  styleUrls: ['./ngb-filterable-dropdown.component.scss']
})
export class NgbFilterableDropdownComponent implements OnInit, OnDestroy {

  public readonly SELECT = SelectionType.All;
  public readonly DESELECT = SelectionType.None;

  @Input() autoClose: boolean | "outside" | "inside" = "outside";
  @Input() set items(value: Array<string>) {
    this.filtered = new Set(value);
    this._items = value;
  }
  get items(): Array<string> {
    return this._items;
  }
  @Input() set selectedItems(value: string | Array<string>) {
    if (typeof value === "string") {
      this.selected = new Set([value])
    } else {
      this.selected = new Set(value);
    }
  } 
  @Input() disabled: boolean = false;
  @Input() allowMultiSelect: boolean = true;
  @Input() placeholder: string = 'No Items Selected';

  @Output() onItemsSelected: EventEmitter<Array<string> | string> = new EventEmitter<Array<string> | string>();
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('search', { static: true }) search: ElementRef;
  @ViewChild('dropdown', { static: true }) dropdown: NgbDropdown;

  public filtered: Set<string> = new Set();
  public nextToggleState: SelectionType = this.SELECT;
  public searchForm = new FormGroup({ searchInput: new FormControl() });
  public selected: Set<string> = new Set();
  
  private _items: Array<string> = [];
  private _valueChangesSubscription: Subscription;

  public get allowToggleSelectAll(): boolean {
    return (this.allowMultiSelect && this.searchInputValue.length === 0);
  }

  public get allowToggleSelectMultiple(): boolean {
    return (this.allowMultiSelect && this.searchInputValue.length > 0 && this.filtered.size > 0);
  }

  public get noItemsToDisplay(): boolean {
    return this.filtered.size === 0;
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

  onSelectAll(): void {
    this.nextToggleState = this.DESELECT;
    this.selected = new Set(this.items);
    this.onItemsSelected.emit(this.selectedItems);
  }

  onSelectNone(): void {
    this.nextToggleState = this.SELECT;
    this.selected = new Set([]);
    this.onItemsSelected.emit(this.selectedItems);
  }

  onSelectMultiple(): void {
    this.nextToggleState = this.DESELECT
    this.selectMultiple();
    this.onItemsSelected.emit(this.selectedItems);
  }

  onItemSelect(item: string): void {
    if (this.allowMultiSelect) {
      if (this.selected.has(item)){
        this.selected.delete(item);
      } else {
        this.selected.add(item);
      }
    } else {
      this.selected = new Set([item]);
    }
    this.onItemsSelected.emit(this.selectedItems);
  }

  onOpenChange(open: boolean): void {
    if (open) {
      setTimeout(() => this.search.nativeElement.focus());
      this.onOpen.emit();
    } else {
      this.resetFilterInput();
    }
  }

  onEnterKeyPressed(): void {
    if (this.allowMultiSelect) {
      this.selectMultiple();
    }
    
    if (!this.allowMultiSelect && this.filtered?.size) {
      this.selected = new Set([this.filtered.entries().next().value[0]]);
    } 

    if (this.autoClose) {
      this.dropdown.close();
    }

    this.onItemsSelected.emit(this.selectedItems);
  }

  private resetFilterInput(): void {
    this.searchInput.setValue("");
  }

  private selectMultiple(): void {
    this.filtered.forEach(item => {
      if (!this.selected.has(item)) {
        this.selected.add(item);
      }
    });
  }

  public isFiltered(value: string): boolean {
    return this.filtered.has(value);
  }

  public isSelected(value: string): boolean {
    return this.selected.has(value);
  }

  get searchInput(): AbstractControl {
    return this.searchForm.controls["searchInput"];
  }

  get searchInputValue(): string {
    return this.searchInput.value || "";
  }
}