import { Component } from "@angular/core";
import { ItemCreatedEvent, OpenChangedEvent, SelectionChangedEvent } from 'projects/ngb-filterable-dropdown/src';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ngb-filterable-dropdown-example";
  
  bugs: Array<string> = ["Beetle", "Ant", "Moth", "Fire Ant", "Dung Beetle", "Grass Ant"] 

  allowCreateItem: boolean = false;
  allowMultiSelect: boolean = false;
  autoClose: boolean | "inside" | "outside" = false;
  disabled: boolean = false;
  selected: string | Array<string> = "Moth";

  allowCreateItemClick(event: CheckboxClickEvent): void {
    this.allowCreateItem = event.target.checked;
  }

  allowMultiSelectClick(event: CheckboxClickEvent): void {
    this.allowMultiSelect = event.target.checked;
    this.selected = [];
  }

  autoCloseClick(event: CheckboxClickEvent): void {
    this.autoClose = event.target.checked ? "inside" : false;
  }

  disabledClick(event: CheckboxClickEvent): void {
    this.disabled = event.target.checked;
  }
 
  onItemCreated(event: ItemCreatedEvent): void {
    this.bugs = event.items;
    this.selected = event.selectedItems;
    console.log(event.created);
  }
   
  onOpenChanged(event: OpenChangedEvent): void {
    console.log("Dropdown open:", event.open);
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    this.selected = event.selectedItems;
    console.log(event.selectedItems)
  }
}

interface CheckboxClickEvent {
  target: { checked: boolean }
}