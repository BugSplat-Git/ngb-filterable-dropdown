import { TestBed } from "@angular/core/testing";
import {
  NgbCustomFilterableDropdownModule,
  NgbFilterableDropdownModule,
} from "projects/ngb-filterable-dropdown/src";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NgbCustomFilterableDropdownModule,
        NgbFilterableDropdownModule,
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have as title 'ngb-filterable-dropdown-examples'", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("ngb-filterable-dropdown-examples");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h2").textContent).toContain(
      "ngb-filterable-dropdown-examples"
    );
  });
});
