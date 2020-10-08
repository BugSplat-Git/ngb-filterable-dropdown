import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockFilterableDropdownComponent
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have as title 'ngb-filterable-dropdown-example'", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("ngb-filterable-dropdown-example");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h2").textContent).toContain("ngb-filterable-dropdown-example");
  });
});

@Component({
  selector: "ngb-filterable-dropdown",
  template: ""
})
class MockFilterableDropdownComponent {
  @Input() allowCreateItem: any;
  @Input() allowMultiSelect: any;
  @Input() autoClose: any;
  @Input() items: any;
  @Input() selection: any;
  @Input() disabled: any;
  @Input() placeholder: any;
  @Output() itemCreated = new EventEmitter<any>();
  @Output() selectionChanged = new EventEmitter<any>();
  @Output() openChanged = new EventEmitter<any>();
}