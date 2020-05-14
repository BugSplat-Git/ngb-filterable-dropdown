import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbFilterableDropdownComponent } from './ngb-filterable-dropdown.component';
import { MultiSelectPipe } from './multi-select-pipe/multi-select-pipe';

@NgModule({
  declarations: [NgbFilterableDropdownComponent, MultiSelectPipe],
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule
  ],
  exports: [NgbFilterableDropdownComponent]
})
export class NgbFilterableDropdownModule { }
