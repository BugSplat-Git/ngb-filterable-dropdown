import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AllComponent } from "./icons/all.component";
import { CheckmarkComponent } from "./icons/checkmark.component";
import { NoneComponent } from "./icons/none.component";
import { PlusComponent } from "./icons/plus.component";
import { MultiSelectPipe } from "./multi-select-pipe/multi-select-pipe";
import { NgbFilterableDropdownComponent } from "./ngb-filterable-dropdown.component";

@NgModule({
  declarations: [
    NgbFilterableDropdownComponent,
    MultiSelectPipe,
    AllComponent,
    CheckmarkComponent,
    NoneComponent,
    PlusComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule
  ],
  exports: [NgbFilterableDropdownComponent]
})
export class NgbFilterableDropdownModule { }
