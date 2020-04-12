import { Component, Input } from '@angular/core';

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
  
    public onItemsSelected(items: string) {
      console.log(items)
    }
}