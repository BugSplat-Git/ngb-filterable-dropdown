import { Component } from "@angular/core";
import { ItemCreatedEvent, OpenChangedEvent, SelectionChangedEvent } from 'projects/ngb-filterable-dropdown/src';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ngb-filterable-dropdown-example";
  
  items: Array<string> = ["Beetle", "Ant", "Moth", "Fire Ant", "Dung Beetle", "Grass Ant"] 

  allowCreateItem: boolean = false;
  allowMultiSelect: boolean = false;
  autoClose: boolean | "inside" | "outside" = false;
  disabled: boolean = false;
  selectedItems: string | Array<string> = "Moth";

  allowCreateItemClick(event: CheckboxClickEvent): void {
    this.allowCreateItem = event.target.checked;
  }

  allowMultiSelectClick(event: CheckboxClickEvent): void {
    this.allowMultiSelect = event.target.checked;
    this.selectedItems = [];
  }

  autoCloseClick(event: CheckboxClickEvent): void {
    this.autoClose = event.target.checked ? "inside" : false;
  }

  disabledClick(event: CheckboxClickEvent): void {
    this.disabled = event.target.checked;
  }
 
  onItemCreated(event: ItemCreatedEvent): void {
    this.items = event.items;
    this.selectedItems = event.selection;
    console.log(event);
  }
   
  onOpenChanged(event: OpenChangedEvent): void {
    console.log(event);
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    this.selectedItems = event.selection;
    console.log(event)
  }
}

interface CheckboxClickEvent {
  target: { checked: boolean }
}