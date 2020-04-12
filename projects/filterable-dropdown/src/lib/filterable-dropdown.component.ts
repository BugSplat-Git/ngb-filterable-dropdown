import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SelectionType } from './selection-type';

export interface FilterableItem {
  value: string,
  selected: boolean,
}

@Component({
  selector: 'bugsplat-filterable-dropdown',
  templateUrl: './filterable-dropdown.component.html',
  styleUrls: ['./filterable-dropdown.component.scss']
})
export class FilterableDropdownComponent implements OnInit {

  public readonly SELECT_ALL = SelectionType.All;
  public readonly SELECT_NONE = SelectionType.None;

  public selected = new Set();
  public filtered = new Set();

  @Input() autoClose: boolean | "outside" | "inside" = "outside";
  @Input() items: Array<string> = [];
  @Input() set selectedItems(selection: string | Array<string>) {
    if (typeof selection === "string") {
      this.selected = new Set([selection])
    } else {
      this.selected = new Set(selection);
    }
  } 
  @Input() disabled: boolean = false;
  @Input() allowMultiSelect: boolean = true;
  @Input() placeholder: string;

  @Output() onItemsSelected: EventEmitter<Array<string> | string> = new EventEmitter<Array<string> | string>();
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('search', { static: true }) search: ElementRef;
  @ViewChild('dropdown', { static: true }) dropdown: ElementRef;

  public get allowToggleSelectAll(): boolean {
    return (this.allowMultiSelect && this.searchInputValue.length === 0);
  }

  public get noItemsToDisplay(): boolean {
    return this.filtered.size === 0;
  }

  nextToggleState: SelectionType = this.SELECT_ALL;

  searchForm = new FormGroup({
    searchInput: new FormControl()
  });

  constructor(private changeDetector: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.filtered = new Set(this.items);
    this.searchForm.get("searchInput").valueChanges.subscribe(value => {
      if (!value) {
        this.filtered = new Set(this.items);
        return;
      }
  
      const lowerCaseSearchInputValue = value.toLowerCase();
      const filteredValues = this.items.filter(item => item.toLowerCase().indexOf(lowerCaseSearchInputValue) !== -1);
  
      this.filtered = new Set(filteredValues);
    });
  }

  get selectedItems(): Array<string> | string {
    let arr: Array<any> = Array.from(this.selected);
    if (this.allowMultiSelect) {
      return arr;
    } else {
      if (arr) {
        return arr[0]
      } else {
        return "";
      }
    }
  }

  onSelectAll(): void {
    this.nextToggleState = this.SELECT_NONE;
    this.selected = new Set(this.items);
    this.resetFilterInput();
    this.onItemsSelected.emit(this.selectedItems);
  }

  onSelectNone(): void {
    this.nextToggleState = this.SELECT_ALL;
    this.selected = new Set([]);
    this.resetFilterInput();
    this.onItemsSelected.emit(this.selectedItems);
  }

  onItemSelect(item: string) {
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
      this.filtered.forEach(item => {
        if (!this.selected.has(item)) {
          this.selected.add(item);
        }
      });
    } else {
      if (this.filtered && this.filtered.size) {
        this.selected = new Set([this.filtered[0]]);
      } 
    }

    this.onItemsSelected.emit(this.selectedItems);
    this.resetFilterInput();
  }

  private resetFilterInput(): void {
    this.searchInput.setValue("");
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