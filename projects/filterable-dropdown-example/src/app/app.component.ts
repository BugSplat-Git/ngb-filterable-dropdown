import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filterable-dropdown-example';
  
  readonly bugs: Array<string> = ['Beetle', 'Ant', 'Moth', 'Fire Ant', 'Dung Beetle', 'Grass Ant'] 

  allowMultiSelect: boolean = true;
  autoClose: boolean = true;
  selected: Array<string> = ['Moth'];

  constructor() {  }

  allowMultiSelectClick(event: CheckboxClickEvent): void {
    this.allowMultiSelect = event.target.checked;
    this.selected = [];
  }

  autoCloseClick(event: CheckboxClickEvent): void {
    this.autoClose = event.target.checked;
  }

  onDropdownOpen(): void {
    console.log('Dropdown opened!');
  }

  onItemsSelected(items: string): void {
    console.log(items)
  }
}

interface CheckboxClickEvent {
  target: { checked: boolean }
}