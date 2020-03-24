import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SelectionType } from './selection-type';
export interface FilterableItem {
    value: string;
    selected: boolean;
}
export declare class FilterableDropdownComponent implements OnInit {
    private changeDetector;
    faCheck: import("@fortawesome/fontawesome-common-types").IconDefinition;
    readonly SELECT_ALL = SelectionType.All;
    readonly SELECT_NONE = SelectionType.None;
    selectedValues: Set<unknown>;
    selectedItem: string;
    filtered: Set<unknown>;
    autoClose: boolean | "outside" | "inside";
    items: Array<string>;
    selected: string | Array<string>;
    disabled: boolean;
    allowMultiSelect: boolean;
    onItemsSelected: EventEmitter<Array<string> | string>;
    onOpen: EventEmitter<void>;
    search: ElementRef;
    dropdown: ElementRef;
    readonly allowToggleSelectAll: boolean;
    readonly noItemsToDisplay: boolean;
    nextToggleState: SelectionType;
    searchForm: FormGroup;
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    readonly selectedItems: Array<string> | string;
    onSelectAll(): void;
    onSelectNone(): void;
    onItemSelect(item: string): void;
    onOpenChange(open: any): void;
    onEnterKeyPressed(): void;
    private resetFilterInput;
    isFiltered(value: string): boolean;
    isSelected(value: string): boolean;
    readonly searchInput: AbstractControl;
    readonly searchInputValue: string;
}
