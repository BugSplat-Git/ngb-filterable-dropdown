import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbFilterableDropdownComponent } from "./ngb-filterable-dropdown.component";
import { NgbFilterableDropdownSelectionMode } from "../ngb-filterable-drop-down-selection-mode";
import { InternalsModule } from "../internals/internals.module";
import { NgbCustomFilterableDropdownModule } from "../ngb-custom-filterable-dropdown/ngb-custom-filterable-dropdown.module";

describe("NgbFilterableDropdownComponent", () => {
  let component: NgbFilterableDropdownComponent;
  let fixture: ComponentFixture<NgbFilterableDropdownComponent>;

  let filterItem: string;
  let items: Array<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        ReactiveFormsModule,
        CommonModule,
        InternalsModule,
        NgbCustomFilterableDropdownModule,
      ],
      declarations: [NgbFilterableDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgbFilterableDropdownComponent);
    component = fixture.componentInstance;
    filterItem = "foo";
    items = [filterItem, "bar", "baz"];
    component.items = items;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be disabled if disabled input is true", () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector("button[disabled]")
    ).toBeTruthy();
  });

  it("should display placeholder as currentItem if no items are selected", () => {
    component.items = ["it's a living"];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#toggle").innerText).toEqual(
      component.placeholder
    );
  });

  it("should display currentItem if one item is selected", () => {
    const currentItem = "MyDatabaseName";
    component.items = [currentItem];
    component.selection = [currentItem];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#toggle").innerText).toEqual(
      currentItem
    );
  });

  it("should display Multiple as currentItem if more than one item is selected", () => {
    component.selectionMode =
      NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone;
    component.selection = ["one", "two", "three"];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#toggle").innerText).toEqual(
      "Multiple"
    );
  });
});
