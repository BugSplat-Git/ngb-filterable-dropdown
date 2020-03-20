import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterableDropdownComponent } from './filterable-dropdown.component';
import { MultiSelectPipe } from './multi-select-pipe/multi-select-pipe';




@NgModule({
  declarations: [FilterableDropdownComponent, MultiSelectPipe],
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [FilterableDropdownComponent]
})
export class FilterableDropdownModule { }
