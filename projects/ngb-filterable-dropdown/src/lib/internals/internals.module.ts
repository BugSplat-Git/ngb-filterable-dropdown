import { NgModule } from '@angular/core';
import { AllComponent } from './icons/all.component';
import { CheckmarkComponent } from './icons/checkmark.component';
import { NoneComponent } from './icons/none.component';
import { PlusComponent } from './icons/plus.component';
import { MultiSelectPipe } from './multi-select-pipe/multi-select-pipe';

@NgModule({
  declarations: [
    MultiSelectPipe,
    AllComponent,
    CheckmarkComponent,
    NoneComponent,
    PlusComponent,
  ],
  imports: [],
  exports: [
    MultiSelectPipe,
    AllComponent,
    CheckmarkComponent,
    NoneComponent,
    PlusComponent,
  ],
})
export class InternalsModule {}
