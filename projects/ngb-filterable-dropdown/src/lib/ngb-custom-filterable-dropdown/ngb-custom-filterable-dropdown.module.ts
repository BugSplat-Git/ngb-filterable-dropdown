import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InternalsModule } from '../internals/internals.module';
import { NgbCustomFilterableDropdownComponent } from './ngb-custom-filterable-dropdown.component';

@NgModule({
  declarations: [NgbCustomFilterableDropdownComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    InternalsModule,
  ],
  exports: [NgbCustomFilterableDropdownComponent],
})
export class NgbCustomFilterableDropdownModule {}
