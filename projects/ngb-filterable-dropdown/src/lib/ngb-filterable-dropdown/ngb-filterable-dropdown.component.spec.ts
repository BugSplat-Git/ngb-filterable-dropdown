import { CommonModule } from "@angular/common";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MultiSelectPipe } from "../internals/multi-select-pipe/multi-select-pipe";
import { NgbFilterableDropdownSelectionMode } from "../ngb-filterable-drop-down-selection-mode";
import { NgbFilterableDropdownComponent } from "./ngb-filterable-dropdown.component";

describe("NgbFilterableDropdownComponent", () => {
  let component: NgbFilterableDropdownComponent;
  let fixture: ComponentFixture<NgbFilterableDropdownComponent>;

  let filterItem: string;
  let items: Array<string>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NgbFilterableDropdownComponent,
        MultiSelectPipe,
        NgbModule,
        ReactiveFormsModule,
        CommonModule,
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(NgbFilterableDropdownComponent);
    component = fixture.componentInstance;
    filterItem = "foo";
    items = [filterItem, "bar", "baz"];
    fixture.componentRef.setInput("items", items);
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be disabled if disabled input is true", async () => {
    fixture.componentRef.setInput("disabled", true);
    await fixture.whenStable();
    expect(
      fixture.nativeElement.querySelector("button[disabled]")
    ).toBeTruthy();
  });

  it("should display placeholder as currentItem if no items are selected", async () => {
    fixture.componentRef.setInput("items", ["it's a living"]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector("#toggle").innerText).toEqual(
      component.placeholder()
    );
  });

  it("should display currentItem if one item is selected", async () => {
    const currentItem = "MyDatabaseName";
    fixture.componentRef.setInput("items", [currentItem]);
    fixture.componentRef.setInput("selection", [currentItem]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector("#toggle").innerText).toEqual(
      currentItem
    );
  });

  it("should display Multiple as currentItem if more than one item is selected", async () => {
    fixture.componentRef.setInput(
      "selectionMode",
      NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
    );
    fixture.componentRef.setInput("selection", ["one", "two", "three"]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector("#toggle").innerText).toEqual(
      "Multiple"
    );
  });
});
