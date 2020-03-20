import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterableDropdownComponent, FilterableItem } from './filterable-dropdown.component';
import { MultiSelectPipe } from './multi-select-pipe/multi-select-pipe';
import { take } from 'rxjs/operators'

describe('FilterableDropdownComponent', () => {
  let component: FilterableDropdownComponent;
  let fixture: ComponentFixture<FilterableDropdownComponent>;

  const filterItem = {value: "foo", selected: false};
  let items: Array<FilterableItem>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        CommonModule
      ],
      declarations: [
        FilterableDropdownComponent,
        MultiSelectPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterableDropdownComponent);
    component = fixture.componentInstance;
    items = [filterItem, {value: "bar", selected: false}, {value: "baz", selected: false}];
    component.items = items;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter a list of items', () => {
    const filterText = filterItem.value;
    component.searchForm.controls["searchInput"].setValue(filterText);
    expect(component.filteredItems).toEqual([filterItem]);
  });

  it('should clear filter text when item is selected', () => {
    component.searchForm.controls["searchInput"].setValue(filterItem);
    component.onItemSelect(filterItem);
    expect(component.searchForm.controls["searchInput"].value).toEqual("");
  });

  it('should emit the value of the selected item', async() => {
    const resultPromise = component.onItemsSelected.pipe(take(1)).toPromise();
    component.onItemSelect(filterItem);
    const result = await resultPromise;
    expect(result).toEqual([filterItem.value])
  });

  it('should display list of items', () => {
    fixture.detectChanges();
    items.forEach(item => expect(fixture.nativeElement.textContent).toContain(item.value));
  });

  it('should be disabled if disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("button[disabled]")).toBeTruthy();
  });

  it('should display All as currentItem if no items are selected', () => {
    component.items = [{value: "eh, its a living", selected: false}];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#itemDropdown').innerText).toEqual("All");
  });

  it('should display currentItem if one item is selected', () => {
    const currentItem = "MyDatabaseName";
    component.items = [{value: currentItem, selected: true}];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#itemDropdown').innerText).toEqual(currentItem);
  });

  it('should display Multiple as currentItem if more than one item is selected', () => {
    component.items = [{value: "oh", selected: true}, {value: "boy", selected: true}];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#itemDropdown').innerText).toEqual("Multiple");
  });

  xit('should display a checkmark if item is selected', () => {
    const currentItem = "SelectedItem";
    component.disabled = false;
    component.items = [{value: currentItem, selected: true}, {value: "Other item", selected: false}];
    fixture.detectChanges();
    const checkElement = fixture.nativeElement.querySelector("check-icon");
    const currentItemElement = checkElement.parentElement;
    expect(currentItemElement.innerText).toContain(currentItem);
  });

  it('should emit an onOpen event when onOpenChange is called with true', () => {
    component.onOpen.subscribe(() => expect(true).toBeTruthy());
    component.onOpenChange(true);
  });

  it('should emit all items if "Select All" is selected', async () => {
    const expectedResult = items.map(item => item.value);
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

  describe('noItemsToDisplay', () => {
    it('should be true if filteredItems length is 0', () => {
      component.disabled = false;
      component.items = [{value: '🍔', selected: false}];
      
      component.searchInput.setValue('alsdkjfals');
      fixture.detectChanges();

      expect(component.noItemsToDisplay).toEqual(true);
      expect(fixture.nativeElement.querySelector('.no-items')).toBeTruthy();
    });

    it('should be false if filteredItems length is not 0', () => {
      const item = '🍕';
      component.disabled = false;
      component.items = [{value: item, selected: false}];
      
      component.searchInput.setValue(item);
      fixture.detectChanges();

      expect(component.noItemsToDisplay).toEqual(false);
      expect(fixture.nativeElement.querySelector('.no-items')).toBeFalsy();
    });
  });
});

