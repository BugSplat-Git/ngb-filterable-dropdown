import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SelectionType } from './selection-type';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

export interface FilterableItem {
  value: string,
  selected: boolean,
}

@Component({
  selector: 'bugsplat-filterable-dropdown',
  templateUrl: './filterable-dropdown.component.html',
  styleUrls: ['./filterable-dropdown.component.scss']
})
export class FilterableDropdownComponent {

  public faCheck = faCheck;
  public readonly SELECT_ALL = SelectionType.All;
  public readonly SELECT_NONE = SelectionType.None;


  @Input() autoClose: boolean | "outside" | "inside" = "outside";
  @Input() items: Array<FilterableItem> = [];
  @Input() disabled: boolean = false;
  @Input() allowMultiSelect: boolean = true;

  @Output() onItemsSelected: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('search', { static: true }) search: ElementRef;
  @ViewChild('dropdown', { static: true }) dropdown: ElementRef;

  public get allowToggleSelectAll(): boolean {
    return (this.allowMultiSelect && this.searchInputValue.length === 0);
  }

  public get dropdownItems(): Array<string> {
    return this.items.map(item=> item.value);
  }

  public get noItemsToDisplay(): boolean {
    return this.filteredItems.length === 0;
  }

  nextToggleState: SelectionType = this.SELECT_ALL;

  searchForm = new FormGroup({
    searchInput: new FormControl()
  });

  constructor(private changeDetector: ChangeDetectorRef) { }

  get selectedItems(): Array<string> {
    const selectedItems =  this.items.filter(item => item.selected === true);
    return selectedItems.map(item => item.value);
  }

  onSelectAll(): void {
    this.items.forEach(item => item.selected = true);
    this.nextToggleState = this.SELECT_NONE;
    this.resetFilterInput();
    this.onItemsSelected.emit(this.selectedItems);
  }

  onSelectNone(): void {
    this.items.forEach(item => item.selected = false);
    this.nextToggleState = this.SELECT_ALL;
    this.resetFilterInput();
    this.onItemsSelected.emit(this.selectedItems);
  }

  onItemSelect(item: FilterableItem) {
    const itemIndex = this.items.findIndex(value => value.value === item.value);
    if (itemIndex !== -1) {
      this.items[itemIndex].selected = !this.items[itemIndex].selected;
      if (!this.allowMultiSelect) {
        this.items.forEach(value => {
          if (value.value != item.value) {
            value.selected = false;
          }
        });
      }
      this.onItemsSelected.emit(this.selectedItems);
    }
    this.resetFilterInput();
  }

  onOpenChange(open): void {
    if (open) {
      this.changeDetector.detectChanges();
      this.search.nativeElement.focus();
      this.onOpen.emit();
    }
  }

  onEnterKeyPressed(): void {
    if (this.allowMultiSelect) {
      this.filteredItems.forEach(item => {
        const itemIndex = this.items.indexOf(item)
        if (itemIndex != -1) {
          this.items[itemIndex].selected = true;
        }
      });
      this.onItemsSelected.emit(this.selectedItems);
    } else {
      if (this.filteredItems.length) {
        this.onItemSelect(this.filteredItems[0]);
      }
    }

    this.resetFilterInput();
  }

  private resetFilterInput(): void {
    this.searchInput.setValue("");
  }

  get filteredItems(): Array<FilterableItem> {
    if (!this.items) {
      return [];
    }

    const lowerCaseSearchInputValue = this.searchInputValue.toLowerCase();
    return this.items
      .filter(item => !!item)
      .filter(item => item.value.toLowerCase().indexOf(lowerCaseSearchInputValue) !== -1);
  }

  get searchInput(): AbstractControl {
    return this.searchForm.controls["searchInput"];
  }

  get searchInputValue(): string {
    return this.searchInput.value || "";
  }

  isSelected(item: FilterableItem): boolean {
    if (this.selectedItems && this.selectedItems.length) {
      const itemIndex = this.items.findIndex(values => values.value == item.value);
      return this.items[itemIndex].selected;
    } else {
      return false;
    }
  }
}