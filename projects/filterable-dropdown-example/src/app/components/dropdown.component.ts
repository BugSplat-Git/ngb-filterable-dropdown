import { Component, Input } from '@angular/core';
import { FilterableItem } from 'projects/filterable-dropdown/src/public-api';

@Component({
  selector: 'dropdown-component',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
    @Input() allowMultiSelect: boolean;
    @Input() autoClose: "outside" | "inside" | boolean;
    @Input() sectionTitle: string;
    
    public bugs: Array<FilterableItem> = [{value: "Beetle", selected: false}, {value: "Ant", selected: false}, {value: "Moth", selected: true}, 
    {value: "Fire Ant", selected: false}, {value: "Dung Beetle", selected: false}, {value: "Grass Ant", selected: false}];

    public selected: Array<string> = ["Moth"]
  
    public onDropdownOpen() {
      console.log("Dropdown Opened!");
    }
  
    public onItemsSelected(items: Array<string>) {
      this.selected = items;
    }
}