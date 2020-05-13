import { CommonModule } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { NgbFilterableDropdownComponent } from './ngb-filterable-dropdown.component';
import { MultiSelectPipe } from './multi-select-pipe/multi-select-pipe';

describe('FilterableDropdownComponent', () => {
  let component: NgbFilterableDropdownComponent;
  let fixture: ComponentFixture<NgbFilterableDropdownComponent>;

  let filterItem: string;
  let items: Array<string>;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbFilterableDropdownComponent);
    component = fixture.componentInstance;
    filterItem = "foo";
    items = [filterItem, "bar", "baz"];
    component.allowMultiSelect = true;
    component.items = items;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO ZL Talk about whether this should be actual functionality
  it('should clear filter text when item is selected', () => {
    component.searchForm.controls["searchInput"].setValue(filterItem);
    component.onItemSelect(filterItem);
    expect(component.searchForm.controls["searchInput"].value).toEqual("");
  });

  it('should populate filtered with correct list of filtered items', () => {
    component.searchInput.setValue("oo");
    expect(component.filtered.has(filterItem)).toEqual(true);
    expect(component.filtered.has("baz")).toEqual(false);
  });

  it('should emit the value of the selected item', async () => {
    const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();
    component.onItemSelect(filterItem);
    const result = await resultPromise;
    expect(result).toEqual([filterItem])
  });

  it('should display list of items', () => {
    fixture.detectChanges();
    items.forEach(item => expect(fixture.nativeElement.textContent).toContain(item));
  });

  it('should be disabled if disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("button[disabled]")).toBeTruthy();
  });

  it('should display All as currentItem if no items are selected', () => {
    component.items = ["it's a living"];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#itemDropdown').innerText).toEqual("All");
  });

  it('should display currentItem if one item is selected', () => {
    const currentItem = "MyDatabaseName";
    component.items = [currentItem];
    component.onItemSelect(currentItem);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#itemDropdown').innerText).toEqual(currentItem);
  });

  it('should display Multiple as currentItem if more than one item is selected', fakeAsync(() => {
    component.onItemSelect(filterItem);
    component.onItemSelect("bar");
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#itemDropdown').innerText).toEqual("Multiple");
  }));

  it('should emit an onOpen event when onOpenChange is called with true', () => {
    component.onOpen.subscribe(() => expect(true).toBeTruthy());
    component.onOpenChange(true);
  });

  it('should emit all items if "Select All" is selected', async () => {
    const expectedResult = items.map(item => item);
    const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();
    component.disabled = false;
    component.onSelectAll();
    const result = await resultPromise;
    expect(result).toEqual(expectedResult)
  });

  it('should emit an empty array if "Select None" is selected', () => {
    component.disabled = false;
    component.items = [];
    component.onItemsSelected.subscribe(items => expect(items).toEqual([]));
    component.onSelectNone();
  });

  describe('isSelected', () => {
    beforeEach(() => {
      component.onItemSelect(filterItem);
    });

    it('should should return true if item is selected', () => {
      expect(component.isSelected(filterItem)).toEqual(true)
    });

    it('should set selected item when onItemSelect is called', () => {
      expect(component.isSelected("baz")).toEqual(false);
    });
  });

  describe('isFiltered', () => {
    beforeEach(() => {
      component.searchInput.setValue(filterItem);
    });

    it('should should return true if item is selected', () => {
      expect(component.isFiltered(filterItem)).toEqual(true)
    });

    it('should set selected item when onItemSelect is called', () => {
      expect(component.isFiltered("baz")).toEqual(false);
    });
  });

  describe('noItemsToDisplay', () => {
    it('should be true if filteredItems length is 0', () => {
      component.disabled = false;
      component.items = ['🍔'];

      component.searchInput.setValue('alsdkjfals');
      fixture.detectChanges();

      expect(component.noItemsToDisplay).toEqual(true);
      expect(fixture.nativeElement.querySelector('.no-items')).toBeTruthy();
    });

    it('should be false if filteredItems length is not 0', () => {
      const item = '🍕';
      component.disabled = false;
      component.items = [item];

      component.searchInput.setValue(item);
      fixture.detectChanges();

      expect(component.noItemsToDisplay).toEqual(false);
      expect(fixture.nativeElement.querySelector('.no-items')).toBeFalsy();
    });
  });

  describe('singleSelect', () => {
    beforeEach(() => {
      component.allowMultiSelect = false;
    });

    it('should set selected item', () => {
      component.selected = new Set([filterItem]);
      expect(component.selected.has(filterItem)).toEqual(true)
    });

    it('should remove other items from set when onItemSelect is callsed', () => {
      component.selected = new Set(["baz"]);
      component.onItemSelect(filterItem);
      expect(component.selected.has(filterItem)).toEqual(true);
      expect(component.selected.has("baz")).toEqual(false);
    })

    it('should set selected item when onItemSelect is called', () => {
      component.onItemSelect(filterItem);
      expect(component.selected.has(filterItem)).toEqual(true);
    });
  });
});

