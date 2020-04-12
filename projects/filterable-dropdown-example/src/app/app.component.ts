import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filterable-dropdown-example';
  readonly multiSelectTitle = "Multi Select";
  readonly singleSelectTitle = "Single Select - Auto Close";
}
