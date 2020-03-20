import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FilterableDropdownModule} from 'filterable-dropdown';
import { DropdownComponent } from './components/dropdown.component';


@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    FilterableDropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
