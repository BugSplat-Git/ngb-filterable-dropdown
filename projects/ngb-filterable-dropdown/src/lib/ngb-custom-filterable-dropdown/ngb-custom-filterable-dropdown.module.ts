import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbCustomFilterableDropdownComponent } from "./ngb-custom-filterable-dropdown.component";

@NgModule({
  imports: [
    NgbCustomFilterableDropdownComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbDropdownModule,
    NgbTooltipModule,
  ],
  exports: [NgbCustomFilterableDropdownComponent],
})
export class NgbCustomFilterableDropdownModule {}
