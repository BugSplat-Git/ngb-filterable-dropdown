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
    @Input() disabled: boolean;
    
    public bugs: Array<string> = ["Beetle", "Ant", "Moth", "Fire Ant", "Dung Beetle", "Grass Ant"]
    
    public selected: Array<string> = ["Moth"]
  
    public onDropdownOpen() {
      console.log("Dropdown Opened!");
    }
  
    public onItemsSelected(items: Array<string>) {
      this.selected = items;
    }
}