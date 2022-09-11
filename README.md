[![bugsplat-github-banner-basic-outline](https://user-images.githubusercontent.com/20464226/149019306-3186103c-5315-4dad-a499-4fd1df408475.png)](https://bugsplat.com)
<br/>
# <div align="center">BugSplat</div> 
### **<div align="center">Crash and error reporting built for busy developers.</div>**
<div align="center">
    <a href="https://twitter.com/BugSplatCo">
        <img alt="Follow @bugsplatco on Twitter" src="https://img.shields.io/twitter/follow/bugsplatco?label=Follow%20BugSplat&style=social">
    </a>
    <a href="https://discord.gg/K4KjjRV5ve">
        <img alt="Join BugSplat on Discord" src="https://img.shields.io/discord/664965194799251487?label=Join%20Discord&logo=Discord&style=social">
    </a>
</div>

## 👋 Introduction

BugSplat's [@bugsplat/ngb-filterable-dropdown](https://www.npmjs.com/package/@bugsplat/ngb-filterable-dropdown) package provides a powerful dropdown control for complicated filtering. Take a peek our [example](https://bugsplat-git.github.io/ngb-filterable-dropdown-example/) that demonstrates how to filter and select various items in a collection.

## 🏗 Installation

Install `@bugsplat/ngb-filterable-dropdown` and the associated peer dependencies [@ng-bootstrap/ng-bootstrap](https://ng-bootstrap.github.io/#/home) and [Bootstrap](https://getbootstrap.com/):

`npm i @bugsplat/ngb-filterable-dropdown @ng-boostrap/ng-bootstrap bootstrap`

## 🏃 Usage

Add `NgbFilterableDropdownModule` to your `NgModule` imports for each module where you plan to use the filterable dropdown:

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

Add `ngb-filterable-dropdown` to your component's template:

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

## 🧩 API

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

The open/close behavior of the dialog can be changed by setting `autoClose` to `true` or `false`. Alternatively you can specify whether to close on an `outside` or `inside` click. 

```ts
autoClose: boolean | 'inside' | 'outside' = false;
```

Dropdowns can be disabled at any time by setting `disabled` to `true`.

```ts
disabled: boolean = false;
```

You can also display a loading placeholder by setting `loading` to `true`.

```ts
loading: boolean = false;
```

If you'd like to specify the placeholder in the search input you can set the value of searchInputPlaceholder to a string of your choosing.

```ts
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
## 🐛 About

[@bugsplat/ngb-filterable-dropdown](https://github.com/BugSplat-git/ngb-filterable-dropdown) is an open source library developed by [BugSplat](https://www.bugsplat.com/)! BugSplat is a crash and error reporting tool used by developers to find, fix, and track errors in their applications.

If you're interested in error reporting, check out our [Angular](https://www.bugsplat.com/docs/sdk/angular/) integration.

With :heart:  
BugSplat
