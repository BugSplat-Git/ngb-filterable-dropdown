import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InternalsModule } from '../internals/internals.module';
import { NgbFilterableDropdownComponent } from './ngb-filterable-dropdown.component';
import { NgbCustomFilterableDropdownModule } from '../ngb-custom-filterable-dropdown/ngb-custom-filterable-dropdown.module';

@NgModule({
  declarations: [NgbFilterableDropdownComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    InternalsModule,
    NgbCustomFilterableDropdownModule,
  ],
  exports: [NgbFilterableDropdownComponent],
})
export class NgbFilterableDropdownModule {}
