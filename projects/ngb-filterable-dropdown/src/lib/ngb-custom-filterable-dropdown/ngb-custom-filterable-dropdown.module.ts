import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InternalsModule } from '../internals/internals.module';
import { NgbCustomFilterableDropdownComponent } from './ngb-custom-filterable-dropdown.component';

@NgModule({
  declarations: [NgbCustomFilterableDropdownComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbDropdownModule,
    NgbTooltipModule,
    InternalsModule,
  ],
  exports: [NgbCustomFilterableDropdownComponent],
})
export class NgbCustomFilterableDropdownModule {}
