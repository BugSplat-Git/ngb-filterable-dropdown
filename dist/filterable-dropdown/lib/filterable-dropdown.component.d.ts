import { EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SelectionType } from './selection-type';
export interface FilterableItem {
    value: string;
    selected: boolean;
}
export declare class FilterableDropdownComponent {
    private changeDetector;
    faCheck: import("@fortawesome/fontawesome-common-types").IconDefinition;
    readonly SELECT_ALL = SelectionType.All;
    readonly SELECT_NONE = SelectionType.None;
    autoClose: boolean | "outside" | "inside";
    items: Array<FilterableItem>;
    disabled: boolean;
    allowMultiSelect: boolean;
    onItemsSelected: EventEmitter<Array<string>>;
    onOpen: EventEmitter<void>;
    search: ElementRef;
    dropdown: ElementRef;
    readonly allowToggleSelectAll: boolean;
    readonly dropdownItems: Array<string>;
    readonly noItemsToDisplay: boolean;
    nextToggleState: SelectionType;
    searchForm: FormGroup;
    constructor(changeDetector: ChangeDetectorRef);
    readonly selectedItems: Array<string>;
    onSelectAll(): void;
    onSelectNone(): void;
    onItemSelect(item: FilterableItem): void;
    onOpenChange(open: any): void;
    onEnterKeyPressed(): void;
    private resetFilterInput;
    readonly filteredItems: Array<FilterableItem>;
    readonly searchInput: AbstractControl;
    readonly searchInputValue: string;
    isSelected(item: FilterableItem): boolean;
}
