# animated-counter

Powerful dropdown control for complicated filtering.

## Installation

`npm i --s @bugsplat/ng-filterable-dropdown`

## Usage
Import FilterableDropdownModule into NgModule imports:
```js
import { FilterableDropdownModule } from '@bugsplat/ng-filterable-dropdown'

@NgModule({
  ...
  imports: [
    FilterableDropdownModule
  ],
  ...
```
The component takes two main inputs, a list of strings that are selectable and a sub-list of strings that are already selected. 
```js
  
  readonly bugs: Array<string> = ['Beetle', 'Ant', 'Moth', 'Fire Ant', 'Dung Beetle', 'Grass Ant'] 
  selected: Array<string> = ['Moth'];
  ...
```
You can specify whether or not to allow multiple items to be selected. By default, the component allows one item to be selected.
```js
  allowMultiSelect: boolean = false;
  ...
```
Additional inputs are provided for further dropdown customization. Auto close can be set to true or false; alternatively you can specify whether to close on an outside or inside click. Dropdowns may also be disabled at any time.
```js
  autoClose: boolean | 'inside' | 'outside' = false;
  disabled: boolean = false;
```
Add the counter to your component's template:

```html
<ng-filterable-dropdown [params]="params"></ng-filterable-dropdown>
```	```

## Compatability
Animated counter is built using Angular`>=6.0.0`.


## Credits

ng-filterable-dropdown is an open source tool from [BugSplat](https://www.bugsplat.com/)! BugSplat is a crash reporting tool used by developers to find when their software crashes while in use, and to collect data valuable to fixing those crashes. If you're interested in crash reporting, check out our [Angular](https://www.bugsplat.com/docs/sdk/angular/) integration. 

With :heart:  
BugSplat

## License

MIT

