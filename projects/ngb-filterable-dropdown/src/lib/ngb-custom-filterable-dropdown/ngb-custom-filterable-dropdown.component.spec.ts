import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { firstValueFrom } from "rxjs";
import { NgbFilterableDropdownSelectionMode } from "../ngb-filterable-drop-down-selection-mode";
import { NgbCustomFilterableDropdownComponent } from "./ngb-custom-filterable-dropdown.component";

describe("NgbCustomFilterableDropdownComponent", () => {
  let component: NgbCustomFilterableDropdownComponent;
  let fixture: ComponentFixture<NgbCustomFilterableDropdownComponent>;

  let filterItem: string;
  let items: Array<string>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NgbCustomFilterableDropdownComponent,
        NgbModule,
        ReactiveFormsModule,
        CommonModule,
        ScrollingModule,
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(NgbCustomFilterableDropdownComponent);
    component = fixture.componentInstance;
    filterItem = "foo";
    items = [filterItem, "bar", "baz"];
    fixture.componentRef.setInput("items", items);
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should populate filtered with correct list of filtered items", async () => {
    component.searchInput.setValue("oo");
    await fixture.whenStable();
    await fixture.whenStable();
    expect(component.filtered().has(filterItem)).toEqual(true);
    expect(component.filtered().has("baz")).toEqual(false);
  });

  describe("selection", () => {
    describe("set", () => {
      it("should set nextToggleState to SELECT if input length is 0", async () => {
        fixture.componentRef.setInput("selection", []);
        await fixture.whenStable();

        expect(component.nextToggleState()).toEqual(component.SELECT);
      });

      it("should set nextToggleState to DESELECT if input length is greater than 0", async () => {
        fixture.componentRef.setInput("selection", [filterItem]);
        await fixture.whenStable();

        expect(component.nextToggleState()).toEqual(component.DESELECT);
      });
    });
  });

  describe("isFiltered", () => {
    beforeEach(async () => {
      component.searchInput.setValue(filterItem);
      await fixture.whenStable();
    });

    it("should should return true if item is selected", () => {
      expect(component.isFiltered(filterItem)).toEqual(true);
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
      expect(component.isSelected(filterItem)).toEqual(true);
    });

    it("should set selected item when onItemSelect is called", () => {
      expect(component.isSelected("baz")).toEqual(false);
    });
  });

  describe("onCreateItem", () => {
    describe("when in mode that does not allow multi select", () => {
      beforeEach(async () => {
        fixture.componentRef.setInput(
          "selectionMode",
          NgbFilterableDropdownSelectionMode.SingleSelect
        );
        await fixture.whenStable();
      });

      it("should select created item", async () => {
        const item = "🎃";
        component.searchInput.setValue(item);
        await fixture.whenStable();
        await fixture.whenStable();
        component.onCreateItem();

        expect(component.getSelectionValue()).toEqual(item);
      });

      it("should emit created item, selection and items", async () => {
        const resultPromise = firstValueFrom(component.itemCreated);
        const item = "🎃";
        component.searchInput.setValue(item);
        await fixture.whenStable();
        await fixture.whenStable();

        component.onCreateItem();
        const result = await resultPromise;

        expect(result).toEqual(
          jasmine.objectContaining({
            created: item,
            selection: item,
            items: [...items, item],
          })
        );
      });
    });

    describe("when in mode that allows multi select", () => {
      beforeEach(async () => {
        fixture.componentRef.setInput(
          "selectionMode",
          NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
        );
        await fixture.whenStable();
      });

      it("should add created item to selection", async () => {
        const item = "🎃";
        component.searchInput.setValue(item);
        fixture.componentRef.setInput("selection", items);
        await fixture.whenStable();
        component.filtered.set(new Set(items));
        await fixture.whenStable();
        await fixture.whenStable();

        component.onCreateItem();

        expect(component.getSelectionValue()).toEqual([...items, item]);
      });

      it("should emit created item, selection and items", async () => {
        const resultPromise = firstValueFrom(component.itemCreated);
        const item = "🎃";
        component.searchInput.setValue(item);
        fixture.componentRef.setInput("selection", items);
        await fixture.whenStable();
        component.filtered.set(new Set(items));
        await fixture.whenStable();
        await fixture.whenStable();

        component.onCreateItem();
        const result = await resultPromise;

        expect(result).toEqual(
          jasmine.objectContaining({
            created: item,
            selection: [...items, item],
            items: [...items, item],
          })
        );
      });
    });
  });

  describe("onEnterKeyPressed", () => {
    describe("when allowCreateItem is false", () => {
      beforeEach(async () => {
        fixture.componentRef.setInput("allowCreateItem", false);
        await fixture.whenStable();
      });

      describe("and in mode that does not allow multi select", () => {
        beforeEach(async () => {
          fixture.componentRef.setInput(
            "selectionMode",
            NgbFilterableDropdownSelectionMode.SingleSelect
          );
          await fixture.whenStable();
        });

        it("should select the first entry if filtered is not empty", async () => {
          fixture.componentRef.setInput("selection", "");
          await fixture.whenStable();

          component.onEnterKeyPressed();

          expect(component.getSelectionValue()).toEqual(items[0]);
        });

        it("should emit selection", async () => {
          const resultPromise = firstValueFrom(component.selectionChanged);
          fixture.componentRef.setInput("selection", "");
          await fixture.whenStable();

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result).toEqual(
            jasmine.objectContaining({
              selection: items[0],
            })
          );
        });
      });

      describe("and in mode that allows multi select", () => {
        beforeEach(async () => {
          fixture.componentRef.setInput(
            "selectionMode",
            NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
          );
          await fixture.whenStable();
        });

        it("should add items to selection if filtered is not empty", async () => {
          fixture.componentRef.setInput("selection", []);
          await fixture.whenStable();

          component.onEnterKeyPressed();

          expect(component.getSelectionValue()).toEqual(items);
        });

        it("should emit selection", async () => {
          const resultPromise = firstValueFrom(component.selectionChanged);
          fixture.componentRef.setInput("selection", []);
          await fixture.whenStable();

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result.selection).toEqual(items);
        });
      });
    });

    describe("when allowCreateItem is true", () => {
      beforeEach(async () => {
        fixture.componentRef.setInput("allowCreateItem", true);
        await fixture.whenStable();
      });

      describe("and in mode that does not allow multi select", () => {
        beforeEach(async () => {
          fixture.componentRef.setInput(
            "selectionMode",
            NgbFilterableDropdownSelectionMode.SingleSelect
          );
          await fixture.whenStable();
        });

        it("should create item if filtered is empty", async () => {
          const item = "🎃";
          component.filtered.set(new Set([]));
          component.searchInput.setValue(item);
          await fixture.whenStable();
          await fixture.whenStable();

          component.onEnterKeyPressed();

          expect(component.items()).toEqual([...items, item]);
        });

        it("should select created item if filtered is empty", async () => {
          const item = "🎃";
          component.filtered.set(new Set([]));
          component.searchInput.setValue(item);
          await fixture.whenStable();
          await fixture.whenStable();

          component.onEnterKeyPressed();

          expect(component.getSelectionValue()).toEqual(item);
        });

        it("should emit created selection and items", async () => {
          const resultPromise = firstValueFrom(component.itemCreated);
          const item = "🎃";
          component.filtered.set(new Set([]));
          component.searchInput.setValue(item);
          await fixture.whenStable();
          await fixture.whenStable();

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result).toEqual(
            jasmine.objectContaining({
              created: item,
              selection: item,
              items: [...items, item],
            })
          );
        });
      });

      describe("and in mode that allows multi select", () => {
        beforeEach(async () => {
          fixture.componentRef.setInput(
            "selectionMode",
            NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
          );
          await fixture.whenStable();
        });

        it("should create item if filtered is empty", async () => {
          const item = "🎃";
          component.filtered.set(new Set([]));
          component.searchInput.setValue(item);
          await fixture.whenStable();
          await fixture.whenStable();

          component.onEnterKeyPressed();

          expect(component.items()).toEqual([...items, item]);
        });

        it("should add created item to selected items if filtered is empty", async () => {
          const item = "🎃";
          component.filtered.set(new Set([]));
          component.searchInput.setValue(item);
          await fixture.whenStable();
          await fixture.whenStable();

          component.onEnterKeyPressed();

          expect(component.getSelectionValue()).toEqual([item]);
        });

        it("should emit created, selection and items", async () => {
          const resultPromise = firstValueFrom(component.itemCreated);
          const item = "🎃";
          component.filtered.set(new Set([]));
          component.searchInput.setValue(item);
          await fixture.whenStable();
          await fixture.whenStable();

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result).toEqual(
            jasmine.objectContaining({
              created: item,
              selection: [item],
              items: [...items, item],
            })
          );
        });
      });
    });

    describe("autoClose", () => {
      beforeEach(
        () =>
          (component.dropdown = jasmine.createSpyObj("NgbDropdown", ["close"]))
      );

      it("should close dialog when enter key is pressed if autoClose is true", async () => {
        fixture.componentRef.setInput("autoClose", true);
        await fixture.whenStable();

        component.onEnterKeyPressed();

        expect(component.dropdown.close).toHaveBeenCalled();
      });

      it("should not close dialog when enter key is pressed if autoClose is false", async () => {
        fixture.componentRef.setInput("autoClose", false);
        await fixture.whenStable();

        component.onEnterKeyPressed();

        expect(component.dropdown.close).not.toHaveBeenCalled();
      });
    });
  });

  describe("onItemSelect", () => {
    describe("when in mode that does not allow multi select", () => {
      beforeEach(async () => {
        fixture.componentRef.setInput(
          "selectionMode",
          NgbFilterableDropdownSelectionMode.SingleSelect
        );
        await fixture.whenStable();
      });

      it("should set item as selected", async () => {
        const item = "🎃";
        fixture.componentRef.setInput("selection", "");
        await fixture.whenStable();

        component.onItemSelect(item);

        expect(component.getSelectionValue()).toEqual(item);
      });

      it("should emit selected item as a string", async () => {
        const resultPromise = firstValueFrom(component.selectionChanged);
        const item = "🎃";
        fixture.componentRef.setInput("selection", "");
        await fixture.whenStable();

        component.onItemSelect(item);
        const result = await resultPromise;

        expect(result).toEqual(
          jasmine.objectContaining({
            selection: item,
          })
        );
      });
    });

    describe("when in mode that supports multi select", () => {
      beforeEach(async () => {
        fixture.componentRef.setInput(
          "selectionMode",
          NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
        );
        await fixture.whenStable();
      });

      it("should add item to selected items if not selected", async () => {
        const item = "🎃";
        fixture.componentRef.setInput("selection", []);
        await fixture.whenStable();

        component.onItemSelect(item);

        expect(component.getSelectionValue()).toEqual([item]);
      });

      it("should remove item from selected items if selected", async () => {
        const item = "🎃";
        fixture.componentRef.setInput("selection", [item]);
        await fixture.whenStable();

        component.onItemSelect(item);

        expect(component.getSelectionValue()).toEqual([]);
      });

      it("should emit selected items as an array", async () => {
        const resultPromise = firstValueFrom(component.selectionChanged);
        const item = "🎃";
        fixture.componentRef.setInput("selection", []);
        await fixture.whenStable();

        component.onItemSelect(item);
        const result = await resultPromise;

        expect(result).toEqual(
          jasmine.objectContaining({
            selection: [item],
          })
        );
      });
    });
  });

  describe("onOpenChange", () => {
    it("should emit event with open true if dialog is being opened", async () => {
      const resultPromise = firstValueFrom(component.openChanged);

      component.onOpenChange(true);
      const result = await resultPromise;

      expect(result.open).toEqual(true);
    });

    it("should emit event with open false if dialog is being closed", async () => {
      const resultPromise = firstValueFrom(component.openChanged);

      component.onOpenChange(false);
      const result = await resultPromise;

      expect(result.open).toEqual(false);
    });

    it("should clear filter text if dialog is being closed", async () => {
      component.searchForm.controls["searchInput"].setValue(filterItem);
      await fixture.whenStable();
      await fixture.whenStable();
      component.onOpenChange(false);
      expect(component.searchForm.controls["searchInput"].value).toEqual("");
    });
  });

  describe("onSelectAll", () => {
    beforeEach(async () => {
      fixture.componentRef.setInput(
        "selectionMode",
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
      );
      await fixture.whenStable();
    });

    it("should set nextToggleState to DESELECT", () => {
      component.nextToggleState.set(component.SELECT);

      component.onSelectAll();

      expect(component.nextToggleState()).toEqual(component.DESELECT);
    });

    it("should set selected items to all items", () => {
      component.onSelectAll();

      expect(component.getSelectionValue()).toEqual(items);
    });

    it("should emit selected items as an array", async () => {
      const resultPromise = firstValueFrom(component.selectionChanged);

      component.onSelectAll();
      const result = await resultPromise;

      expect(result).toEqual(
        jasmine.objectContaining({
          selection: items,
        })
      );
    });
  });

  describe("onSelectMultiple", () => {
    beforeEach(async () => {
      fixture.componentRef.setInput(
        "selectionMode",
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
      );
      await fixture.whenStable();
    });

    it("should set nextToggleState to DESELECT", () => {
      component.nextToggleState.set(component.SELECT);

      component.onSelectMultiple();

      expect(component.nextToggleState()).toEqual(component.DESELECT);
    });

    it("should set selected items to filtered items", () => {
      component.onSelectMultiple();

      expect(component.getSelectionValue()).toEqual(items);
    });

    it("should emit selected items", async () => {
      const resultPromise = firstValueFrom(component.selectionChanged);

      component.onSelectMultiple();
      const result = await resultPromise;

      expect(result).toEqual(
        jasmine.objectContaining({
          selection: items,
        })
      );
    });
  });

  describe("onSelectNone", () => {
    beforeEach(async () => {
      fixture.componentRef.setInput(
        "selectionMode",
        NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone
      );
      await fixture.whenStable();
    });

    it("should set nextToggledState to SELECT", () => {
      component.nextToggleState.set(component.DESELECT);

      component.onSelectNone();

      expect(component.nextToggleState()).toEqual(component.SELECT);
    });

    it("should set selected items to empty array", () => {
      component.onSelectNone();

      expect(component.getSelectionValue()).toEqual([]);
    });

    it("should emit empty array", async () => {
      const resultPromise = firstValueFrom(component.selectionChanged);

      component.onSelectNone();
      const result = await resultPromise;

      expect(result).toEqual(
        jasmine.objectContaining({
          selection: [],
        })
      );
    });
  });

  describe("loading", () => {
    it("should be hidden if loading false", async () => {
      fixture.componentRef.setInput("loading", false);

      await fixture.whenStable();

      expect(fixture.nativeElement.querySelector("#loading").hidden).toEqual(
        true
      );
    });

    it("should not disable searchInput if loading false", async () => {
      fixture.componentRef.setInput("loading", false);

      await fixture.whenStable();

      expect(component.searchInput.disabled).toEqual(false);
    });

    it("should not be hidden if loading true", async () => {
      fixture.componentRef.setInput("loading", true);

      await fixture.whenStable();

      expect(fixture.nativeElement.querySelector("#loading").hidden).toEqual(
        false
      );
    });

    it("should disable searchInput if loading false", async () => {
      fixture.componentRef.setInput("loading", true);

      await fixture.whenStable();

      expect(component.searchInput.disabled).toEqual(true);
    });
  });

  describe("noItemsToDisplay", () => {
    it("should not be hidden if filteredItems length is 0", async () => {
      fixture.componentRef.setInput("items", ["🍔"]);
      await fixture.whenStable();
      component.searchInput.setValue("alsdkjfals");
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.noItemsToDisplay()).toEqual(true);
      expect(fixture.nativeElement.querySelector("#no-items").hidden).toEqual(
        false
      );
    });

    it("should be hidden if filteredItems length is not 0", async () => {
      const item = "🍕";
      fixture.componentRef.setInput("items", [item]);
      await fixture.whenStable();
      component.searchInput.setValue(item);
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.noItemsToDisplay()).toEqual(false);
      expect(fixture.nativeElement.querySelector("#no-items").hidden).toEqual(
        true
      );
    });

    it("should be hidden if loading is true", async () => {
      const item = "🍕";
      fixture.componentRef.setInput("items", [item]);
      fixture.componentRef.setInput("loading", true);
      await fixture.whenStable();
      component.searchInput.setValue("");
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.noItemsToDisplay()).toEqual(false);
      expect(fixture.nativeElement.querySelector("#no-items").hidden).toEqual(
        true
      );
    });
  });

  describe("showCreateItem", () => {
    it("should return false if searchInputValue length is 0", async () => {
      component.searchInput.setValue("");
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.showCreateItem()).toEqual(false);
      expect(
        fixture.nativeElement.querySelector("#create-item").hidden
      ).toEqual(true);
    });

    it("should return false if allowCreateItem is false", async () => {
      component.searchInput.setValue("🎃");
      fixture.componentRef.setInput("allowCreateItem", false);
      await fixture.whenStable();
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.showCreateItem()).toEqual(false);
      expect(
        fixture.nativeElement.querySelector("#create-item").hidden
      ).toEqual(true);
    });

    it("should return false if items contains searchInputValue", async () => {
      const item = "🎃";
      component.searchInput.setValue(item);
      fixture.componentRef.setInput("items", [...items, item]);
      fixture.componentRef.setInput("allowCreateItem", true);
      await fixture.whenStable();
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.showCreateItem()).toEqual(false);
      expect(
        fixture.nativeElement.querySelector("#create-item").hidden
      ).toEqual(true);
    });

    it("should return false if loading is true", async () => {
      const item = "🎃";
      component.searchInput.setValue(item);
      fixture.componentRef.setInput("allowCreateItem", true);
      fixture.componentRef.setInput("loading", true);
      await fixture.whenStable();
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.showCreateItem()).toEqual(false);
      expect(
        fixture.nativeElement.querySelector("#create-item").hidden
      ).toEqual(true);
    });

    it("should return true if searchInputValue length is greater than 0, allowCreateItem is true, loading is false and items does not contain searchInputValue", async () => {
      const item = "🎃";
      component.searchInput.setValue(item);
      fixture.componentRef.setInput("allowCreateItem", true);
      fixture.componentRef.setInput("loading", false);
      await fixture.whenStable();
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.showCreateItem()).toEqual(true);
      expect(
        fixture.nativeElement.querySelector("#create-item").hidden
      ).toEqual(false);
    });
  });

  describe("typeToCreateItem", () => {
    it("should return false if filtered length is not 0", async () => {
      fixture.componentRef.setInput("items", items);

      await fixture.whenStable();

      expect(component.typeToCreateItem()).toEqual(false);
      expect(
        fixture.nativeElement.querySelector("#type-to-create").hidden
      ).toEqual(true);
    });

    it("should return false if searchInputValue length is not 0", async () => {
      fixture.componentRef.setInput("items", []);
      await fixture.whenStable();
      component.searchInput.setValue("🎃");
      await fixture.whenStable();
      await fixture.whenStable();
      await fixture.whenStable();

      expect(component.typeToCreateItem()).toEqual(false);
      expect(
        fixture.nativeElement.querySelector("#type-to-create").hidden
      ).toEqual(true);
    });

    it("should return false if allowCreateItem is false", async () => {
      fixture.componentRef.setInput("items", []);
      fixture.componentRef.setInput("allowCreateItem", false);
      await fixture.whenStable();
      component.searchInput.setValue("");
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.typeToCreateItem()).toEqual(false);
      expect(
        fixture.nativeElement.querySelector("#type-to-create").hidden
      ).toEqual(true);
    });

    it("should return false if loading is true", async () => {
      fixture.componentRef.setInput("items", []);
      fixture.componentRef.setInput("allowCreateItem", true);
      fixture.componentRef.setInput("loading", true);
      await fixture.whenStable();
      component.searchInput.setValue("");
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.typeToCreateItem()).toEqual(false);
      expect(
        fixture.nativeElement.querySelector("#type-to-create").hidden
      ).toEqual(true);
    });

    it("should return true if filtered length is 0, searchInputValue length is 0, loading is false and allowCreateItem is true", async () => {
      fixture.componentRef.setInput("items", []);
      fixture.componentRef.setInput("allowCreateItem", true);
      fixture.componentRef.setInput("loading", false);
      await fixture.whenStable();
      component.searchInput.setValue("");
      await fixture.whenStable();
      await fixture.whenStable();

      await fixture.whenStable();

      expect(component.typeToCreateItem()).toEqual(true);
      expect(
        fixture.nativeElement.querySelector("#type-to-create").hidden
      ).toEqual(false);
    });
  });
});
