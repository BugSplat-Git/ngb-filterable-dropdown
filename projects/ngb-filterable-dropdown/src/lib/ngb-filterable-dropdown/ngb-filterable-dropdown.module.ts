import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbCustomFilterableDropdownModule } from "../ngb-custom-filterable-dropdown/ngb-custom-filterable-dropdown.module";
import { NgbFilterableDropdownComponent } from "./ngb-filterable-dropdown.component";

@NgModule({
  imports: [
    NgbFilterableDropdownComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    NgbCustomFilterableDropdownModule,
  ],
  exports: [NgbFilterableDropdownComponent],
})
export class NgbFilterableDropdownModule {}
