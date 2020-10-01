import { CommonModule } from "@angular/common";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { take, tap } from "rxjs/operators";
import { MultiSelectPipe } from "./multi-select-pipe/multi-select-pipe";
import { NgbFilterableDropdownComponent } from "./ngb-filterable-dropdown.component";

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
        CommonModule
      ],
      declarations: [
        NgbFilterableDropdownComponent,
        MultiSelectPipe
      ]
    })
      .compileComponents();

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

  it("should populate filtered with correct list of filtered items", () => {
    component.searchInput.setValue("oo");
    expect(component.filtered.has(filterItem)).toEqual(true);
    expect(component.filtered.has("baz")).toEqual(false);
  });

  it("should display list of items", () => {
    fixture.detectChanges();
    items.forEach(item => expect(fixture.nativeElement.textContent).toContain(item));
  });

  it("should be disabled if disabled input is true", () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("button[disabled]")).toBeTruthy();
  });

  it("should display placeholder as currentItem if no items are selected", () => {
    component.items = ["it's a living"];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#toggle").innerText).toEqual(component.placeholder);
  });

  it("should display currentItem if one item is selected", () => {
    const currentItem = "MyDatabaseName";
    component.items = [currentItem];
    component.onItemSelect(currentItem);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#toggle").innerText).toEqual(currentItem);
  });

  it("should display Multiple as currentItem if more than one item is selected", fakeAsync(() => {
    component.onItemSelect(filterItem);
    component.onItemSelect("bar");
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#toggle").innerText).toEqual("Multiple");
  }));

  describe("isFiltered", () => {
    beforeEach(() => {
      component.searchInput.setValue(filterItem);
    });

    it("should should return true if item is selected", () => {
      expect(component.isFiltered(filterItem)).toEqual(true)
    });

    it("should set selected item when onItemSelect is called", () => {
      expect(component.isFiltered("baz")).toEqual(false);
    });
  });

  describe("isSelected", () => {
    beforeEach(() => {
      component.onItemSelect(filterItem);
    });

    it("should should return true if item is selected", () => {
      expect(component.isSelected(filterItem)).toEqual(true)
    });

    it("should set selected item when onItemSelect is called", () => {
      expect(component.isSelected("baz")).toEqual(false);
    });
  });

  describe("onCreateItem", () => {
    describe("when allowMultiSelect is false", () => {

      beforeEach(() => component.allowMultiSelect = false);

      it("should select created item", () => {
        const item = "🎃";
        component.searchInput.setValue(item);

        component.onCreateItem();

        expect(component.selectedItems).toEqual(item);
      });

      it("should emit created item, selectedItems and items", async () => {
        const resultPromise = component.onItemCreated.pipe(take(1)).toPromise();
        const item = "🎃";
        component.searchInput.setValue(item);

        component.onCreateItem();
        const result = await resultPromise;

        expect(result).toEqual(jasmine.objectContaining({
          created: item,
          selectedItems: item,
          items: [...items, item]
        }));
      });
    });

    describe("when allowMultiSelect is true", () => {

      beforeEach(() => component.allowMultiSelect = true);

      it("should add created item to selection", () => {
        const item = "🎃";
        component.searchInput.setValue(item);
        component.selectedItems = items;
        component.filtered = new Set(items);

        component.onCreateItem();

        expect(component.selectedItems).toEqual([...items, item])
      });

      it("should emit created item, selectedItems and items", async () => {
        const resultPromise = component.onItemCreated.pipe(take(1)).toPromise();
        const item = "🎃";
        component.searchInput.setValue(item);
        component.selectedItems = items;
        component.filtered = new Set(items);

        component.onCreateItem();
        const result = await resultPromise;

        expect(result).toEqual(jasmine.objectContaining({
          created: item,
          selectedItems: [...items, item],
          items: [...items, item]
        }));
      });
    });
  });

  describe("onEnterKeyPressed", () => {

    describe("when allowCreateItem is false", () => {
      beforeEach(() => component.allowCreateItem = false);

      describe("and allowMultiSelect is false", () => {
        beforeEach(() => component.allowMultiSelect = false);

        it("should select the first entry if filtered is not empty", () => {
          component.selectedItems = "";

          component.onEnterKeyPressed();

          expect(component.selectedItems).toEqual(items[0]);
        });

        it("should emit selectedItems", async () => {
          const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();
          component.selectedItems = "";

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result).toEqual(jasmine.objectContaining({
            selectedItems: items[0]
          }));
        });
      });

      describe("and allowMultiSelect is true", () => {
        beforeEach(() => component.allowMultiSelect = true);

        it("should add items to selection if filtered is not empty", () => {
          component.selectedItems = [];

          component.onEnterKeyPressed();

          expect(component.selectedItems).toEqual(items);
        });

        it("should emit selectedItems", async () => {
          const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();
          component.selectedItems = [];

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result.selectedItems).toEqual(items);
        });
      });
    });

    describe("when allowCreateItem is true", () => {
      beforeEach(() => component.allowCreateItem = true);

      describe("and allowMultiSelect is false", () => {
        beforeEach(() => component.allowMultiSelect = false);

        it("should create item if filtered is empty", () => {
          const item = "🎃";
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();

          expect(component.items).toEqual([...items, item]);
        });

        it("should select created item if filtered is empty", () => {
          const item = "🎃";
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();

          expect(component.selectedItems).toEqual(item);
        });

        it("should emit created selectedItems and items", async () => {
          const resultPromise = component.onItemCreated.pipe(take(1)).toPromise();
          const item = "🎃";
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result).toEqual(jasmine.objectContaining({
            created: item,
            selectedItems: item,
            items: [...items, item]
          }));
        });
      });

      describe("and allowMultiSelect is true", () => {
        beforeEach(() => component.allowMultiSelect = true);

        it("should create item if filtered is empty", () => {
          const item = "🎃";
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();

          expect(component.items).toEqual([...items, item]);
        });

        it("should add created item to selected items if filtered is empty", () => {
          const item = "🎃";
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();

          expect(component.selectedItems).toEqual([item]);
        });

        it("should emit created, selectedItems and items", async () => {
          const resultPromise = component.onItemCreated.pipe(take(1)).toPromise();
          const item = "🎃";
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result).toEqual(jasmine.objectContaining({
            created: item,
            selectedItems: [item],
            items: [...items, item]
          }));
        });
      });
    });

    describe("autoClose", () => {
      beforeEach(() => component.dropdown = jasmine.createSpyObj("NgbDropdown", ["close"]));

      it("should close dialog when enter key is pressed if autoClose is true", () => {
        component.autoClose = true;

        component.onEnterKeyPressed();

        expect(component.dropdown.close).toHaveBeenCalled();
      });

      it("should not close dialog when enter key is pressed if autoClose is false", () => {
        component.autoClose = false;

        component.onEnterKeyPressed();

        expect(component.dropdown.close).not.toHaveBeenCalled();
      });
    });
  });

  describe("onItemSelect", () => {
    
    describe("when allowMultiSelect is false", () => {
      beforeEach(() => component.allowMultiSelect = false);
      
      it("should set item as selected", () => {
        const item = "🎃";
        component.selectedItems = "";

        component.onItemSelect(item);

        expect(component.selectedItems).toEqual(item);
      });

      it("should emit selected item as a string", async () => {
        const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();
        const item = "🎃";
        component.selectedItems = "";

        component.onItemSelect(item);
        const result = await resultPromise;

        expect(result).toEqual(jasmine.objectContaining({
          selectedItems: item
        }));
      });
    });

    describe("when allowMultiSelect is true", () => {
      beforeEach(() => component.allowMultiSelect = true);

      it("should add item to selected items if not selected", () => {
        const item = "🎃";
        component.selectedItems = [];

        component.onItemSelect(item);

        expect(component.selectedItems).toEqual([item]);
      });

      it("should remove item from selected items if selected", () => {
        const item = "🎃";
        component.selectedItems = [item];

        component.onItemSelect(item);

        expect(component.selectedItems).toEqual([]);
      });

      it("should emit selected items as an array", async () => {
        const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();
        const item = "🎃";
        component.selectedItems = [];

        component.onItemSelect(item);
        const result = await resultPromise;

        expect(result).toEqual(jasmine.objectContaining({
          selectedItems: [item]
        }));
      });
    });
  });

  describe("onOpenChange", () => {
    it("should emit event if dialog is being opened", async () => {
      let emitted = false;
      const resultPromise = component.onOpen.pipe(tap(() => emitted = true), take(1)).toPromise();

      component.onOpenChange(true);
      await resultPromise;

      expect(emitted).toEqual(true);
    });

    it("should clear filter text if dialog is being closed", () => {
      component.searchForm.controls["searchInput"].setValue(filterItem);
      component.onOpenChange(false);
      expect(component.searchForm.controls["searchInput"].value).toEqual("");
    });
  });

  describe("onSelectAll", () => {
    it("should set nextToggleState to DESELECT", () => {
      component.nextToggleState = component.SELECT;

      component.onSelectAll();

      expect(component.nextToggleState).toEqual(component.DESELECT);
    });

    it("should set selected items to all items", () => {
      component.onSelectAll();

      expect(component.selectedItems).toEqual(items);
    });

    it("should emit selected items as an array", async () => {
      const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();

      component.onSelectAll();
      const result = await resultPromise;

      expect(result).toEqual(jasmine.objectContaining({
        selectedItems: items
      }));
    });
  });

  describe("onSelectMultiple", () => {
    it("should set nextToggleState to DESELECT", () => {
      component.nextToggleState = component.SELECT;

      component.onSelectMultiple();

      expect(component.nextToggleState).toEqual(component.DESELECT);
    });

    it("should set selected items to filtered items", () => {
      component.onSelectMultiple();

      expect(component.selectedItems).toEqual(items);
    });

    it("should emit selected items", async () => {
      const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();

      component.onSelectMultiple();
      const result = await resultPromise;

      expect(result).toEqual(jasmine.objectContaining({
        selectedItems: items
      }));
    });
  });

  describe("onSelectNone", () => {
    it("should set nextToggledState to SELECT", () => {
      component.nextToggleState = component.DESELECT;

      component.onSelectNone();

      expect(component.nextToggleState).toEqual(component.SELECT);
    });

    it("should set selected items to empty array", () => {
      component.onSelectNone();

      expect(component.selectedItems).toEqual([]);
    });

    it("should emit empty array", async () => {
      const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();

      component.onSelectNone();
      const result = await resultPromise;

      expect(result).toEqual(jasmine.objectContaining({
        selectedItems: []
      }));
    });
  });

  describe("noItemsToDisplay", () => {
    it("should not be hidden if filteredItems length is 0", () => {
      component.disabled = false;
      component.items = ["🍔"];

      component.searchInput.setValue("alsdkjfals");
      fixture.detectChanges();

      expect(component.noItemsToDisplay).toEqual(true);
      expect(fixture.nativeElement.querySelector(".no-items").hidden).toEqual(false);
    });

    it("should be hidden if filteredItems length is not 0", () => {
      const item = "🍕";
      component.disabled = false;
      component.items = [item];

      component.searchInput.setValue(item);
      fixture.detectChanges();

      expect(component.noItemsToDisplay).toEqual(false);
      expect(fixture.nativeElement.querySelector(".no-items").hidden).toEqual(true);
    });
  });

  describe("showCreateItem", () => {
    it("should return false if searchInputValue length is 0", () => {
      component.searchInput.setValue("");

      expect(component.showCreateItem).toEqual(false);
    });

    it("should return false if allowCreateItem is false", () => {
      component.searchInput.setValue("🎃");
      component.allowCreateItem = false;

      expect(component.showCreateItem).toEqual(false);
    });

    it("should return false if items contains searchInputValue", () => {
      const item = "🎃";
      component.searchInput.setValue(item);
      component.items = [...items, item];
      component.allowCreateItem = true;
      
      expect(component.showCreateItem).toEqual(false);
    });

    it("should return true if searchInputValue length is greater than 0, allowCreateItem is true and items does not contain searchInputValue", () => {
      const item = "🎃";
      component.searchInput.setValue(item);
      component.allowCreateItem = true;
      
      expect(component.showCreateItem).toEqual(true);
    });
  });
});
