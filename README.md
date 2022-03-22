# [![BugSplat](https://s3.amazonaws.com/bugsplat-public/npm/header.png)](https://www.bugsplat.com)

# ngb-filterable-dropdown

Powerful dropdown control for complicated filtering.

## Installation

`npm i -s @bugsplat/ngb-filterable-dropdown`

## Usage

Add NgbFilterableDropdownModule into your AppModules NgModule imports:

```ts
import { NgbFilterableDropdownModule } from '@bugsplat/ngb-filterable-dropdown'

@NgModule({
  ...
  imports: [
    NgbFilterableDropdownModule
  ],
  ...
})
```

The component takes two main inputs, a list of strings that are selectable and a sub-list of strings that are already selected.

```ts
items: Array<string> = ['Beetle', 'Ant', 'Moth', 'Fire Ant', 'Dung Beetle', 'Grass Ant'];
selection: Array<string> = ['Moth'];
```

You can specify whether or not to allow new items to be created. By default, the component does not allow new items to be created.

```ts
allowCreateItem: boolean = false;
```

You can also specify whether or not to allow multiple items to be selected. By default, the component allows one item to be selected.

```ts
selectionMode: NgbFilterableDropdownSelectionMode =
  NgbFilterableDropdownSelectionMode.SingleSelect;
```

Additional inputs are provided for further dropdown customization. The open/close behavior of the dialog can be changed by setting autoClose to true or false; alternatively you can specify whether to close on an outside or inside click. Additionally, dropdowns can be disabled at any time by setting disabled to true. You can also display a loading placeholder by setting loading to true. If you'd like to specify the placeholder in the search input you can set the value of searchInputPlaceholder to a string of your choosing.

```ts
autoClose: boolean | 'inside' | 'outside' = false;
disabled: boolean = false;
loading: boolean = false;
placeholder: string = 'No Items Selected';
searchInputPlaceholder: string = 'Search';
```

The component provides the selected data back to the parent through the selectionChanged event.

```ts
onSelectionChanged(event: SelectionChangedEvent) {
  const selection = event.selection;
}
```

When an item is created the component outputs an event with the properties created, items, and selection.

```ts
onItemCreated(event: ItemCreatedEvent) {
  const created = event.created;
  const selection = event.selection;
  const items = event.items;
}
```

The component also provides an event when the dropdown is opened or closed through the openChanged event.

```ts
onOpenChanged(event: OpenChangedEvent) {
  const open = event.open;
}
```

Add ngb-filterable-dropdown to your component's template:

```html
<ngb-filterable-dropdown
  [allowCreateItem]="allowCreateItem"
  [autoClose]="autoClose"
  [items]="items"
  [disabled]="disabled"
  [placeholder]="placeholder"
  [searchInputPlaceholder]="searchInputPlaceholder"
  [selection]="selection"
  [selectionMode]="selectionMode"
  (itemCreated)="onItemCreated($event)"
  (openChanged)="onOpenChanged($event)"
  (selectionChanged)="onSelectionChanged($event)"
>
</ngb-filterable-dropdown>
```

## Compatibility

@bugsplat/ngb-filterable-dropdown is compatible with Angular`>=10.0.0`.

## Credits

@bugsplat/ngb-filterable-dropdown is an open source tool from [BugSplat](https://www.bugsplat.com/)! BugSplat is a crash reporting tool used by developers to find when their software crashes while in use, and to collect data valuable to fixing those crashes. If you're interested in crash reporting, check out our [Angular](https://www.bugsplat.com/docs/sdk/angular/) integration.

With :heart:  
BugSplat
