import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ngb-filterable-dropdown-example";
  
  readonly bugs: Array<string> = ["Beetle", "Ant", "Moth", "Fire Ant", "Dung Beetle", "Grass Ant"] 

  allowMultiSelect: boolean = false;
  autoClose: boolean | "inside" | "outside" = false;
  disabled: boolean = false;
  selected: Array<string> = ["Moth"];

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

  onDropdownOpen(): void {
    console.log("Dropdown opened!");
  }

  onItemsSelected(items: string): void {
    console.log(items)
  }
}

interface CheckboxClickEvent {
  target: { checked: boolean }
}